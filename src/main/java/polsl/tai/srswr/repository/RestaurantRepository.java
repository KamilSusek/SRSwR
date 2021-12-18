package polsl.tai.srswr.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import polsl.tai.srswr.domain.Restaurant;
import polsl.tai.srswr.domain.User;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findAllByIdAndOwner(Long id, User owner);

    Page<Restaurant> findAllByOwner(User owner, Pageable pageable);

    Optional<Restaurant> findByIdAndOwner(Long id, User owner);

}
