<<<<<<< HEAD
package org.phonepe.phonepaywallet.repository;

import org.phonepe.phonepaywallet.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUserId(Long userId);
    Optional<Wallet> findByUserUpiId(String upiId);
}

=======
package org.phonepe.phonepaywallet.repository;

import org.phonepe.phonepaywallet.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUserId(Long userId);
    Optional<Wallet> findByUserUpiId(String upiId);
}

>>>>>>> 13f885410ec87aff487ddbc616477ee2dff81e9b
