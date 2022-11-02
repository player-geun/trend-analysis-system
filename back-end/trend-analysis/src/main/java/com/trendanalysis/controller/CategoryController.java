package com.trendanalysis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @GetMapping("/")
    public void list() {

    }

    @PostMapping("/new")
    public void create() {

    }

    @PutMapping("/{categoryId}/update")
    public void updateCategory() {

    }

    @DeleteMapping("/{categoryId}/delete")
    public void deleteCategory() {

    }
}
