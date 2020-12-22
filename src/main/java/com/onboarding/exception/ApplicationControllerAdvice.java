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
public class ApplicationControllerAdvice {

    @Autowired
    private ObjectMapper objectMapper;

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handleBadRequestException(BadRequestException ex) {
        try (InputStream is = (InputStream) ex.getResponse().getEntity()) {
            Object responseBody = objectMapper.readValue(is, Object.class);
            return ResponseEntity.badRequest()
                    .body(responseBody);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }


}
