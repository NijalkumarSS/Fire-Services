package com.example.FireDepartment.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody

public class HomeContoler {

    @GetMapping("/Home")
    public String Home(){
        return "Welcome Home";
    }
}
