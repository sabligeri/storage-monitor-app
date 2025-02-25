package com.storage.storagemonitorbackend.security.jwt;

import java.util.List;

public record JwtResponse(String jwt, Long id, String username, List<String> roles) {
}
