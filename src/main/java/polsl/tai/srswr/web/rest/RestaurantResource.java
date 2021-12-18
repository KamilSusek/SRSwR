package polsl.tai.srswr.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import polsl.tai.srswr.service.RestaurantService;
import polsl.tai.srswr.service.dto.ReservationDTO;
import polsl.tai.srswr.service.dto.RestaurantDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

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

    @PutMapping("/restaurants")
    public ResponseEntity<RestaurantDTO> updateRestaurant(@Valid @RequestBody RestaurantDTO restaurant) throws URISyntaxException {
        RestaurantDTO savedRestaurant = restaurantService.updateRestaurant(restaurant);
        return ResponseEntity.ok(savedRestaurant);
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<RestaurantDTO>> getRestaurants(Pageable pageable) {
        final Page<RestaurantDTO> page = restaurantService.getAllRestaurants(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<RestaurantDTO> getRestaurant(@PathVariable String id) {
        return ResponseUtil.wrapOrNotFound(restaurantService.getRestaurant(id).map(RestaurantDTO::new));
    }
}
