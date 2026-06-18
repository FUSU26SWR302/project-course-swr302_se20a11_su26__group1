package com.swp391.coding_platform.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstructorCourseUpdateRequest {
    String title;
    String shortDescription;
    String longDescription;
    String thumbnailUrl;
    java.util.List<Integer> categoryIds;
    Boolean isFree;
    BigDecimal price;
    String whatYouLearn;
    String courseHighlight;
    String technologyTool;
    String prerequisites;
    String targetAudience;
    String completionBenefits;
    
    List<ChapterDto> chapters;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ChapterDto {
        Integer id; // Can be null if new
        String title;
        List<LessonDto> lessons;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class LessonDto {
        Integer id; // Can be null if new
        String title;
        String video;
        String theory;
        Boolean isTrial;
        List<QuizDto> quizzes;
        List<ExerciseDto> exercises;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ExerciseDto {
        Integer id;
        String title;
        String difficulty;
        String description;
        String inputDesc;
        String outputDesc;
        String constraints;
        String exampleInput;
        String exampleOutput;
        String hint;
        Integer score;
        Integer timeLimit;
        Integer memoryLimit;
        String initialCode;
        String solutionCode;
        List<TestcaseDto> testCases;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class TestcaseDto {
        Integer id;
        String input;
        String output;
        Integer orderIndex;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class QuizDto {
        Integer id;
        String title;
        List<QuizQuestionDto> questions;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class QuizQuestionDto {
        Integer id;
        String content;
        List<QuizOptionDto> options;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class QuizOptionDto {
        Integer id;
        String content;
        Boolean isCorrect;
    }
}

