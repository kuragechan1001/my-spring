package com.example.myspringapp.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.myspringapp.repository.VegetablesRepository;
import com.example.myspringapp.entity.Vegetables;

@RestController
public class MainController {
	@Autowired
	private VegetablesRepository vegetablesRepository;

	private final static Logger logger = LoggerFactory.getLogger(MainController.class);

	@GetMapping("/test")
	public List<Vegetables> get() {
		return vegetablesRepository.findAll();
	}
}