package com.abastek.backend.service;

import com.abastek.backend.model.Equipment;
import com.abastek.backend.repository.EquipmentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService {
  private final EquipmentRepository equipmentRepository;

  public EquipmentService(EquipmentRepository equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  public List<Equipment> getAllEquipments() {
    return equipmentRepository.findAll();
  }

  public Optional<Equipment> getEquipmentById(Long id) {
    return equipmentRepository.findById(id);
  }

  public Equipment createEquipment(Equipment equipment) {
    return equipmentRepository.save(equipment);
  }

  public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
    Optional<Equipment> existingEquipment = equipmentRepository.findById(id);
    if (existingEquipment.isPresent()) {
      Equipment equipment = existingEquipment.get();
      equipment.setName(updatedEquipment.getName());
      equipment.setManufactureDate(updatedEquipment.getManufactureDate());
      return equipmentRepository.save(equipment);
    } else {
      return null;
    }
  }

  public void deleteEquipment(Long id) {
    equipmentRepository.deleteById(id);
  }
}
