package com.fitness.activityservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserValidationService {
    private final WebClient userServiceWebClient;

//    public boolean validateUser(String userId){
//       try{
//           return userServiceWebClient.get()
//                   .uri("/api/user/{userId}/validate",userId)
//                   .retrieve()
//                   .bodyToMono(Boolean.class)
//                   .block();
//       }catch(WebClientResponseException e){
//           e.printStackTrace();
//       }
//       return false;
//    }

    public boolean validateUser(String userId) {
        try {
            Boolean response = userServiceWebClient.get()
                    .uri("/api/user/{userId}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block();
            return Boolean.TRUE.equals(response); // avoids null unboxing
        } catch (WebClientResponseException e) {
            log.error("User validation failed for ID {}: {}", userId, e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error during user validation: {}", e.getMessage());
        }
        return false;
    }

}
