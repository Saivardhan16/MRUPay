<<<<<<< HEAD
package org.phonepe.phonepaywallet.repository;

import org.phonepe.phonepaywallet.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderUpiOrReceiverUpiOrderByDateDesc(String senderUpi, String receiverUpi);
    List<Transaction> findBySenderUpiOrderByDateDesc(String senderUpi);
    List<Transaction> findByReceiverUpiOrderByDateDesc(String receiverUpi);
}

=======
package org.phonepe.phonepaywallet.repository;

import org.phonepe.phonepaywallet.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderUpiOrReceiverUpiOrderByDateDesc(String senderUpi, String receiverUpi);
    List<Transaction> findBySenderUpiOrderByDateDesc(String senderUpi);
    List<Transaction> findByReceiverUpiOrderByDateDesc(String receiverUpi);
}

>>>>>>> 13f885410ec87aff487ddbc616477ee2dff81e9b
