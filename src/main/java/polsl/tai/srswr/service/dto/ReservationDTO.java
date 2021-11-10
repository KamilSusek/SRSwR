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

    private String restaurantName;

    private Instant reservationStart;

    private Instant reservationEnd;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private UserDTO client;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private UserDTO owner;

    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getId();
        this.restaurantName = reservation.getRestaurantName();
        this.reservationStart = reservation.getReservationStart();
        this.reservationEnd = reservation.getReservationEnd();
        this.notes = reservation.getNotes();
        this.client = Optional.of(reservation.getClient()).map(UserDTO::new).get(); //TODO to jest takie max tymczasowe
        this.owner = Optional.of(reservation.getOwner()).map(UserDTO::new).get();
    }
}
