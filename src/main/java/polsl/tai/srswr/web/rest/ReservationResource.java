package polsl.tai.srswr.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import polsl.tai.srswr.config.Constants;
import polsl.tai.srswr.domain.Reservation;
import polsl.tai.srswr.repository.ReservationRepository;
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

    @PutMapping("/reservations")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ReservationDTO> updateReservation(@Valid @RequestBody ReservationDTO reservationDTO) {
        log.debug("REST request to update Reservation : {}", reservationDTO);
        /*TODO plucie sie jak cos jest zle
         *
         *
         *
         */
        Optional<ReservationDTO> updateReservation = reservationService.updateReservation(reservationDTO);

        return ResponseUtil.wrapOrNotFound(updateReservation,
            HeaderUtil.createAlert("aaa", "userManagement.updated", reservationDTO.getId().toString()));
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDTO>> getAllReservations(Pageable pageable) {
        final Page<ReservationDTO> page = reservationService.getAllReservations(pageable);
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


    @GetMapping("/reservations/{id}:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable String id) {
        log.debug("REST request to get Reservation : {}", id);
        return ResponseUtil.wrapOrNotFound(
            reservationService.getReservation(Long.valueOf(id))
                .map(ReservationDTO::new));
    }

    @DeleteMapping("/reservations/{id}:" + Constants.LOGIN_REGEX + "}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        log.debug("REST request to delete Resservation: {}", id);
        reservationService.deleteReservation(Long.valueOf(id));
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert("aaa", "userManagement.deleted", id)).build();
    }
}
