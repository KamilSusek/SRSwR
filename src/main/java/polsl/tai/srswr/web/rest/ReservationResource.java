package polsl.tai.srswr.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import polsl.tai.srswr.security.AuthoritiesConstants;
import polsl.tai.srswr.service.ReservationService;
import polsl.tai.srswr.service.dto.ReservationDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ReservationResource {


    private final Logger log = LoggerFactory.getLogger(ReservationResource.class);

    private final ReservationService reservationService;

    @PostMapping("/reservations")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.OWNER + "\")")
    public ResponseEntity<ReservationDTO> createReservation(@Valid @RequestBody ReservationDTO reservationDTO) throws URISyntaxException {
        log.debug("REST request to save Reservation : {}", reservationDTO);
        ReservationDTO newReservation = reservationService.createReservation(reservationDTO);
        return ResponseEntity.created(new URI("/api/reservations/" + newReservation.getId()))
            .headers(HeaderUtil.createAlert("application", "userManagement.created", newReservation.getId().toString()))
            .body(newReservation);
    }

    @PostMapping("/reservations/assign/{code}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<?> assignReservation(@PathVariable String code) throws URISyntaxException {
        log.debug("REST request to assign Reservation : {}", code);
        reservationService.assignReservation(code);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reservations/cancel/{code}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<?> cancelReservation(@PathVariable String code) throws URISyntaxException {
        log.debug("REST request to assign Reservation : {}", code);
        reservationService.cancelReservation(code);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/reservations")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.OWNER + "\")")
    public ResponseEntity<ReservationDTO> updateReservation(@Valid @RequestBody ReservationDTO reservationDTO) {
        log.debug("REST request to update Reservation : {}", reservationDTO);
        Optional<ReservationDTO> updateReservation = reservationService.updateReservation(reservationDTO);

        return ResponseUtil.wrapOrNotFound(updateReservation,
            HeaderUtil.createAlert("aaa", "userManagement.updated", reservationDTO.getId().toString()));
    }


    @GetMapping("/owner/reservations")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.OWNER + "\")")
    public ResponseEntity<List<ReservationDTO>> getAllOwnersReservations(Pageable pageable) {
        final Page<ReservationDTO> page = reservationService.getAllOwnerReservations(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/my-reservations")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<List<ReservationDTO>> getAllMyReservations(Pageable pageable) {
        final Page<ReservationDTO> page = reservationService.getAllMyReservations(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/not-assigned/reservations")
    public ResponseEntity<List<ReservationDTO>> getAllNotAssignedReservations(Pageable pageable) {
        final Page<ReservationDTO> page = reservationService.getAllNotAssignedReservations(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/reservations/{id}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.USER + "," + AuthoritiesConstants.OWNER + "\")")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable String id) {
        log.debug("REST request to get Reservation : {}", id);
        return ResponseUtil.wrapOrNotFound(reservationService.getReservation(Long.valueOf(id)).map(ReservationDTO::new));
    }

    @DeleteMapping("/reservations/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.OWNER + "\")")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        log.debug("REST request to delete Reservation: {}", id);
        reservationService.deleteReservation(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }
}
