package com.mycompany.myapp.domain;


import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    private String restaurantName;

    private Instant reservationStart;

    private Instant reservationEnd;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    public Reservation() {
    }

    public Reservation(Long id, String restaurantName, Instant reservationStart, Instant reservationEnd, String notes, User client, User owner) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.reservationStart = reservationStart;
        this.reservationEnd = reservationEnd;
        this.notes = notes;
        this.client = client;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Instant getReservationStart() {
        return reservationStart;
    }

    public void setReservationStart(Instant reservationStart) {
        this.reservationStart = reservationStart;
    }

    public Instant getReservationEnd() {
        return reservationEnd;
    }

    public void setReservationEnd(Instant reservationEnd) {
        this.reservationEnd = reservationEnd;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
