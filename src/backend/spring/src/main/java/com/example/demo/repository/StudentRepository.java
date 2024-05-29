package com.example.demo.repository;

import com.example.demo.model.Student;
import com.example.demo.model.Gender;

import java.util.List;
import java.util.Arrays;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class StudentRepository {
    private List<Student> students = Arrays.asList(
            new Student(1L, "SHA LUO", "luosha1015@gmail.com", Gender.FEMALE),
            new Student(2L, "XUE XI", "xuexi@gmail.com", Gender.MALE)
    );

    public List<Student> findAll() {
        return students;
    }

    public Optional<Student> findById(Long id) {
        return students.stream()
                .filter(student -> student.getId().equals(id))
                .findFirst();
    }
}
