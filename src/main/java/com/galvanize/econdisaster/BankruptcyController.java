package com.galvanize.econdisaster;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankruptcyController {

    public final BankruptcyRepository bankruptcyRepository;

    public BankruptcyController(BankruptcyRepository bankruptcyRepository){
        this.bankruptcyRepository = bankruptcyRepository;
    }

    @GetMapping("/bankruptcy")
    Iterable<Bankruptcy> getAll(){
        return this.bankruptcyRepository.findAll();
    }
    @PostMapping("/bankruptcy")
    public Boolean create(@RequestBody Bankruptcy[] bankruptcy)
    { for (Bankruptcy e : bankruptcy){
        this.bankruptcyRepository.save(e);
    }
        return true; }

}