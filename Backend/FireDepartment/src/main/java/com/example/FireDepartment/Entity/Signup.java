package com.example.FireDepartment.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor(staticName = "Signupbuild")
@NoArgsConstructor
@Entity
@Data
@Table(name = "SignupDetails")
@Setter
public class Signup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String username;
    private String email;
    private String password;
    private String confirmpassword;

}
