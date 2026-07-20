package com.swp391.coding_platform.automation_tests;

import com.swp391.coding_platform.entity.payment.WalletEntity;
import com.swp391.coding_platform.repository.payment.WalletRepository;
import com.swp391.coding_platform.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;

@org.junit.jupiter.api.parallel.Execution(org.junit.jupiter.api.parallel.ExecutionMode.SAME_THREAD)
public class CartPaymentApiTest extends BaseApiTest {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void checkoutCourse_SufficientBalance_Returns200AndReducesBalance() {
        // Reset user1 balance to 2,000,000.00
        int userId = userRepository.findByUsername("user1").get().getId();
        WalletEntity wallet = walletRepository.findByUserId(userId).get();
        wallet.setBalance(new BigDecimal("2000000.00"));
        walletRepository.save(wallet);

        String token = getAccessToken("user1", "user1");

        // Course 2: Full Stack Web Development with React & Node.js (Price: 199,000.00)
        Map<String, Object> payload = Map.of(
            "courseIds", List.of(2L)
        );

        given()
            .header("Authorization", "Bearer " + token)
            .contentType("application/json")
            .body(payload)
        .when()
            .post("/orders/checkout")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000));

        // Verify balance was reduced
        WalletEntity updatedWallet = walletRepository.findByUserId(userId).get();
        // 2,000,000.00 - 199,000.00 = 1,801,000.00
        assertEquals(0, updatedWallet.getBalance().compareTo(new BigDecimal("1801000.00")));
    }

    @Test
    public void checkoutCourse_InsufficientBalance_Returns400BadRequest() {
        // Set user1 balance to 100.00
        int userId = userRepository.findByUsername("user1").get().getId();
        WalletEntity wallet = walletRepository.findByUserId(userId).get();
        wallet.setBalance(new BigDecimal("100.00"));
        walletRepository.save(wallet);

        String token = getAccessToken("user1", "user1");

        // Course 3 is 399,000.00, which is more than 100.00
        Map<String, Object> payload = Map.of(
            "courseIds", List.of(3L)
        );

        given()
            .header("Authorization", "Bearer " + token)
            .contentType("application/json")
            .body(payload)
        .when()
            .post("/orders/checkout")
        .then()
            .statusCode(400);
    }
}
