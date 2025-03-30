package com.abastek.backend.model;

import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "maintenance_report")
public class MaintenanceReport {
  @Id
  private String equipmentCode;
  private String equipmentName;
  private LocalDateTime equipmentManufactureDate;
  private String maintenanceDescription;
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
