package com.example.rsa.service;

import lombok.Data;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.SecureRandom;

@Data
@Service
public class RSAEncryptionService {
    private final BigInteger n;
    private final BigInteger d;
    private BigInteger e;

    public RSAEncryptionService() {
        SecureRandom random = new SecureRandom();

        int bitLength = 2048;
        BigInteger p = BigInteger.probablePrime(bitLength, random);
        BigInteger q = BigInteger.probablePrime(bitLength, random);
        System.out.println(p);
        System.out.println(q);

        n = p.multiply(q); // n = p * q
        System.out.println(n);
        BigInteger phi = (p.subtract(BigInteger.ONE)).multiply(q.subtract(BigInteger.ONE)); // phi(n) = (p-1)*(q-1)

        // Public Key
        e = BigInteger.probablePrime(bitLength / 2, random);
        while (phi.gcd(e).compareTo(BigInteger.ONE) > 0 && e.compareTo(phi) < 0) {
            e = e.add(BigInteger.ONE);
        }

        // Private Key
        d = e.modInverse(phi); // d = e^(-1) mod phi

        System.out.println(e);
        System.out.println(d);
    }

    public BigInteger encrypt(BigInteger message) {
        return message.modPow(e, n);
    }

    public BigInteger decrypt(BigInteger encrypted) {
        return encrypted.modPow(d, n);
    }
}
