package com.example.FireDepartment.exceptionhandle;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class exceptionhandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,String> handleexception(MethodArgumentNotValidException exception){
        Map<String,String> errormap=new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error  ->{

            errormap.put(error.getField(),error.getDefaultMessage());
        });
        return errormap;
    }
}
