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
import polsl.tai.srswr.web.rest.errors.BadRequestAlertException;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    @Transactional
    public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO) {
        User owner = getCurrentUserFromContext();
        validateRestaurantUniqueNameAndOwner(restaurantDTO, owner);

        Restaurant restaurant = new Restaurant(restaurantDTO);
        restaurant.setOwner(owner);
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return new RestaurantDTO(savedRestaurant);
    }

    @Transactional
    public RestaurantDTO updateRestaurant(RestaurantDTO restaurantDTO) {
        User owner = getCurrentUserFromContext();
        validateRestaurantUniqueNameAndOwner(restaurantDTO, owner);

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

    @Transactional
    public void deleteRestaurant(String id) {
        Restaurant restaurant = restaurantRepository.findAllByIdAndOwner(Long.valueOf(id), getCurrentUserFromContext())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (restaurant.getReservations().size() > 0) {
            throw new BadRequestAlertException("User has reservations", "restaurant", "restaurantCannotBeDeleted");
        }
        restaurantRepository.delete(restaurant);
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

    private void validateRestaurantUniqueNameAndOwner(RestaurantDTO restaurantDTO, User owner) {
        Optional<Restaurant> existingRestaurant = restaurantRepository.findByRestaurantNameAndOwner(
            restaurantDTO.getRestaurantName(),
            owner);

        if(existingRestaurant.isPresent()) {
            throw new BadRequestAlertException("Restaurant exists", "restaurant", "restaurantExists");
        }
    }
}
