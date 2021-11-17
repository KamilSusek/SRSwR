package polsl.tai.srswr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.tai.srswr.domain.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
