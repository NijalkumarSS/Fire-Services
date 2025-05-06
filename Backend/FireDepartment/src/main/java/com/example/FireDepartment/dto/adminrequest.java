package com.example.FireDepartment.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class adminrequest {

    @NotBlank(message = "User name should not be empty")
    private String adminname;
    @Email(message = "Enter valid email")
    @NotBlank(message = "User email should not be empty")
    private String email;

    public String getAdminname() {
        return adminname;
    }

    public void setAdminname(String adminname) {
        this.adminname = adminname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits")
    @Pattern(regexp = "\\d{10}", message = "Phone number must contain only digits")
    private String phonenumber;



    @NotBlank(message = "User password should not be empty")
    private String password;
}
