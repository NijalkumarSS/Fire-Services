package com.example.FireDepartment.Controller;
import com.example.FireDepartment.Service.mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
public class mailcontroller
{
    @Autowired
    private mail mailService;

    @GetMapping("/personemail")
    public String sendEmail() {
        mailService.send("nijalss2004@gmail.com", "Registration", "Dear customer your account has been registered successfully");
        return "sent successfully";
    }
}