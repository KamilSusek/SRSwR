package polsl.tai.srswr.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import polsl.tai.srswr.domain.Restaurant;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.repository.RestaurantRepository;
import polsl.tai.srswr.repository.UserRepository;
import polsl.tai.srswr.service.dto.RestaurantDTO;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    @Transactional
    public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO) {
        Restaurant restaurant = new Restaurant(restaurantDTO);
        restaurant.setOwner(getCurrentUserFromContext());
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return new RestaurantDTO(savedRestaurant);
    }

    @Transactional
    public RestaurantDTO updateRestaurant(RestaurantDTO restaurantDTO) {
        Restaurant restaurant = restaurantRepository.findByIdAndOwner(restaurantDTO.getId(), getCurrentUserFromContext())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        restaurant.setRestaurantName(restaurantDTO.getRestaurantName());
        restaurant.setCity(restaurantDTO.getCity());
        restaurant.setPostalCode(restaurantDTO.getPostalCode());
        restaurant.setStreet(restaurantDTO.getStreet());
        restaurant.setDescription(restaurantDTO.getDescription());
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return new RestaurantDTO(savedRestaurant);
    }

    @Transactional(readOnly = true)
    public Page<RestaurantDTO> getAllRestaurants(Pageable pageable) {
        return restaurantRepository.findAllByOwner(getCurrentUserFromContext(), pageable).map(RestaurantDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<Restaurant> getRestaurant(String id) {
        return restaurantRepository.findAllByIdAndOwner(Long.valueOf(id), getCurrentUserFromContext());
    }

    public User getCurrentUserFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return userRepository.findOneByLogin(currentPrincipalName).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
