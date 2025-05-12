package com.example.myspringapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


@Entity
@Table(name="vegetables")
public class Vegetables {
    @Id
    private Integer price ;
    
    private String name;
    
    private String season;
    
    public Integer getId() {
        return price;
    }
	public String getName() {
		return name;
	}
	public String getRomaji() {
		return season;
	}
}