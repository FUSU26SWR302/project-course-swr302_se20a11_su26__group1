package com.swp391.coding_platform.automation_tests;

import org.junit.jupiter.api.Test;
import java.time.Instant;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ContestApiTest extends BaseApiTest {

    @Test
    public void createContest_ValidData_Returns200AndContestDetails() {
        String adminToken = getAccessToken("admin", "admin");

        Map<String, Object> payload = Map.of(
            "title", "API Test Contest",
            "description", "This is a contest created by API test",
            "scoringRule", "ICPC",
            "startTime", Instant.now().plusSeconds(3600).toString(),
            "endTime", Instant.now().plusSeconds(7200).toString()
        );

        given()
            .header("Authorization", "Bearer " + adminToken)
            .contentType("application/json")
            .body(payload)
        .when()
            .post("/admin/contests")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000))
            .body("result.title", equalTo("API Test Contest"));
    }

    @Test
    public void createContest_InvalidData_Returns400BadRequest() {
        String adminToken = getAccessToken("admin", "admin");

        // Missing title and scoringRule
        Map<String, Object> payload = Map.of(
            "startTime", Instant.now().plusSeconds(3600).toString(),
            "endTime", Instant.now().plusSeconds(7200).toString()
        );

        given()
            .header("Authorization", "Bearer " + adminToken)
            .contentType("application/json")
            .body(payload)
        .when()
            .post("/admin/contests")
        .then()
            .statusCode(400);
    }

    @Test
    public void addProblemToContest_ValidData_Returns200() {
        String adminToken = getAccessToken("admin", "admin");

        // 1. Create a contest
        Map<String, Object> contestPayload = Map.of(
            "title", "Contest for adding problem",
            "description", "Description",
            "scoringRule", "ICPC",
            "startTime", Instant.now().plusSeconds(3600).toString(),
            "endTime", Instant.now().plusSeconds(7200).toString()
        );

        int contestId = given()
            .header("Authorization", "Bearer " + adminToken)
            .contentType("application/json")
            .body(contestPayload)
        .when()
            .post("/admin/contests")
        .then()
            .statusCode(200)
            .extract()
            .path("result.id");

        // 2. Add problem 3 (Two Sum) to the contest
        Map<String, Object> problemPayload = Map.of(
            "problemId", 3,
            "orderIndex", 1
        );

        given()
            .header("Authorization", "Bearer " + adminToken)
            .contentType("application/json")
            .body(problemPayload)
        .when()
            .post("/admin/contests/" + contestId + "/problems")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000));
    }
}
