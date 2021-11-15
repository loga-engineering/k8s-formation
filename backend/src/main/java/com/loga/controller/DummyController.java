package com.loga.controller;

import com.loga.model.Dummy;
import com.loga.repository.DummyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("dummies")
@CrossOrigin
public class DummyController {

    @Autowired
    DummyRepository repository;

    // Persisting ops.
    @Transactional
    @PostMapping
    public ResponseEntity create(@RequestBody Dummy entity) {
        System.out.println("create");
        entity.setCreatedDate(new Date());
        return ok(repository.saveAndFlush(entity));
    }

    // Fetching ops.
    @GetMapping("/{id}")
    public ResponseEntity find(@PathVariable("id") Long id) {
        return ok(repository.findById(id));
    }

    @GetMapping("find-all")
    public ResponseEntity findAll() {
        return ok(repository.findAllOrderByCreatedDate());
    }

    @GetMapping
    public ResponseEntity findAllByPage(Pageable pageable) {
        System.out.println("findAllByPage ctr");
        System.out.println(repository.findAll(pageable));
        return ResponseEntity.ok(repository.findAll(pageable));
    }

    // Updating ops.
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") Long id, @RequestBody Dummy entity) {
        Optional<Dummy> optionalT = repository.findById(id);
        if (!optionalT.isPresent()) {
            return ResponseEntity.badRequest().body("L'entité n'existe pas ou a été supprimé : id " + id);
        }
        return ResponseEntity.ok(repository.saveAndFlush(entity));
    }

    // Deletion ops.
    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        Optional<Dummy> optionalT = repository.findById(id);
        if (!optionalT.isPresent()) {
            return ResponseEntity.badRequest().body("L'entité n'existe pas ou a été supprimé : id " + id);
        }
        repository.deleteById(id);
        return ResponseEntity.ok(id);
    }

}
