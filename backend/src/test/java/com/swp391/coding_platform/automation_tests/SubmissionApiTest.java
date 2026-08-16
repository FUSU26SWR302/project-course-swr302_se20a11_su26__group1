package com.swp391.coding_platform.automation_tests;

import com.swp391.coding_platform.entity.problem.ProblemSubmissionDetailEntity;
import com.swp391.coding_platform.repository.problem.ProblemSubmissionDetailRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class SubmissionApiTest extends BaseApiTest {

    @Autowired
    private ProblemSubmissionDetailRepository detailRepository;

    @Test
    public void submitCode_ValidCode_SavesPendingAndWebhookAcceptedVerdict() {

        String token = getAccessToken("user1", "user1");

        // Submit solution for problem 3 (Two Sum) with Python (languageId: 71)
        Map<String, Object> payload = Map.of(
            "problemId", 3,
            "languageId", 71,
            "sourceCode", "def solve(nums, target):\n    dct = {}\n    for i, num in enumerate(nums):\n        if target - num in dct:\n            return [dct[target - num], i]\n        dct[num] = i\n    return []"
        );

        int submissionId = given()
            .header("Authorization", "Bearer " + token)
            .contentType("application/json")
            .body(payload)
        .when()
            .post("/online-judge/submissions")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000))
            .body("result.submissionId", notNullValue())
            .body("result.status", equalTo("PENDING"))
            .extract()
            .path("result.submissionId");

        // Find detail tokens in database
        List<ProblemSubmissionDetailEntity> details = detailRepository.findBySubmissionId(submissionId);
        assertFalse(details.isEmpty());

        // Simulate callbacks from Judge0 for all testcases to set them to ACCEPTED (status id 3)
        for (ProblemSubmissionDetailEntity detail : details) {
            Map<String, Object> callbackPayload = Map.of(
                "token", detail.getToken(),
                "status", Map.of("id", 3, "description", "Accepted"),
                "stdout", "0 1\n",
                "time", "0.01",
                "memory", "2048"
            );

            given()
                .contentType("application/json")
                .body(callbackPayload)
            .when()
                .put("/online-judge/submissions")
            .then()
                .statusCode(200); // Trigger callback endpoint
        }

        // Query submission status from API to verify it became ACCEPTED
        given()
            .header("Authorization", "Bearer " + token)
        .when()
            .get("/api/problems/3/submissions")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000))
            .body("result[0].status", equalTo("Accepted"));
    }
}
