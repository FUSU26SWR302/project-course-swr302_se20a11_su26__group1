package com.swp391.coding_platform.automation_tests;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

public class CourseBuilderApiTest extends BaseApiTest {

    @Test
    public void createCourseDraft_ValidData_Returns200AndDraftStatus() {
        String token = getAccessToken("instructor1", "instructor1");

        Map<String, Object> payload = new HashMap<>();
        payload.put("title", "API Generated React Course");
        payload.put("shortDescription", "Learn React from scratch");
        payload.put("longDescription", "Deep dive React course");
        payload.put("categoryIds", List.of(1));
        payload.put("isFree", false);
        payload.put("price", new BigDecimal("150000.00"));
        payload.put("whatYouLearn", List.of("React components", "State hooks"));
        payload.put("courseHighlight", List.of("Hands-on labs"));
        payload.put("technologyTool", List.of("React, VS Code"));
        payload.put("prerequisites", List.of("Basic Javascript"));
        payload.put("targetAudience", List.of("Web developers"));
        payload.put("completionBenefits", List.of("React Certificate"));
        payload.put("thumbnailUrl", "http://example.com/thumb.jpg");

        given()
            .header("Authorization", "Bearer " + token)
            .contentType("application/json")
            .body(payload)
        .when()
            .post("/instructor/courses")
        .then()
            .statusCode(200)
            .body("code", equalTo(1000))
            .body("result.id", notNullValue())
            .body("result.status", org.hamcrest.Matchers.equalToIgnoringCase("draft"));
    }
}
