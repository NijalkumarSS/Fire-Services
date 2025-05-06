package com.example.FireDepartment.Service;


import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.File;

@Slf4j
@Service
public class mail
{
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EntityManager entityManager;

    @Value("${spring.mail.username}")
    private String fromemail;


    public String send(String Toemail, String subject, String body)
    {
        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromemail);
            message.setTo(Toemail);
            message.setSubject(subject);
            message.setText(body);

            javaMailSender.send(message);
            System.out.println("send succesfully...");
            return null;

        } catch (Exception e)
        {
            return e.getMessage();
        }

    }
}
