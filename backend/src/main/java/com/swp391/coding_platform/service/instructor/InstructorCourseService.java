package com.swp391.coding_platform.service.instructor;

import com.swp391.coding_platform.dto.response.InstructorCourseResponse;
import com.swp391.coding_platform.entity.course.CourseEntity;
import com.swp391.coding_platform.entity.instructor.InstructorEntity;
import com.swp391.coding_platform.exception.AppException;
import com.swp391.coding_platform.exception.ErrorCode;
import com.swp391.coding_platform.repository.course.CourseRepository;
import com.swp391.coding_platform.repository.instructor.InstructorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.swp391.coding_platform.dto.response.InstructorCourseDetailResponse;
import com.swp391.coding_platform.mapper.CourseMapper;
import java.util.stream.Collectors;
import com.swp391.coding_platform.dto.request.InstructorCourseCreateRequest;
import com.swp391.coding_platform.entity.enums.CourseStatus;
import java.time.Instant;
import com.swp391.coding_platform.service.judge0.Judge0ClientService;
import com.swp391.coding_platform.dto.request.TestcaseGeneratorRequest;
import com.swp391.coding_platform.dto.judge0.Judge0CallbackPayload;
import com.swp391.coding_platform.dto.request.InstructorCourseUpdateRequest.TestcaseDto;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InstructorCourseService {
    private final InstructorRepository instructorRepository;
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final com.swp391.coding_platform.repository.course.ChapterRepository chapterRepository;
    private final com.swp391.coding_platform.repository.course.LessonRepository lessonRepository;
    private final com.swp391.coding_platform.repository.problem.ProblemRepository problemRepository;
    private final com.swp391.coding_platform.repository.course.LessonProblemRepository lessonProblemRepository;
    private final com.swp391.coding_platform.repository.course.EnrollmentRepository enrollmentRepository;
    private final com.swp391.coding_platform.repository.progress.CompletedLessonCountRepository completedLessonCountRepository;
    private final com.swp391.coding_platform.repository.category.CategoryRepository categoryRepository;
    private final Judge0ClientService judge0ClientService;

    public InstructorCourseDetailResponse getCourseDetail(Integer userId, Long courseId) {
        InstructorEntity instructor = getInstructorByUserId(userId);
        CourseEntity course = courseRepository.findByIdAndInstructorId(courseId, instructor.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        InstructorCourseDetailResponse response = courseMapper.toInstructorCourseDetailResponse(course);
        
        if (course.getChapters() != null) {
            response.setChapters(course.getChapters().stream()
                    .map(courseMapper::toInstructorChapterResponse)
                    .collect(Collectors.toList()));
        }
        
        return response;
    }

    public InstructorCourseResponse createCourse(Integer userId, InstructorCourseCreateRequest request) {
        InstructorEntity instructor = getInstructorByUserId(userId);
        
        CourseEntity newCourse = CourseEntity.builder()
                .instructor(instructor)
                .title(request.getTitle())
                .shortDescription(request.getShortDescription())
                .thumbnailUrl(request.getThumbnailUrl() != null && !request.getThumbnailUrl().isEmpty() ? request.getThumbnailUrl() : "https://placehold.co/600x400/2563eb/ffffff?text=Course")
                .longDescription(request.getLongDescription() != null ? request.getLongDescription() : request.getShortDescription())
                .whatYouLearn(request.getWhatYouLearn() != null ? String.join("#", request.getWhatYouLearn()) : "")
                .courseHighlight(request.getCourseHighlight() != null ? String.join("#", request.getCourseHighlight()) : "")
                .technologyTool(request.getTechnologyTool() != null ? String.join("#", request.getTechnologyTool()) : "")
                .prerequisites(request.getPrerequisites() != null ? String.join("#", request.getPrerequisites()) : "")
                .targetAudience(request.getTargetAudience() != null ? String.join("#", request.getTargetAudience()) : "")
                .completionBenefits(request.getCompletionBenefits() != null ? String.join("#", request.getCompletionBenefits()) : "")
                .price(Boolean.TRUE.equals(request.getIsFree()) ? BigDecimal.ZERO : (request.getPrice() != null ? request.getPrice() : BigDecimal.ZERO))
                .type(Boolean.TRUE.equals(request.getIsFree()) ? "FREE" : (request.getPrice() != null && request.getPrice().compareTo(BigDecimal.ZERO) > 0 ? "PAID" : "FREE"))
                .status(CourseStatus.DRAFTS)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .totalEnrolled(0)
                .totalReviews(0)
                .averageRating(0.0)
                .totalLessons(0)
                .totalQuizzes(0)
                .totalVideos(0)
                .build();
                
        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            java.util.List<com.swp391.coding_platform.entity.category.CategoryEntity> categories = categoryRepository.findAllById(request.getCategoryIds());
            newCourse.setCategories(new java.util.HashSet<>(categories));
        }

        CourseEntity savedCourse = courseRepository.save(newCourse);
        
        String status = "draft";
        String gradient = "from-orange-400 to-primary";
        if (savedCourse.getId() != null) {
            if (savedCourse.getId() % 3 == 0) gradient = "from-blue-500 to-indigo-600";
            else if (savedCourse.getId() % 3 == 1) gradient = "from-emerald-500 to-teal-600";
        }
        
        String icon = "code";
        if (savedCourse.getType().equalsIgnoreCase("DATABASE")) icon = "database";
        else if (savedCourse.getType().equalsIgnoreCase("DEVOPS")) icon = "dns";
        else if (savedCourse.getType().equalsIgnoreCase("DATA_SCIENCE")) icon = "analytics";

        return InstructorCourseResponse.builder()
                .id(String.valueOf(savedCourse.getId()))
                .title(savedCourse.getTitle())
                .topic(savedCourse.getType())
                .price(formatVndPrice(savedCourse.getPrice()))
                .studentsCount(0)
                .rating(0.0)
                .reviewsCount(0)
                .status(status)
                .icon(icon)
                .gradient(gradient)
                .description(savedCourse.getShortDescription())
                .thumbnailUrl(savedCourse.getThumbnailUrl())
                .build();
    }

    public List<InstructorCourseResponse> getCourses(Integer userId) {
        InstructorEntity instructor = getInstructorByUserId(userId);

        List<CourseEntity> courses = courseRepository.findByInstructorId(instructor.getId());
        List<InstructorCourseResponse> responses = new ArrayList<>();

        for (CourseEntity course : courses) {
            String status = "draft";
            if ("APPROVED".equalsIgnoreCase(course.getStatus().name())) {
                status = "published";
            } else if ("PENDING".equalsIgnoreCase(course.getStatus().name())) {
                status = "review";
            }

            // Map gradient & icon based on topic/id
            String gradient = "from-orange-400 to-primary";
            if (course.getId() % 3 == 0) {
                gradient = "from-blue-500 to-indigo-600";
            } else if (course.getId() % 3 == 1) {
                gradient = "from-emerald-500 to-teal-600";
            }

            String icon = "code";
            if (course.getType().equalsIgnoreCase("DATABASE")) {
                icon = "database";
            } else if (course.getType().equalsIgnoreCase("DEVOPS")) {
                icon = "dns";
            } else if (course.getType().equalsIgnoreCase("DATA_SCIENCE")) {
                icon = "analytics";
            }

            responses.add(InstructorCourseResponse.builder()
                    .id(String.valueOf(course.getId()))
                    .title(course.getTitle())
                    .topic(course.getType())
                    .price(formatVndPrice(course.getPrice()))
                    .studentsCount(course.getTotalEnrolled())
                    .rating(course.getAverageRating())
                    .reviewsCount(course.getTotalReviews())
                    .status(status)
                    .icon(icon)
                    .gradient(gradient)
                    .description(course.getShortDescription())
                    .thumbnailUrl(course.getThumbnailUrl())
                    .build());
        }

        return responses;
    }

    public void submitCourseForReview(Integer userId, Long courseId) {
        InstructorEntity instructor = getInstructorByUserId(userId);
        CourseEntity course = courseRepository.findByIdAndInstructorId(courseId, instructor.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        if (course.getStatus() != CourseStatus.DRAFTS) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION); // Replace with specific code if needed
        }

        course.setStatus(CourseStatus.PENDING);
        
        if (course.getChapters() != null) {
            for (var chapter : course.getChapters()) {
                if (chapter.getLessons() != null) {
                    for (var lesson : chapter.getLessons()) {
                        if (lesson.getStatus() == null) {
                            lesson.setStatus(com.swp391.coding_platform.entity.enums.LessonStatus.ACTIVE);
                        }
                    }
                }
            }
        }
        
        courseRepository.save(course);
    }

    public InstructorCourseResponse updateCourse(Integer userId, Long courseId, com.swp391.coding_platform.dto.request.InstructorCourseUpdateRequest request) {
        InstructorEntity instructor = getInstructorByUserId(userId);
        CourseEntity course = courseRepository.findByIdAndInstructorId(courseId, instructor.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        // Allow editing even if it's PENDING, so they don't get errors when saving multiple times.
        // if (course.getStatus() == CourseStatus.PENDING) {
        //     throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        // }

        // Update all editable fields
        if (request.getTitle() != null) course.setTitle(request.getTitle());
        if (request.getShortDescription() != null) course.setShortDescription(request.getShortDescription());
        if (request.getLongDescription() != null) course.setLongDescription(request.getLongDescription());
        if (request.getThumbnailUrl() != null) course.setThumbnailUrl(request.getThumbnailUrl());
        if (request.getIsFree() != null) {
            if (Boolean.TRUE.equals(request.getIsFree())) {
                course.setPrice(BigDecimal.ZERO);
                course.setType("FREE");
            } else if (request.getPrice() != null) {
                course.setPrice(request.getPrice());
                course.setType(request.getPrice().compareTo(BigDecimal.ZERO) > 0 ? "PAID" : "FREE");
            }
        } else if (request.getPrice() != null) {
            course.setPrice(request.getPrice());
            course.setType(request.getPrice().compareTo(BigDecimal.ZERO) > 0 ? "PAID" : "FREE");
        }
        
        if (request.getCategoryIds() != null) {
            java.util.List<com.swp391.coding_platform.entity.category.CategoryEntity> categories = categoryRepository.findAllById(request.getCategoryIds());
            if (course.getCategories() != null) {
                course.getCategories().clear();
                course.getCategories().addAll(categories);
            } else {
                course.setCategories(new java.util.HashSet<>(categories));
            }
        }
        if (request.getWhatYouLearn() != null) course.setWhatYouLearn(request.getWhatYouLearn());
        if (request.getCourseHighlight() != null) course.setCourseHighlight(request.getCourseHighlight());
        if (request.getTechnologyTool() != null) course.setTechnologyTool(request.getTechnologyTool());
        if (request.getPrerequisites() != null) course.setPrerequisites(request.getPrerequisites());
        if (request.getTargetAudience() != null) course.setTargetAudience(request.getTargetAudience());
        if (request.getCompletionBenefits() != null) course.setCompletionBenefits(request.getCompletionBenefits());

        // Process Chapters and Lessons
        if (request.getChapters() != null) {
            java.util.List<com.swp391.coding_platform.entity.course.ChapterEntity> existingChapters = course.getChapters();
            if (existingChapters == null) {
                existingChapters = new java.util.ArrayList<>();
                course.setChapters(existingChapters);
            }

            java.util.List<com.swp391.coding_platform.entity.course.ChapterEntity> updatedChapters = new java.util.ArrayList<>();
            
            for (int i = 0; i < request.getChapters().size(); i++) {
                var chDto = request.getChapters().get(i);
                com.swp391.coding_platform.entity.course.ChapterEntity chEntity;

                if (chDto.getId() != null) {
                    chEntity = existingChapters.stream().filter(c -> c.getId().equals(chDto.getId())).findFirst().orElse(null);
                    if (chEntity == null) {
                        chEntity = new com.swp391.coding_platform.entity.course.ChapterEntity();
                        chEntity.setCourse(course);
                    }
                } else {
                    chEntity = new com.swp391.coding_platform.entity.course.ChapterEntity();
                    chEntity.setCourse(course);
                }

                chEntity.setTitle(chDto.getTitle());
                chEntity.setOrderIndex(i + 1);
                chEntity.setUpdatedAt(Instant.now());

                // Process Lessons
                if (chDto.getLessons() != null) {
                    java.util.List<com.swp391.coding_platform.entity.course.LessonEntity> existingLessons = chEntity.getLessons();
                    if (existingLessons == null) {
                        existingLessons = new java.util.ArrayList<>();
                        chEntity.setLessons(existingLessons);
                    }
                    java.util.List<com.swp391.coding_platform.entity.course.LessonEntity> updatedLessons = new java.util.ArrayList<>();

                    for (int j = 0; j < chDto.getLessons().size(); j++) {
                        var lesDto = chDto.getLessons().get(j);
                        com.swp391.coding_platform.entity.course.LessonEntity lesEntity;
                        boolean isExistingChanged = false;

                        if (lesDto.getId() != null) {
                            lesEntity = existingLessons.stream().filter(l -> l.getId().equals(lesDto.getId())).findFirst().orElse(null);
                            if (lesEntity != null) {
                                if (course.getStatus() == com.swp391.coding_platform.entity.enums.CourseStatus.APPROVED && 
                                    lesEntity.getStatus() == com.swp391.coding_platform.entity.enums.LessonStatus.INACTIVE) {
                                    updatedLessons.add(lesEntity);
                                    continue;
                                }
                                if (!java.util.Objects.equals(lesEntity.getTitle(), lesDto.getTitle()) ||
                                    !java.util.Objects.equals(lesEntity.getTheoryContent(), lesDto.getTheory()) ||
                                    !java.util.Objects.equals(lesEntity.getVideoUrl(), lesDto.getVideo()) ||
                                    !java.util.Objects.equals(lesEntity.getIsTrial(), lesDto.getIsTrial() != null ? lesDto.getIsTrial() : false)) {
                                    isExistingChanged = true;
                                }
                            } else {
                                lesEntity = new com.swp391.coding_platform.entity.course.LessonEntity();
                            }
                            lesEntity.setChapter(chEntity);
                        } else {
                            lesEntity = new com.swp391.coding_platform.entity.course.LessonEntity();
                            lesEntity.setChapter(chEntity);
                        }

                        if (course.getStatus() == com.swp391.coding_platform.entity.enums.CourseStatus.DRAFTS) {
                            lesEntity.setStatus(null);
                        } else if (isExistingChanged) {
                            lesEntity.setStatus(com.swp391.coding_platform.entity.enums.LessonStatus.INACTIVE);
                        }

                        lesEntity.setTitle(lesDto.getTitle());
                        lesEntity.setTheoryContent(lesDto.getTheory());
                        lesEntity.setVideoUrl(lesDto.getVideo());
                        lesEntity.setIsTrial(lesDto.getIsTrial() != null ? lesDto.getIsTrial() : false);
                        lesEntity.setOrderIndex(j + 1);
                        lesEntity.setUpdatedAt(Instant.now());

                        // Process Exercises
                        if (lesDto.getExercises() != null) {
                            java.util.List<com.swp391.coding_platform.entity.course.LessonProblemEntity> existingExercises = lesEntity.getLessonProblems();
                            if (existingExercises == null) {
                                existingExercises = new java.util.ArrayList<>();
                                lesEntity.setLessonProblems(existingExercises);
                            }
                            java.util.List<com.swp391.coding_platform.entity.course.LessonProblemEntity> updatedExercises = new java.util.ArrayList<>();

                            for (int k = 0; k < lesDto.getExercises().size(); k++) {
                                var exDto = lesDto.getExercises().get(k);
                                com.swp391.coding_platform.entity.course.LessonProblemEntity lpEntity = null;
                                com.swp391.coding_platform.entity.problem.ProblemEntity problemEntity = null;

                                if (exDto.getId() != null && String.valueOf(exDto.getId()).length() < 10) {
                                    lpEntity = existingExercises.stream().filter(e -> exDto.getId().equals(e.getProblem().getId())).findFirst().orElse(null);
                                }
                                
                                if (lpEntity != null) {
                                    problemEntity = lpEntity.getProblem();
                                } else {
                                    lpEntity = new com.swp391.coding_platform.entity.course.LessonProblemEntity();
                                    lpEntity.setLesson(lesEntity);
                                    problemEntity = new com.swp391.coding_platform.entity.problem.ProblemEntity();
                                    problemEntity.setCreatedBy(instructor.getUser());
                                    problemEntity.setProblemScope(com.swp391.coding_platform.entity.enums.ProblemScope.LESSON);
                                }

                                problemEntity.setTitle(exDto.getTitle());
                                problemEntity.setDescription(exDto.getDescription() != null ? exDto.getDescription() : "");
                                try {
                                    problemEntity.setDifficulty(exDto.getDifficulty() != null ? com.swp391.coding_platform.entity.enums.ProblemDifficulty.valueOf(exDto.getDifficulty().toUpperCase()) : com.swp391.coding_platform.entity.enums.ProblemDifficulty.MEDIUM);
                                } catch (Exception e) {
                                    problemEntity.setDifficulty(com.swp391.coding_platform.entity.enums.ProblemDifficulty.MEDIUM);
                                }
                                problemEntity.setInputDescription(exDto.getInputDesc());
                                problemEntity.setOutputDescription(exDto.getOutputDesc());
                                problemEntity.setConstraints(exDto.getConstraints());
                                problemEntity.setExampleInput(exDto.getExampleInput());
                                problemEntity.setExampleOutput(exDto.getExampleOutput());
                                problemEntity.setHint(exDto.getHint());
                                problemEntity.setScore(exDto.getScore() != null ? BigDecimal.valueOf(exDto.getScore()) : new BigDecimal("100.00"));
                                problemEntity.setTimeLimitMs(exDto.getTimeLimit() != null ? exDto.getTimeLimit() : 2000);
                                problemEntity.setMemoryLimitKb(exDto.getMemoryLimit() != null ? exDto.getMemoryLimit() : 128000);
                                problemEntity.setStarterTemplates(exDto.getInitialCode());
                                problemEntity.setSolutions(exDto.getSolutionCode());
                                problemEntity.setUpdatedAt(Instant.now());

                                // Process testcases
                                if (problemEntity.getTestcases() == null) {
                                    problemEntity.setTestcases(new java.util.ArrayList<>());
                                }
                                problemEntity.getTestcases().clear();
                                if (exDto.getTestCases() != null) {
                                    for (int tIdx = 0; tIdx < exDto.getTestCases().size(); tIdx++) {
                                        var tDto = exDto.getTestCases().get(tIdx);
                                        com.swp391.coding_platform.entity.problem.ProblemTestcaseEntity tEntity = new com.swp391.coding_platform.entity.problem.ProblemTestcaseEntity();
                                        tEntity.setProblem(problemEntity);
                                        tEntity.setInputData(tDto.getInput() != null ? tDto.getInput() : "");
                                        tEntity.setExpectedOutput(tDto.getOutput() != null ? tDto.getOutput() : "");
                                        tEntity.setOrderIndex(tIdx + 1);
                                        problemEntity.getTestcases().add(tEntity);
                                    }
                                }
                                problemEntity.setTotalTestcase(problemEntity.getTestcases().size());

                                problemEntity = problemRepository.save(problemEntity);

                                lpEntity.setProblem(problemEntity);
                                lpEntity.setOrderIndex(k + 1);

                                updatedExercises.add(lpEntity);
                            }

                            // Identify lesson problems to delete
                            java.util.List<com.swp391.coding_platform.entity.course.LessonProblemEntity> lpToRemove = new java.util.ArrayList<>(existingExercises);
                            lpToRemove.removeAll(updatedExercises);
                            lessonProblemRepository.deleteAll(lpToRemove);

                            lesEntity.getLessonProblems().clear();
                            lesEntity.getLessonProblems().addAll(updatedExercises);
                        }

                        // Process Quizzes
                        if (lesDto.getQuizzes() != null) {
                            java.util.List<com.swp391.coding_platform.entity.course.QuizEntity> existingQuizzes = lesEntity.getQuizzes();
                            if (existingQuizzes == null) {
                                existingQuizzes = new java.util.ArrayList<>();
                                lesEntity.setQuizzes(existingQuizzes);
                            }
                            java.util.List<com.swp391.coding_platform.entity.course.QuizEntity> updatedQuizzes = new java.util.ArrayList<>();

                            for (int qIdx = 0; qIdx < lesDto.getQuizzes().size(); qIdx++) {
                                var qDto = lesDto.getQuizzes().get(qIdx);
                                com.swp391.coding_platform.entity.course.QuizEntity qEntity = null;

                                if (qDto.getId() != null && String.valueOf(qDto.getId()).length() < 10) {
                                    qEntity = existingQuizzes.stream().filter(q -> qDto.getId().equals(q.getId())).findFirst().orElse(null);
                                }

                                if (qEntity == null) {
                                    qEntity = new com.swp391.coding_platform.entity.course.QuizEntity();
                                    qEntity.setLesson(lesEntity);
                                }

                                qEntity.setTitle(qDto.getTitle() != null ? qDto.getTitle() : "");
                                qEntity.setUpdatedAt(Instant.now());

                                // Process Questions
                                if (qEntity.getQuestions() == null) {
                                    qEntity.setQuestions(new java.util.ArrayList<>());
                                }
                                java.util.List<com.swp391.coding_platform.entity.course.QuizQuestionEntity> updatedQuestions = new java.util.ArrayList<>();
                                
                                if (qDto.getQuestions() != null) {
                                    for (int qtIdx = 0; qtIdx < qDto.getQuestions().size(); qtIdx++) {
                                        var qtDto = qDto.getQuestions().get(qtIdx);
                                        com.swp391.coding_platform.entity.course.QuizQuestionEntity qtEntity = null;

                                        if (qtDto.getId() != null && String.valueOf(qtDto.getId()).length() < 10) {
                                            qtEntity = qEntity.getQuestions().stream().filter(qt -> qtDto.getId().equals(qt.getId())).findFirst().orElse(null);
                                        }

                                        if (qtEntity == null) {
                                            qtEntity = new com.swp391.coding_platform.entity.course.QuizQuestionEntity();
                                            qtEntity.setQuiz(qEntity);
                                        }

                                        qtEntity.setContent(qtDto.getContent() != null ? qtDto.getContent() : "");
                                        qtEntity.setOrderIndex(qtIdx + 1);
                                        qtEntity.setUpdatedAt(Instant.now());

                                        // Process Options
                                        if (qtEntity.getOptions() == null) {
                                            qtEntity.setOptions(new java.util.ArrayList<>());
                                        }
                                        qtEntity.getOptions().clear();

                                        if (qtDto.getOptions() != null) {
                                            for (int optIdx = 0; optIdx < qtDto.getOptions().size(); optIdx++) {
                                                var optDto = qtDto.getOptions().get(optIdx);
                                                com.swp391.coding_platform.entity.course.QuizOptionEntity optEntity = new com.swp391.coding_platform.entity.course.QuizOptionEntity();
                                                optEntity.setQuestion(qtEntity);
                                                optEntity.setContent(optDto.getContent() != null ? optDto.getContent() : "");
                                                optEntity.setIsCorrect(optDto.getIsCorrect() != null ? optDto.getIsCorrect() : false);
                                                optEntity.setOrderIndex(optIdx + 1);
                                                qtEntity.getOptions().add(optEntity);
                                            }
                                        }

                                        updatedQuestions.add(qtEntity);
                                    }
                                }
                                
                                qEntity.getQuestions().clear();
                                qEntity.getQuestions().addAll(updatedQuestions);

                                updatedQuizzes.add(qEntity);
                            }

                            lesEntity.getQuizzes().clear();
                            lesEntity.getQuizzes().addAll(updatedQuizzes);
                        }

                        updatedLessons.add(lesEntity);
                    }
                    
                    // Identify lessons to delete
                    java.util.List<com.swp391.coding_platform.entity.course.LessonEntity> lessonsToRemove = new java.util.ArrayList<>(existingLessons);
                    lessonsToRemove.removeAll(updatedLessons);
                    lessonRepository.deleteAll(lessonsToRemove);

                    chEntity.getLessons().clear();
                    chEntity.getLessons().addAll(updatedLessons);
                }

                updatedChapters.add(chEntity);
            }

            // Identify chapters to delete
            java.util.List<com.swp391.coding_platform.entity.course.ChapterEntity> chaptersToRemove = new java.util.ArrayList<>(existingChapters);
            chaptersToRemove.removeAll(updatedChapters);
            chapterRepository.deleteAll(chaptersToRemove);

            course.getChapters().clear();
            course.getChapters().addAll(updatedChapters);
            
            // Update total lessons
            int totalLessons = updatedChapters.stream().mapToInt(c -> c.getLessons() != null ? c.getLessons().size() : 0).sum();
            course.setTotalLessons(totalLessons);

            int totalQuizzes = updatedChapters.stream()
                .mapToInt(c -> c.getLessons() != null ? c.getLessons().stream().mapToInt(l -> l.getQuizzes() != null ? l.getQuizzes().size() : 0).sum() : 0).sum();
            course.setTotalQuizzes(totalQuizzes);

            int totalVideos = updatedChapters.stream()
                .mapToInt(c -> c.getLessons() != null ? (int) c.getLessons().stream().filter(l -> l.getVideoUrl() != null && !l.getVideoUrl().isEmpty()).count() : 0).sum();
            course.setTotalVideos(totalVideos);
        }

        course.setUpdatedAt(Instant.now());

        CourseEntity saved = courseRepository.save(course);

        // Build response
        String status = "draft";
        if ("APPROVED".equalsIgnoreCase(saved.getStatus().name())) {
            status = "published";
        } else if ("PENDING".equalsIgnoreCase(saved.getStatus().name())) {
            status = "review";
        }
        String gradient = "from-orange-400 to-primary";
        if (saved.getId() % 3 == 0) gradient = "from-blue-500 to-indigo-600";
        else if (saved.getId() % 3 == 1) gradient = "from-emerald-500 to-teal-600";

        String icon = "code";
        if (saved.getType().equalsIgnoreCase("DATABASE")) icon = "database";
        else if (saved.getType().equalsIgnoreCase("DEVOPS")) icon = "dns";
        else if (saved.getType().equalsIgnoreCase("DATA_SCIENCE")) icon = "analytics";

        return InstructorCourseResponse.builder()
                .id(String.valueOf(saved.getId()))
                .title(saved.getTitle())
                .topic(saved.getType())
                .price(formatVndPrice(saved.getPrice()))
                .studentsCount(saved.getTotalEnrolled())
                .rating(saved.getAverageRating())
                .reviewsCount(saved.getTotalReviews())
                .status(status)
                .icon(icon)
                .gradient(gradient)
                .description(saved.getShortDescription())
                .thumbnailUrl(saved.getThumbnailUrl())
                .build();
    }

    private InstructorEntity getInstructorByUserId(Integer userId) {
        InstructorEntity instructor = instructorRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        if (instructor.getStatus() == com.swp391.coding_platform.entity.enums.InstructorStatus.SUSPENDED) {
            throw new AppException(ErrorCode.ACCESS_DENIED);
        }
        return instructor;
    }

    public List<TestcaseDto> generateTestcases(TestcaseGeneratorRequest request) {
        int languageId;
        switch (request.getLanguage().toLowerCase()) {
            case "java": languageId = 62; break;
            case "python": languageId = 71; break;
            case "cpp": languageId = 54; break;
            case "c": languageId = 50; break;
            case "csharp": languageId = 51; break;
            default: throw new RuntimeException("Unsupported language: " + request.getLanguage());
        }

        Judge0CallbackPayload response = judge0ClientService.submitSynchronous(languageId, request.getCode());
        
        if (response.getStatus() != null && response.getStatus().getId() != 3) {
            String errorMsg = "Generation failed with status: " + response.getStatus().getDescription();
            if (response.getCompileOutput() != null && !response.getCompileOutput().trim().isEmpty()) {
                errorMsg += "\nCompile Output:\n" + response.getCompileOutput();
            } else if (response.getStderr() != null && !response.getStderr().trim().isEmpty()) {
                errorMsg += "\nRuntime Error:\n" + response.getStderr();
            }
            throw new RuntimeException(errorMsg); // using RuntimeException so frontend gets 400 or 500
        }

        String stdout = response.getStdout() != null ? response.getStdout() : "";
        List<TestcaseDto> testcases = new ArrayList<>();
        
        String[] blocks = stdout.split("---TESTCASE---");
        for (String block : blocks) {
            block = block.trim();
            if (block.isEmpty()) continue;
            
            // Expected block format:
            // INPUT:
            // <input string>
            // OUTPUT:
            // <output string>
            int inputIdx = block.indexOf("INPUT:");
            int outputIdx = block.indexOf("OUTPUT:");
            
            if (inputIdx >= 0 && outputIdx >= 0 && outputIdx > inputIdx) {
                String inputStr = block.substring(inputIdx + 6, outputIdx).trim();
                String outputStr = block.substring(outputIdx + 7).trim();
                
                TestcaseDto tc = new TestcaseDto();
                tc.setId((int)(Math.random() * 1000000));
                tc.setInput(inputStr);
                tc.setOutput(outputStr);
                testcases.add(tc);
            }
        }
        
        return testcases;
    }

    private String formatVndPrice(BigDecimal price) {
        if (price == null) return "0 ₫";
        java.text.NumberFormat nf = java.text.NumberFormat.getNumberInstance(java.util.Locale.GERMANY);
        return nf.format(price.longValue()) + " ₫";
    }

    public com.swp391.coding_platform.dto.response.CourseStatisticResponse getCourseStatistics(Integer userId, Long courseId) {
        InstructorEntity instructor = getInstructorByUserId(userId);
        CourseEntity course = courseRepository.findByIdAndInstructorId(courseId, instructor.getId())
                .orElseThrow(() -> new com.swp391.coding_platform.exception.AppException(com.swp391.coding_platform.exception.ErrorCode.COURSE_NOT_FOUND));

        java.math.BigDecimal revenue = course.getPrice() != null ? course.getPrice().multiply(java.math.BigDecimal.valueOf(course.getTotalEnrolled())) : java.math.BigDecimal.ZERO;

        java.util.List<com.swp391.coding_platform.entity.course.EnrollmentEntity> enrollments = enrollmentRepository.findByCourseId(courseId);
        java.util.List<com.swp391.coding_platform.entity.progress.CompletedLessonsCountEntity> progressList = completedLessonCountRepository.findByCourseId(courseId);

        java.util.Map<Integer, Integer> userProgressMap = progressList.stream()
                .collect(java.util.stream.Collectors.toMap(
                        p -> p.getUser().getId(),
                        com.swp391.coding_platform.entity.progress.CompletedLessonsCountEntity::getCompletedLessonsCount,
                        (existing, replacement) -> existing
                ));

        java.util.List<com.swp391.coding_platform.dto.response.CourseStatisticResponse.StudentProgressDto> studentStats = new java.util.ArrayList<>();
        double totalCompletionPercentage = 0.0;
        int validStudents = 0;
        
        int totalLessons = course.getTotalLessons() != null && course.getTotalLessons() > 0 ? course.getTotalLessons() : 1;

        for (com.swp391.coding_platform.entity.course.EnrollmentEntity e : enrollments) {
            Integer studentId = e.getUser().getId();
            int completedLessons = userProgressMap.getOrDefault(studentId, 0);
            double percentage = ((double) completedLessons / totalLessons) * 100;
            if (percentage > 100) percentage = 100.0;

            studentStats.add(com.swp391.coding_platform.dto.response.CourseStatisticResponse.StudentProgressDto.builder()
                    .userId(studentId)
                    .fullName(e.getUser().getDisplayname())
                    .email(e.getUser().getEmail())
                    .avatarUrl(e.getUser().getAvatarurl())
                    .completedLessons(completedLessons)
                    .totalLessons(totalLessons)
                    .completionPercentage(percentage)
                    .build());
            
            totalCompletionPercentage += percentage;
            validStudents++;
        }

        double averageCompletionRate = validStudents > 0 ? totalCompletionPercentage / validStudents : 0.0;

        return com.swp391.coding_platform.dto.response.CourseStatisticResponse.builder()
                .totalEnrollments(course.getTotalEnrolled())
                .averageRating(course.getAverageRating())
                .totalReviews(course.getTotalReviews())
                .totalRevenue(revenue)
                .averageCompletionRate(averageCompletionRate)
                .students(studentStats)
                .build();
    }
}
