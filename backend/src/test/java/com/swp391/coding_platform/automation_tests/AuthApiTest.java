package com.swp391.coding_platform.automation_tests;

import org.junit.jupiter.api.Test;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

public class AuthApiTest extends BaseApiTest {

    @Test
    public void login_ValidCredentials_Returns200AndToken() {
        given()
            .contentType("application/json")
            .body(Map.of("username", "admin", "password", "admin"))
        .when()
            .post("/auth/login")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000))
            .cookie("access_token", notNullValue());
    }

    @Test
    public void login_InvalidCredentials_ReturnsError() {
        given()
            .contentType("application/json")
            .body(Map.of("username", "admin", "password", "wrongpassword"))
        .when()
            .post("/auth/login")
        .then()
            .statusCode(401);
    }

    @Test
    public void accessAdminApi_StudentUser_Returns403Forbidden() {
        String studentToken = getAccessToken("user1", "user1");

        given()
            .header("Authorization", "Bearer " + studentToken)
        .when()
            .get("/admin/problems")
        .then()
            .statusCode(403);
    }
}
