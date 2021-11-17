package polsl.tai.srswr.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import polsl.tai.srswr.domain.Restaurant;
import polsl.tai.srswr.domain.User;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@NoArgsConstructor
public class RestaurantDTO {

    private Long id;

    private String restaurantName;

    private String city;

    private String street;

    private String postalCode;

    private String description;

    private User owner;

    public RestaurantDTO(Restaurant restaurant) {
        this.id = restaurant.getId();
        this.restaurantName = restaurant.getRestaurantName();
        this.city = restaurant.getCity();
        this.street = restaurant.getStreet();
        this.postalCode = restaurant.getPostalCode();
        this.description = restaurant.getDescription();
    }
}
