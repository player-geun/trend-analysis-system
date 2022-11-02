package com.trendanalysis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/keyword")
public class KeywordController {

    @GetMapping("/")
    public void list() {

    }

    @PostMapping("/")
    public void create() {

    }

    @PutMapping("/{keywordId}")
    public void updateKeyword() {

    }

    @DeleteMapping("/{keyword}")
    public void deleteKeyword() {

    }
}
