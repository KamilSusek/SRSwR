package polsl.tai.srswr.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import polsl.tai.srswr.domain.Authority;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.domain.User;

import javax.persistence.*;
import java.time.Instant;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
public class ReservationDTO {

    private Long id;

    private String reservationCode;

    private Instant reservationStart;

    private Instant reservationEnd;

    private int numberOfPlaces;

    private int tableNumber;

    private String notes;

    private RestaurantDTO restaurant;

    private UserDTO client;

    private UserDTO owner;

    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getId();
        this.reservationCode = reservation.getReservationCode();
        this.restaurant = new RestaurantDTO(reservation.getRestaurant());
        this.reservationStart = reservation.getReservationStart();
        this.reservationEnd = reservation.getReservationEnd();
        this.numberOfPlaces = reservation.getNumberOfPlaces();
        this.tableNumber = reservation.getTableNumber();
        this.notes = reservation.getNotes();
    }
}
