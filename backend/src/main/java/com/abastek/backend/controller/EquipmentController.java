package com.abastek.backend.controller;

import com.abastek.backend.model.Equipment;
import com.abastek.backend.service.EquipmentService;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/equipment")
public class EquipmentController {
  private final EquipmentService equipmentService;

  public EquipmentController(EquipmentService equipmentService) {
    this.equipmentService = equipmentService;
  }

  @GetMapping("/all")
  public ResponseEntity<List<Equipment>> getAllEquipments() {
    List<Equipment> equipments = equipmentService.getAllEquipments();
    return ResponseEntity.ok(equipments);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getEquipmentById(@PathVariable("id") Long id) {
    return equipmentService.getEquipmentById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/create")
  public ResponseEntity<?> createEquipment(@RequestBody Equipment equipment) {
    try {
      Equipment createdEquipment = equipmentService.createEquipment(equipment);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdEquipment);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error creating equipment");
    }
  }

  @PutMapping("update/{id}")
  public ResponseEntity<?> updateEquipment(
      @PathVariable Long id,
      @RequestBody Equipment updatedEquipment) {
    try {
      Equipment equipment = equipmentService.updateEquipment(id, updatedEquipment);
      return ResponseEntity.ok(equipment);
    } catch (NoSuchElementException e) {
      return ResponseEntity.notFound().build();
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error updating equipment");
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteEquipment(@PathVariable Long id) {
    try {
      equipmentService.deleteEquipment(id);
      return ResponseEntity.noContent().build();
    } catch (NoSuchElementException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error deleting equipment");
    }
  }
}
