package com.homedepot.om.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {

    public static ResponseEntity<Object> responseBuilder(Object responseObject, String message, HttpStatus httpstatus) {

        Map<String, Object> response = new HashMap<>();
        response.put("Volunteers", responseObject);
        response.put("message", message);
        response.put("httpStatus", httpstatus);
        return new ResponseEntity<>(response, httpstatus);

    }

    public static ResponseEntity<Object> projectsResponseBuilder(Object responseObject, String message, HttpStatus httpstatus) {
        Map<String, Object> response = new HashMap<>();
        response.put("Projects", responseObject);
        response.put("message", message);
        response.put("httpStatus", httpstatus);
        return new ResponseEntity<>(response, httpstatus);

    }

    public static ResponseEntity<Object> createMandatoryfieldsResponseBuilder(String message, HttpStatus httpstatus) {

        Map<String, Object> response = new HashMap<>();

        response.put("message", message);
        response.put("httpStatus", httpstatus);
        return new ResponseEntity<>(response, httpstatus);

    }

    public static ResponseEntity<Object> deleteErrorResponseBuilder(String message, HttpStatus httpstatus) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("httpStatus", httpstatus);
        return new ResponseEntity<>(response, httpstatus);
    }

    public static ResponseEntity<Object> deleteSuccessResponseBuilder(String message, HttpStatus httpstatus) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("httpStatus", httpstatus);
        return new ResponseEntity<>(response, httpstatus);
    }



}
