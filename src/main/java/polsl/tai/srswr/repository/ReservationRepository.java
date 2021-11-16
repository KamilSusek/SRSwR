package polsl.tai.srswr.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.service.dto.ReservationDTO;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findAll(Pageable pageable);

    Page<Reservation> findAllByClientIsNull(Pageable pageable);

}
