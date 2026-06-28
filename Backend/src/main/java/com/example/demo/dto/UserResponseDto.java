package com.example.demo.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private int id;
    private String name;
    private String email;
    private String college;
    private String role;
    private String createdAt;
}
