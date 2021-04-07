package com.onboarding.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.ws.rs.BadRequestException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    @Autowired
    private ObjectMapper objectMapper;

    @ExceptionHandler
    public ResponseEntity<Object> handleBadRequest(BadRequestException e) {
        try (InputStream inputStream = (InputStream) e.getResponse().getEntity()) {
            Object responseBody = objectMapper.readValue(inputStream, Object.class);

            return ResponseEntity.badRequest().body(responseBody);
        } catch (IOException exception) {
            throw new UncheckedIOException(exception);
        }
    }
}
