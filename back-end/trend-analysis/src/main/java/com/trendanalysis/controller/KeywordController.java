package com.trendanalysis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/keyword")
public class KeywordController {

    @GetMapping("/")
    public void list() {

    }

    @PostMapping("/new")
    public void create() {

    }

    @PutMapping("/{keywordId}/update")
    public void updateKeyword() {

    }

    @DeleteMapping("/{keyword}/delete")
    public void deleteKeyword() {

    }
}
