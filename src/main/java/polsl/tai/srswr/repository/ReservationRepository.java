package polsl.tai.srswr.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.service.dto.ReservationDTO;

import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findAll(Pageable pageable);

    Page<Reservation> findAllByOwner(Pageable pageable, User owner);

    Optional<Reservation> findById(Long id);

    Optional<Reservation> findByIdAndClient(Long id, User client);

    Optional<Reservation> findByIdAndOwner(Long id, User owner);

    Optional<Reservation> findByReservationCode(String reservationCode);

    Page<Reservation> findAllByClientIsNull(Pageable pageable);

    Page<Reservation> findAllByClient(Pageable pageable, User client);

}
