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
import polsl.tai.srswr.config.Constants;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.domain.Restaurant;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.repository.ReservationRepository;
import polsl.tai.srswr.repository.RestaurantRepository;
import polsl.tai.srswr.repository.UserRepository;
import polsl.tai.srswr.service.dto.ReservationDTO;
import polsl.tai.srswr.service.dto.UserDTO;

import java.util.Optional;
import java.util.stream.DoubleStream;

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
        reservation.setRestaurant(restaurant);
        return new ReservationDTO(reservationRepository.save(reservation));
    }

    public Optional<ReservationDTO> updateReservation(ReservationDTO reservationDTO) {
        return Optional.of(reservationRepository.save(new Reservation())).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllNotAssignedReservations(Pageable pageable) {
        return reservationRepository.findAllByClientIsNull(pageable).map(ReservationDTO::new);
    }

    public Optional<Reservation> getReservation(Long id) {
        return reservationRepository.findById(id);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public User getCurrentUserFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return userRepository.findOneByLogin(currentPrincipalName).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
