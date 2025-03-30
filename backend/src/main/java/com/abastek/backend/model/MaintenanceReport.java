package com.abastek.backend.model;

import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "maintenance_report")
public class MaintenanceReport {
  @Id
  @Column(name = "equipment_code") // Nome exato da coluna na view
  private String equipmentCode;

  @Column(name = "equipment_name")
  private String equipmentName;

  @Column(name = "equipment_manufacture_date")
  private LocalDateTime equipmentManufactureDate;

  @Column(name = "maintenance_description")
  private String maintenanceDescription;

  @Column(name = "maintenance_date")
  private LocalDateTime maintenanceDate;

  public String getEquipmentCode() {
    return equipmentCode;
  }

  public String getEquipmentName() {
    return equipmentName;
  }

  public String getMaintenanceDescription() {
    return maintenanceDescription;
  }

  public LocalDateTime getMaintenanceDate() {
    return maintenanceDate;
  }

  public LocalDateTime getEquipmentManufactureDate() {
    return equipmentManufactureDate;
  }
}
