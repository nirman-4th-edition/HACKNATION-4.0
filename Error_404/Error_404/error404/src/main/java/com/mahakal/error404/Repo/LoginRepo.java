package com.mahakal.error404.Repo;

import com.mahakal.error404.Model.Register;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepo extends JpaRepository<Register,String> {

}
