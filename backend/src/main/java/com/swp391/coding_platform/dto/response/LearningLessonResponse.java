package com.swp391.coding_platform.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LearningLessonResponse {
    Integer id;
    String title;
    String videoUrl;
    String theoryContent;
    java.util.List<LearningExerciseResponse> exercises;
    String status;
}
