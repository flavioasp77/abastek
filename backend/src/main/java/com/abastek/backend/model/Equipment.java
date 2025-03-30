package com.abastek.backend.model;
import java.time.Instant;
import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String code;

  @Column(nullable = false)
  private String name;

  @Column(name = "manufacture_date", nullable = false)
  private LocalDateTime manufactureDate;

  public Long getId() {
    return id;
  }

  public String getCode() {
    return code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDateTime getManufactureDate() {
    return manufactureDate;
  }

  public void setManufactureDate(LocalDateTime manufactureDate) {
    this.manufactureDate = manufactureDate;
  }
}
