package com.abastek.backend.controller;

import com.abastek.backend.model.Equipment;
import com.abastek.backend.service.EquipmentService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/equipment")
public class EquipmentController {
    private final EquipmentService equipmentService;

  public EquipmentController(EquipmentService equipmentService) {
    this.equipmentService = equipmentService;
  }

  @GetMapping("/all")
  public List<Equipment> getAllEquipments() {
    return equipmentService.getAllEquipments();
  }

  @PostMapping("/create")
  public Equipment createEquipment(Equipment equipment) {
    return equipmentService.createEquipment(equipment);
  }

  @PutMapping("/update")
  public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
    return equipmentService.updateEquipment(id, updatedEquipment);
  }
  @PostMapping("/delete")
  public void deleteEquipment(Long id) {
    equipmentService.deleteEquipment(id);
  }

}
