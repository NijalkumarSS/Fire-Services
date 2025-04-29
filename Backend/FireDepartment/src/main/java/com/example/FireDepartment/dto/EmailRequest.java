package com.example.FireDepartment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailRequest {

    @Email(message = "Enter valid email")
    @NotBlank(message = "User email should not be empty")
    private String email;
}
