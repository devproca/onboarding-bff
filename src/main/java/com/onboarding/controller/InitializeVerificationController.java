package ca.devpro.controller;

import ca.devpro.api.SmsDto;
import ca.devpro.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/start-verify")
public class InitializeVerificationController {

   @Autowired
   private VerificationService verificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SmsDto StartVerify(@RequestBody SmsDto dto){
        return verificationService.setVerification(dto);
    };
}
