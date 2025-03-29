package com.abastek.backend.service;

import com.abastek.backend.model.Equipment;
import com.abastek.backend.model.Maintenance;
import com.abastek.backend.repository.MaintenanceRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceService {
    private final MaintenanceRepository maintenanceRepository;
    private final EquipmentService equipmentService;

    public MaintenanceService(MaintenanceRepository maintenanceRepository, EquipmentService equipmentService) {
        this.maintenanceRepository = maintenanceRepository;
        this.equipmentService = equipmentService;
    }

    public List<Maintenance> getAllMaintenance() {
        return maintenanceRepository.findAll();
    }

    public Optional<Maintenance> getMaintenanceById(Long id) {
        return maintenanceRepository.findById(id);
    }

    public Maintenance  createMaintenance(Maintenance maintenance) {
        Equipment equipment = maintenance.getEquipment();

        if (equipment != null) {
            Optional<Equipment> existingEquipment = equipmentService.getEquipmentById(equipment.getId());
            if (existingEquipment.isPresent()) {
                Equipment existing = existingEquipment.get();
                if (maintenance.getMaintenanceDate().isBefore(existing.getManufactureDate())) {
                    throw new IllegalArgumentException("Data de manutenção não pode ser anterior a data de criação do equipamento.");
                }
            }
        }
        return maintenanceRepository.save(maintenance);
    }

    public Maintenance updateMaintenance(Long id, Maintenance updatedMaintenance) {
        Optional<Maintenance> existingMaintenance = maintenanceRepository.findById(id);
        if (existingMaintenance.isPresent()) {
            Maintenance maintenance = existingMaintenance.get();
            maintenance.setDescription(updatedMaintenance.getDescription());
            maintenance.setMaintenanceDate(updatedMaintenance.getMaintenanceDate());
            return maintenanceRepository.save(maintenance);
        } else {
            return null;
        }
    }

    public void deleteMaintenance(Long id) {
        maintenanceRepository.deleteById(id);
    }
}
