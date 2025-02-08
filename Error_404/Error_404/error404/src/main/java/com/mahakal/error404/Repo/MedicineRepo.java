package com.mahakal.error404.Repo;

import com.mahakal.error404.Model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine, Long> {
    List<Medicine> findByUserEmail(String email);
}
