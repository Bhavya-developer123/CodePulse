package com.example.demo.validation;


public class ProblemQueryValidator {
    public static void validate(int page,int size,String sortBy,String direction){
        if(page<0){
            throw new IllegalArgumentException("page number cannot be negative");
        }
        if(size<1||size>100){
            throw new IllegalArgumentException("size should be between 1 to 100");
        }
        if(!direction.equalsIgnoreCase("asc")&&!direction.equalsIgnoreCase("desc")){
            throw new IllegalArgumentException("direction must be asc or desc");
        }
    }
}
