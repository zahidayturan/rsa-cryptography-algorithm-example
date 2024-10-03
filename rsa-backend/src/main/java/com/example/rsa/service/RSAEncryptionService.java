package com.example.rsa.service;

import lombok.Data;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.SecureRandom;

@Data
@Service
public class RsaEncryptionService {
    private  BigInteger n;
    private  BigInteger d;
    private BigInteger e;

    public RsaEncryptionService() {
        initializeKeys();
    }

    private void initializeKeys() {
        SecureRandom random = new SecureRandom();

        int bitLength = 2048;
        BigInteger p = BigInteger.probablePrime(bitLength, random);
        BigInteger q = BigInteger.probablePrime(bitLength, random);

        n = p.multiply(q);
        BigInteger phi = (p.subtract(BigInteger.ONE)).multiply(q.subtract(BigInteger.ONE));

        // Public Key
        e = BigInteger.probablePrime(bitLength / 2, random);
        while (phi.gcd(e).compareTo(BigInteger.ONE) > 0 && e.compareTo(phi) < 0) {
            e = e.add(BigInteger.ONE);
        }

        // Private Key
        d = e.modInverse(phi);

        System.out.println("Public Key :"+e);
        System.out.println("Private Key :"+d);
    }

    public BigInteger encrypt(BigInteger message) {
        return message.modPow(e, n);
    }

    public BigInteger decrypt(BigInteger encrypted) {
        return encrypted.modPow(d, n);
    }
}
