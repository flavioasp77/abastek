package com.abastek.backend.repository;

import com.abastek.backend.model.MaintenanceReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceReportRepository extends JpaRepository<MaintenanceReport, String> {

}
