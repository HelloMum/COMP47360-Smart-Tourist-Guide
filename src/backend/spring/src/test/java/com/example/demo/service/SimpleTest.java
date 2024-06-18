package com.example.demo.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SimpleTest {

    @Test
    public void testAddition() {
        // Given
        int a = 5;
        int b = 3;

        // When
        int result = add(a, b);

        // Then
        assertEquals(8, result, "5 + 3 should equal 8");
    }

    // Fake implementation of addition for testing
    private int add(int a, int b) {
        return a + b;
    }
}
