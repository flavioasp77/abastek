package com.abastek.backend.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_report")
public class MaintenanceReport {
  @Id
  private String equipmentCode;
  private String equipmentName;
  private String maintenanceDescription;
  private LocalDate maintenanceDate;

  public String getEquipmentCode() {
    return equipmentCode;
  }

  public String getEquipmentName() {
    return equipmentName;
  }

  public String getMaintenanceDescription() {
    return maintenanceDescription;
  }

  public LocalDate getMaintenanceDate() {
    return maintenanceDate;
  }
}
