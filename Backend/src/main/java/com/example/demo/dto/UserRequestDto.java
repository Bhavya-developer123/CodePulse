package com.example.demo.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    @NotBlank(message="Name is required")
    private String name;
    @Email(message="Enter a valid email")
    @NotBlank(message="Email is required")
    private String email;
    @NotBlank(message="College is required")
    private String college;
    @Size(min=6,message="Password required atleast 6 characters")
    private String password;
    @NotBlank(message="Role is required")
    private String role;
}
