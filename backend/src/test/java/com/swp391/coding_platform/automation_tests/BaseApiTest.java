package com.swp391.coding_platform.automation_tests;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.context.annotation.Import;
import com.swp391.coding_platform.TestcontainersConfiguration;
import java.util.Map;

import static io.restassured.RestAssured.given;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
@Sql(scripts = "/seed.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_CLASS)
public abstract class BaseApiTest {

    static {
        try {
            java.io.File envFile = new java.io.File("src/test/resources/application-test.properties").getAbsoluteFile();
            // Also load standard .env if exists
            java.io.File rootEnvFile = new java.io.File(".env").getAbsoluteFile();
            if (rootEnvFile.exists()) {
                java.nio.file.Files.lines(rootEnvFile.toPath())
                        .map(String::trim)
                        .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                        .forEach(line -> {
                            int eqIndex = line.indexOf('=');
                            if (eqIndex > 0) {
                                String key = line.substring(0, eqIndex).trim();
                                String val = line.substring(eqIndex + 1).trim();
                                System.setProperty(key, val);
                            }
                        });
            }
        } catch (Exception e) {
            System.err.println("Failed to load .env file in tests: " + e.getMessage());
        }
    }

    private static class BeautifulApiLogger implements io.restassured.filter.Filter {
        private static final com.fasterxml.jackson.databind.ObjectMapper prettyMapper =
                new com.fasterxml.jackson.databind.ObjectMapper()
                        .enable(com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT);

        @Override
        public io.restassured.response.Response filter(
                io.restassured.specification.FilterableRequestSpecification requestSpec,
                io.restassured.specification.FilterableResponseSpecification responseSpec,
                io.restassured.filter.FilterContext ctx) {

            String method = requestSpec.getMethod();
            String uri = requestSpec.getURI();

            System.out.println("\n\u001B[36m================================================================================");
            System.out.println("🚀 [API REQUEST] " + method + " " + uri);
            if (requestSpec.getBody() != null) {
                String bodyStr = requestSpec.getBody().toString();
                System.out.println("\u001B[33m📥 Payload:\u001B[0m");
                System.out.println(formatJson(bodyStr));
            }

            long startTime = System.currentTimeMillis();
            io.restassured.response.Response response = ctx.next(requestSpec, responseSpec);
            long elapsedTime = System.currentTimeMillis() - startTime;

            int statusCode = response.getStatusCode();
            String color = statusCode >= 200 && statusCode < 300 ? "\u001B[32m" : (statusCode >= 400 ? "\u001B[31m" : "\u001B[33m");

            System.out.println("\u001B[36m--------------------------------------------------------------------------------");
            System.out.println(color + "🏁 [API RESPONSE] Status: " + statusCode + " (" + elapsedTime + "ms)\u001B[0m");
            if (response.getBody() != null) {
                String respBody = response.getBody().asString();
                if (respBody != null && !respBody.isBlank()) {
                    System.out.println("\u001B[35m📤 Response Body:\u001B[0m");
                    System.out.println(formatJson(respBody));
                }
            }
            System.out.println("\u001B[36m==============================================================================\u001B[0m\n");

            return response;
        }

        private String formatJson(String jsonStr) {
            try {
                Object obj = prettyMapper.readValue(jsonStr, Object.class);
                return prettyMapper.writeValueAsString(obj);
            } catch (Exception e) {
                return jsonStr;
            }
        }
    }

    @LocalServerPort
    protected int port;

    @org.springframework.test.context.bean.override.mockito.MockitoBean
    protected com.swp391.coding_platform.service.judge0.Judge0ClientService judge0ClientService;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        RestAssured.baseURI = "http://localhost";
        RestAssured.basePath = "/nonstopcoding";
        RestAssured.replaceFiltersWith(new BeautifulApiLogger());

        if (judge0ClientService != null) {
            org.mockito.Mockito.when(judge0ClientService.sendBatchSubmission(org.mockito.Mockito.any()))
                .thenAnswer(invocation -> {
                    com.swp391.coding_platform.dto.judge0.Judge0BatchRequest batchReq = invocation.getArgument(0);
                    java.util.List<com.swp391.coding_platform.dto.judge0.Judge0TokenResponse> mockTokens = new java.util.ArrayList<>();
                    if (batchReq != null && batchReq.getSubmissions() != null) {
                        for (int i = 0; i < batchReq.getSubmissions().size(); i++) {
                            com.swp391.coding_platform.dto.judge0.Judge0TokenResponse resp = new com.swp391.coding_platform.dto.judge0.Judge0TokenResponse();
                            resp.setToken("mock-token-" + System.currentTimeMillis() + "-" + i);
                            mockTokens.add(resp);
                        }
                    }
                    return mockTokens;
                });
        }
    }

    protected String getAccessToken(String username, String password) {
        return given()
                .contentType("application/json")
                .body(Map.of("username", username, "password", password))
                .when()
                .post("/auth/login")
                .then()
                .statusCode(200)
                .extract()
                .cookie("access_token");
    }
}
