package polsl.tai.srswr.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import polsl.tai.srswr.domain.Restaurant;
import polsl.tai.srswr.domain.User;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Page<Restaurant> findAllByOwner(User owner, Pageable pageable);

}
