package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private int totalProblemsSolved;
    private int easyCount;
    private int mediumCount;
    private int hardCount;

    private int xp;
}