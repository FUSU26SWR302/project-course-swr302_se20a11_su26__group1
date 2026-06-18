package com.swp391.coding_platform.repository.course;

import com.swp391.coding_platform.entity.course.LessonProblemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonProblemRepository extends JpaRepository<LessonProblemEntity, Integer> {
    boolean existsByLessonIdAndProblemId(Integer lessonId, Integer problemId);
}
