package com.galvanize.econdisaster;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EconomicController {

    public final EconomicRepository repository;

    public EconomicController(EconomicRepository repository){
        this.repository = repository;
    }

    @GetMapping("/zip")
    Iterable<Economic> getAll(){
        return this.repository.findAll();
    }
    @PostMapping("/zip")
    public Boolean create(@RequestBody Economic[] economic)
    { for (Economic e : economic){
        this.repository.save(e);
    }
        return true; }
}
