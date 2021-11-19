package polsl.tai.srswr.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;
import polsl.tai.srswr.service.dto.ReservationDTO;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservation")
public class Reservation {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    private String reservationCode;

    private Instant reservationStart;

    private Instant reservationEnd;

    private int numberOfPlaces;

    private int tableNumber;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    public Reservation(ReservationDTO reservationDTO, Restaurant restaurant, User owner) {
        this.reservationCode = RandomStringUtils.random(10);
        this.reservationStart = reservationDTO.getReservationStart();
        this.reservationEnd = reservationDTO.getReservationEnd();
        this.numberOfPlaces = reservationDTO.getNumberOfPlaces();
        this.tableNumber = reservationDTO.getTableNumber();
        this.notes = reservationDTO.getNotes();
        this.setRestaurant(restaurant);
        this.setOwner(owner);
    }
}
