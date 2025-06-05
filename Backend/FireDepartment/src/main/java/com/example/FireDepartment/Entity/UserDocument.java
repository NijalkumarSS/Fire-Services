package com.example.FireDepartment.Entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_document")
public class UserDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uploadername;
    private Integer age;
    private String dob;
    private String gender;
    private String Designation;

    private String submitteddate;

    private String address;
    private String BuildingType;
    private String DocumentType;
    private String Location;

    private Long pincode;
    private Boolean completed;

    @Lob
    @Column(name = "pdf_data", columnDefinition = "LONGBLOB")
    private String fileName;

    private String notes;
    private Long adharno;
    private String pancardno;

    private String imgname;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    public String getPancardno() {
        return pancardno;
    }

    public void setPancardno(String pancardno) {
        this.pancardno = pancardno;
    }

    private String email;
    public Long getAdharno() {
        return adharno;
    }

    public void setAdharno(Long adharno) {
        this.adharno = adharno;
    }

    public Long getMobilenumber() {
        return mobilenumber;
    }

    public void setMobilenumber(Long mobilenumber) {
        this.mobilenumber = mobilenumber;
    }

//    @Max(value = 9999999999L, message = "Mobile number must not exceed 10 digits")
    private Long mobilenumber;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


}
