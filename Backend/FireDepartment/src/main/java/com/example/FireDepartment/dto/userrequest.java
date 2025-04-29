package com.example.FireDepartment.dto;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
@Data

public class userrequest {

    @NotNull(message = "User name should not be null")
    @NotEmpty(message = "User name should not be empty")
    private String name;

    @NotNull(message = "User address should not be null")
    @NotEmpty(message = "User address should not be empty")
    private String title;

    public String getName() {
        return name;
    }
    public String getTitle() {
        return title;
    }


}
