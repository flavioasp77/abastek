package com.abastek.backend.controller;

import com.abastek.backend.model.Maintenance;
import com.abastek.backend.service.MaintenanceService;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/maintenance")
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceController {
  private final MaintenanceService maintenanceService;

  public MaintenanceController(MaintenanceService maintenanceService) {
    this.maintenanceService = maintenanceService;
  }

  @GetMapping("/all")
  public ResponseEntity<List<Maintenance>> getAllMaintenances() {
    List<Maintenance> maintenances = maintenanceService.getAllMaintenance();
    return ResponseEntity.ok(maintenances);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getMaintenanceById(@PathVariable Long id) {
    return maintenanceService.getMaintenanceById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/create")
  public ResponseEntity<?> createMaintenance(@RequestBody Maintenance maintenance) {
    try {
      Maintenance createdMaintenance = maintenanceService.createMaintenance(maintenance);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdMaintenance);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error creating maintenance");
    }
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<?> updateMaintenance(
      @PathVariable Long id,
      @RequestBody Maintenance updatedMaintenance) {
    try {
      Maintenance maintenance = maintenanceService.updateMaintenance(id, updatedMaintenance);
      return ResponseEntity.ok(maintenance);
    } catch (NoSuchElementException e) {
      return ResponseEntity.notFound().build();
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error updating maintenance");
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteMaintenance(@PathVariable Long id) {
    try {
      maintenanceService.deleteMaintenance(id);
      return ResponseEntity.noContent().build();
    } catch (NoSuchElementException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error deleting maintenance");
    }
  }
}

