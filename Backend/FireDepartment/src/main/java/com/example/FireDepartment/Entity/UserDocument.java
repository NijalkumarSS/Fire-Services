package com.example.FireDepartment.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String uploadername;
    private Integer age;
    private String dob;
    private String gender;
    private String Designation;
    private Integer adharno;
    private Integer pancardno;
    private String address;
    private String BuildingType;
    private String DocumentType;
    private String Location;
    private Long pincode;

    @Lob
    @Column(name = "pdf_data", columnDefinition = "LONGBLOB")
    private String fileName;

    private String notes;

}
