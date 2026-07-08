package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDto {
    @NotBlank(message="Name is required")
    private String name;
    @Email(message="Invalid Email")
    private String email;
    @NotBlank(message="College is required")
    private String college;
    @Size(min=6,message="Password should be atleast 6 characters")
    private String characters;
    @NotBlank(message="Role is required")
    private String role;
}
