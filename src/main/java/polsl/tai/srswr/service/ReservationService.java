package polsl.tai.srswr.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polsl.tai.srswr.config.Constants;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.repository.ReservationRepository;
import polsl.tai.srswr.service.dto.ReservationDTO;
import polsl.tai.srswr.service.dto.UserDTO;

import java.util.Optional;
import java.util.stream.DoubleStream;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public Optional<ReservationDTO> updateReservation(ReservationDTO reservationDTO) {
        return Optional.of( reservationRepository.save(new Reservation())).map(ReservationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ReservationDTO> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable).map(ReservationDTO::new);
    }

    public Optional<Reservation> getReservation(Long id) {
        return reservationRepository.findById(id);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
