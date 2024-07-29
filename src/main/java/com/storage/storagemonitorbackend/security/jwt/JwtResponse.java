package com.storage.storagemonitorbackend.security.jwt;

import java.util.List;

public record JwtResponse(String jwt, long id, String userName, List<String> roles) {
}
