package com.abastek.backend.service;

import com.abastek.backend.model.MaintenanceReport;
import com.abastek.backend.repository.MaintenanceReportRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceReportService {
  private final MaintenanceReportRepository maintenanceReportRepository;

  public MaintenanceReportService(MaintenanceReportRepository maintenanceReportRepository) {
    this.maintenanceReportRepository = maintenanceReportRepository;
  }

  public List<MaintenanceReport> getAllMaintenanceReports() {
    return maintenanceReportRepository.findAll();
  }
}
