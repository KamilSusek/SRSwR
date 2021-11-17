package polsl.tai.srswr.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import polsl.tai.srswr.service.RestaurantService;
import polsl.tai.srswr.service.dto.RestaurantDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RestaurantResource {

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RestaurantService restaurantService;

    @PostMapping("/restaurants")
    public ResponseEntity<RestaurantDTO> createRestaurant(@Valid @RequestBody RestaurantDTO restaurant) throws URISyntaxException {
        RestaurantDTO savedRestaurant = restaurantService.createRestaurant(restaurant);

        return ResponseEntity.created(new URI("/api/restaurants" + savedRestaurant.getId()))
            .headers(HeaderUtil.createAlert(applicationName, "userManagement.created", savedRestaurant.getId().toString()))
            .body(savedRestaurant);
    }
}
