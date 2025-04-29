package com.example.FireDepartment.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
@Entity
@Data
@Table(name = "Project")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private Integer Id;
    private String name;
    private String title;

    public void setName(String name) {
        this.name = name;
    }
    public void setTitle(String title) {
        this.title = title;
    }
}
