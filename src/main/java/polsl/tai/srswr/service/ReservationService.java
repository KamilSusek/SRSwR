package polsl.tai.srswr.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.domain.Restaurant;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.repository.ReservationRepository;
import polsl.tai.srswr.repository.RestaurantRepository;
import polsl.tai.srswr.repository.UserRepository;
import polsl.tai.srswr.security.AuthoritiesConstants;
import polsl.tai.srswr.security.SecurityUtils;
import polsl.tai.srswr.service.dto.ReservationDTO;
import polsl.tai.srswr.web.rest.errors.BadRequestAlertException;

import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    @Transactional
    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        Restaurant restaurant = restaurantRepository
            .findById(reservationDTO.getRestaurant().getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Reservation reservation = new Reservation(reservationDTO, restaurant, getCurrentUserFromContext());
        return new ReservationDTO(reservationRepository.save(reservation));
    }

    @Transactional
    public void assignReservation(String code) {
        Reservation reservation = reservationRepository
            .findByReservationCode(code)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (reservation.getClient() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
        User user = getCurrentUserFromContext();
        reservation.setClient(user);
    }

    @Transactional
    public void cancelReservation(String code) {
        Reservation reservation = reservationRepository
            .findByReservationCode(code)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (Instant.now().isAfter(reservation.getReservationStart())) {
            throw new BadRequestAlertException("Cannot cancel reservation because it is outdated", "reservation", "reservationCannotBeCancelled");
        }
        reservation.setClient(null);
    }

    public Optional<ReservationDTO> updateReservation(ReservationDTO reservationDTO) {
        Reservation reservation = reservationRepository.findById(reservationDTO.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Restaurant restaurant = restaurantRepository.findById(reservationDTO.getRestaurant().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        reservation.setReservationStart(reservationDTO.getReservationStart());
        reservation.setReservationEnd(reservationDTO.getReservationEnd());
        reservation.setRestaurant(restaurant);
        reservation.setNotes(reservationDTO.getNotes());
        reservation.setNumberOfPlaces(reservationDTO.getNumberOfPlaces());
        reservation.setTableNumber(reservationDTO.getTableNumber());
        return Optional.of(reservationRepository.save(reservation)).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllOwnerReservations(Pageable pageable) {
        User user = getCurrentUserFromContext();
        return reservationRepository.findAllByOwner(pageable, user).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllMyReservations(Pageable pageable) {
        User currentUserFromContext = getCurrentUserFromContext();
        return reservationRepository.findAllByClient(pageable, currentUserFromContext).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllNotAssignedReservations(Pageable pageable) {
        return reservationRepository.findAllByClientIsNull(pageable).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<Reservation> getReservation(Long id) {
        User user = getCurrentUserFromContext();
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)) {
            return reservationRepository.findById(id);
        } else if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.OWNER)) {
            return reservationRepository.findByIdAndOwner(id, user);
        }
        return Optional.empty();
    }

    public void deleteReservation(Long id) {
        User user = getCurrentUserFromContext();
        Reservation reservation = reservationRepository.findByIdAndOwner(id, user)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (reservation.getClient() != null) {
            throw new BadRequestAlertException("Cannot delete reservation because it is assigned",
                "reservation", "reservationCannotBeDeleted");
        }
        reservationRepository.deleteById(id);
    }

    public User getCurrentUserFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return userRepository.findOneByLogin(currentPrincipalName)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
