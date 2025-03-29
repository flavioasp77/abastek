package com.abastek.backend.controller;

import com.abastek.backend.model.Equipment;
import com.abastek.backend.service.EquipmentService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  public List<Equipment> getAllEquipments() {
    return equipmentService.getAllEquipments();
  }

  @GetMapping("/{id}")
  public Equipment getEquipmentById(Long id) {
    return equipmentService.getEquipmentById(id).orElse(null);
  }

  @PostMapping("/create")
  public Equipment createEquipment(Equipment equipment) {
    return equipmentService.createEquipment(equipment);
  }

  @PutMapping("/update/{id}")
  public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
    return equipmentService.updateEquipment(id, updatedEquipment);
  }
  @DeleteMapping("/delete")
  public void deleteEquipment(Long id) {
    equipmentService.deleteEquipment(id);
  }

  @GetMapping("/healthCheck")
  public Boolean healthCheck() {
    return true;
  }

}
