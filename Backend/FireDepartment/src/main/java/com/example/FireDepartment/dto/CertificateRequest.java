package com.example.FireDepartment.dto;

import lombok.Data;

@Data
public class CertificateRequest {
    public String nocNumber;
    public String adharno;
    public String uploaderName;
    public String buildingName;
    public String buildingAddress;
    public String documentType;
    public String buildingType;
    public String issueDate;
    public String expiryDate;
    public String conditions;
    public String email;

}
