package com.abastek.backend.controller;

import com.abastek.backend.model.MaintenanceReport;
import com.abastek.backend.service.MaintenanceReportService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/report")
public class MaintenanceReportController {
  private final MaintenanceReportService maintenanceReportService;

  public MaintenanceReportController(MaintenanceReportService maintenanceReportService) {
    this.maintenanceReportService = maintenanceReportService;
  }

  @GetMapping("/all")
  public ResponseEntity<List<MaintenanceReport>> getAllMaintenanceReports() {
    List<MaintenanceReport> maintenanceReports = maintenanceReportService.getAllMaintenanceReports();
    return ResponseEntity.ok(maintenanceReports);
  }
}
