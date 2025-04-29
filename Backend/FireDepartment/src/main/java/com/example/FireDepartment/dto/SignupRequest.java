package com.example.FireDepartment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor(staticName = "Signupbuild")
@NoArgsConstructor
@Data
@Getter
public class SignupRequest {

    @NotBlank(message = "User name should not be empty")
    private String username;


    @Email(message = "Enter valid email")
    @NotBlank(message = "User email should not be empty")
    private String email;


    @NotBlank(message = "User password should not be empty")
    private String password;

    @NotBlank(message = "User password should not be empty")
    private String confirmpassword;
}
