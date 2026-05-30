import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface QuestionReply {
  author: string;
  avatar: string;
  role: string;
  time: string;
  text: string;
}

interface StudentQuestion {
  id: number;
  author: string;
  avatar: string;
  role: string;
  time: string;
  text: string;
  replies: QuestionReply[];
}

interface Lesson {
  title: string;
  video: string;
  overview: string;
  code: string;
  questions: StudentQuestion[];
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface CourseSyllabus {
  chapters: Chapter[];
}



interface InstructorCourse {
  id: string;
  title: string;
  level: string;
  topic: string;
  price: string;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  status: 'published' | 'review' | 'draft';
  icon: string;
  gradient: string;
  description: string;
}

export const InstructorDashboard: React.FC = () => {
  const { user } = useApp();

  // Navigation active tab: 'dashboard' | 'my-courses' | 'revenue' | 'wallet' | 'edit-course'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-courses' | 'revenue' | 'wallet' | 'edit-course'>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Synchronize Tab State with Location Hash (just like in the HTML template)
  useEffect(() => {
    const handleRouting = () => {
      let currentHash = window.location.hash || '#dashboard';
      if (currentHash === '#edit-course') {
        setActiveTab('edit-course');
      } else if (currentHash === '#my-courses') {
        setActiveTab('my-courses');
      } else if (currentHash === '#revenue') {
        setActiveTab('revenue');
      } else if (currentHash === '#wallet') {
        setActiveTab('wallet');
      } else {
        setActiveTab('dashboard');
      }
    };

    window.addEventListener('hashchange', handleRouting);
    handleRouting();

    // Check viewport width for default sidebar collapse preference
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed !== null) {
      setIsSidebarCollapsed(savedCollapsed === 'true');
    } else {
      setIsSidebarCollapsed(window.innerWidth < 768);
    }

    return () => window.removeEventListener('hashchange', handleRouting);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      localStorage.setItem('sidebar-collapsed', String(!prev));
      return !prev;
    });
  };

  // Modals Visibility
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  // Active course syllabus details for the WORKSPACE PANEL
  const [workspaceCourseTitle, setWorkspaceCourseTitle] = useState('Data Structures & Algorithms');
  const [curriculumData, setCurriculumData] = useState<CourseSyllabus>({
    chapters: [
      {
        title: "Getting Started with React & ES6+",
        lessons: [
          {
            title: "Introduction to the Course",
            video: "01_course_intro.mp4",
            overview: "Welcome to the course! In this lesson, we will explore the course syllabus, introduce modern full-stack architectures, and align on our learning goals.",
            code: "None",
            questions: [
              {
                id: 101,
                author: "Alex Johnson",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
                role: "Student",
                time: "2 hours ago",
                text: "Is there a GitHub repository where we can find all the starter templates? Thanks!",
                replies: [
                  {
                    author: "Dr. Jenkins",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is",
                    role: "Instructor (You)",
                    time: "1 hour ago",
                    text: "Yes, you can download the starter pack env_setup.zip in the 'Source Code' tab! I will also push to GitHub soon."
                  }
                ]
              },
              {
                id: 102,
                author: "Sarah Connor",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                role: "Student",
                time: "4 hours ago",
                text: "Will this course cover React Server Components and Next.js 14 App Router, or just pure single-page apps?",
                replies: []
              }
            ]
          },
          {
            title: "Setting up Development Environment",
            video: "02_env_setup.mp4",
            overview: "In this lesson, we will install Node.js, configure VS Code, set up extensions, and verify everything is working.",
            code: "env_setup.zip",
            questions: [
              {
                id: 201,
                author: "Michael Chang",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
                role: "Student",
                time: "1 day ago",
                text: "Should I install Node.js v18 or v20? Will it affect the react scripts later in the course?",
                replies: [
                  {
                    author: "Dr. Jenkins",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is",
                    role: "Instructor (You)",
                    time: "12 hours ago",
                    text: "I recommend Node v20 LTS. It works perfectly with all the libraries used in this course."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Advanced React & State Management",
        lessons: [
          {
            title: "Mastering React Hooks & API Calls",
            video: "03_react_hooks.mp4",
            overview: "Learn how to build custom hooks, manage asynchronous side effects with useEffect, and fetch remote server data cleanly.",
            code: "hooks_demo.zip",
            questions: [
              {
                id: 301,
                author: "Emma Stone",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
                role: "Student",
                time: "3 hours ago",
                text: "Why does my custom hook run twice when the page loads? Is this normal behavior or am I doing something wrong?",
                replies: []
              }
            ]
          },
          {
            title: "Redux Toolkit State Architecture",
            video: "04_redux_toolkit.mp4",
            overview: "We will introduce global state architecture, slices, actions, and store hooks using the Redux Toolkit.",
            code: "redux_rtk.zip",
            questions: [
              {
                id: 401,
                author: "David Beck",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
                role: "Student",
                time: "5 hours ago",
                text: "Can we use Context API instead of Redux Toolkit for smaller modules, or should everything go in the global RTK store?",
                replies: []
              }
            ]
          }
        ]
      }
    ]
  });

  // Selected lesson inside workspace syllabus
  const [selectedLessonIndices, setSelectedLessonIndices] = useState<{ chIdx: number; lesIdx: number }>({ chIdx: 0, lesIdx: 0 });
  const activeLesson = curriculumData.chapters[selectedLessonIndices.chIdx]?.lessons[selectedLessonIndices.lesIdx] || null;

  // Workspace sub-tabs: 'overview' | 'qa' | 'code'
  const [editorTab, setEditorTab] = useState<'overview' | 'qa' | 'code'>('overview');

  // Overview edit states
  const [isOverviewEditing, setIsOverviewEditing] = useState(false);
  const [overviewTextarea, setOverviewTextarea] = useState('');

  const openOverviewEdit = () => {
    if (activeLesson) {
      setOverviewTextarea(activeLesson.overview);
      setIsOverviewEditing(true);
    }
  };

  const saveOverviewEdit = () => {
    setCurriculumData(prev => {
      const newChapters = [...prev.chapters];
      if (newChapters[selectedLessonIndices.chIdx]?.lessons[selectedLessonIndices.lesIdx]) {
        newChapters[selectedLessonIndices.chIdx].lessons[selectedLessonIndices.lesIdx].overview = overviewTextarea;
      }
      return { chapters: newChapters };
    });
    setIsOverviewEditing(false);
  };

  // Student QA response state
  const [qaReplyTextState, setQaReplyTextState] = useState<{ [qId: number]: string }>({});
  const [activeQaReplyInputs, setActiveQaReplyInputs] = useState<{ [qId: number]: boolean }>({});

  const toggleQaReplyInput = (qId: number) => {
    setActiveQaReplyInputs(prev => ({ ...prev, [qId]: !prev[qId] }));
    setQaReplyTextState(prev => ({ ...prev, [qId]: '' }));
  };

  const submitQaReply = (qId: number) => {
    const text = qaReplyTextState[qId]?.trim();
    if (!text) {
      alert('Please write a reply before submitting!');
      return;
    }

    setCurriculumData(prev => {
      const newChapters = [...prev.chapters];
      const chapter = newChapters[selectedLessonIndices.chIdx];
      const lesson = chapter?.lessons[selectedLessonIndices.lesIdx];
      const question = lesson?.questions.find(q => q.id === qId);

      if (question) {
        question.replies = [
          ...question.replies,
          {
            author: "Dr. Jenkins",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is",
            role: "Instructor (You)",
            time: "Just now",
            text: text
          }
        ];
      }
      return { chapters: newChapters };
    });

    setQaReplyTextState(prev => ({ ...prev, [qId]: '' }));
    setActiveQaReplyInputs(prev => ({ ...prev, [qId]: false }));
    alert('Your reply has been posted successfully!');
  };

  // Reviews reply states (Revenue Tab)
  const [reviewReplyTextState, setReviewReplyTextState] = useState<{ [rId: string]: string }>({});
  const [activeReviewReplyInputs, setActiveReviewReplyInputs] = useState<{ [rId: string]: boolean }>({});

  const toggleReviewReplyInput = (rId: string) => {
    setActiveReviewReplyInputs(prev => ({ ...prev, [rId]: !prev[rId] }));
    setReviewReplyTextState(prev => ({ ...prev, [rId]: '' }));
  };

  const submitReviewReply = (rId: string) => {
    const text = reviewReplyTextState[rId]?.trim();
    if (!text) {
      alert('Please type your reply before sending!');
      return;
    }
    alert(`Your reply: "${text}" has been posted successfully!`);
    setReviewReplyTextState(prev => ({ ...prev, [rId]: '' }));
    setActiveReviewReplyInputs(prev => ({ ...prev, [rId]: false }));
  };

  // Video and Source Code replacement in workspace builder
  const handleReplaceVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurriculumData(prev => {
        const newChapters = [...prev.chapters];
        if (newChapters[selectedLessonIndices.chIdx]?.lessons[selectedLessonIndices.lesIdx]) {
          newChapters[selectedLessonIndices.chIdx].lessons[selectedLessonIndices.lesIdx].video = file.name;
        }
        return { chapters: newChapters };
      });
      alert(`Video "${file.name}" has been uploaded and linked to this lesson successfully!`);
    }
  };

  const handleReplaceCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurriculumData(prev => {
        const newChapters = [...prev.chapters];
        if (newChapters[selectedLessonIndices.chIdx]?.lessons[selectedLessonIndices.lesIdx]) {
          newChapters[selectedLessonIndices.chIdx].lessons[selectedLessonIndices.lesIdx].code = file.name;
        }
        return { chapters: newChapters };
      });
      alert(`Source code "${file.name}" uploaded successfully!`);
    }
  };

  // Inline Title Editing in Accordion Outline
  const [editingChapterIdx, setEditingChapterIdx] = useState<number | null>(null);
  const [chapterRenameText, setChapterRenameText] = useState('');

  const [editingLessonIndex, setEditingLessonIndex] = useState<{ chIdx: number; lesIdx: number } | null>(null);
  const [lessonRenameText, setLessonRenameText] = useState('');

  const saveChapterTitleInline = (chIdx: number) => {
    const newTitle = chapterRenameText.trim() || curriculumData.chapters[chIdx].title;
    setCurriculumData(prev => {
      const newChapters = [...prev.chapters];
      newChapters[chIdx].title = newTitle;
      return { chapters: newChapters };
    });
    setEditingChapterIdx(null);
  };

  const saveLessonTitleInline = (chIdx: number, lesIdx: number) => {
    const newTitle = lessonRenameText.trim() || curriculumData.chapters[chIdx].lessons[lesIdx].title;
    setCurriculumData(prev => {
      const newChapters = [...prev.chapters];
      newChapters[chIdx].lessons[lesIdx].title = newTitle;
      return { chapters: newChapters };
    });
    setEditingLessonIndex(null);
  };

  // Chapter & Lesson addition / deletion
  const handleAddChapterWorkspace = () => {
    setCurriculumData(prev => {
      const newChapters = [
        ...prev.chapters,
        {
          title: "New Chapter Title",
          lessons: [
            { title: "First Lesson Overview", video: "01_lesson.mp4", overview: "Provide lesson details...", code: "None", questions: [] }
          ]
        }
      ];
      return { chapters: newChapters };
    });
    // Autoselect last chapter's first lesson
    setSelectedLessonIndices({ chIdx: curriculumData.chapters.length, lesIdx: 0 });
  };

  const handleDeleteChapterWorkspace = (chIdx: number) => {
    if (curriculumData.chapters.length > 1) {
      setCurriculumData(prev => {
        const newChapters = prev.chapters.filter((_, i) => i !== chIdx);
        return { chapters: newChapters };
      });
      setSelectedLessonIndices({ chIdx: 0, lesIdx: 0 });
    } else {
      alert('Course syllabus must have at least one chapter!');
    }
  };

  const handleAddLessonWorkspace = (chIdx: number) => {
    setCurriculumData(prev => {
      const newChapters = [...prev.chapters];
      const nextNum = newChapters[chIdx].lessons.length + 1;
      newChapters[chIdx].lessons.push({
        title: `Lesson ${nextNum} Overview`,
        video: `0${nextNum}_lesson.mp4`,
        overview: "Provide syllabus details...",
        code: "None",
        questions: []
      });
      return { chapters: newChapters };
    });
  };

  const handleDeleteLessonWorkspace = (chIdx: number, lesIdx: number) => {
    if (curriculumData.chapters[chIdx].lessons.length > 1) {
      setCurriculumData(prev => {
        const newChapters = [...prev.chapters];
        newChapters[chIdx].lessons = newChapters[chIdx].lessons.filter((_, i) => i !== lesIdx);
        return { chapters: newChapters };
      });
      setSelectedLessonIndices({ chIdx: 0, lesIdx: 0 });
    } else {
      alert('A chapter must have at least one lesson!');
    }
  };

  const openSyllabusEditor = (courseTitle: string) => {
    setWorkspaceCourseTitle(courseTitle);
    window.location.hash = '#edit-course';
  };

  const closeSyllabusEditor = () => {
    window.location.hash = '#my-courses';
  };



  const [instructorCourses, setInstructorCourses] = useState<InstructorCourse[]>([
    {
      id: 'ic-1',
      title: 'Data Structures & Algorithms',
      level: 'Intermediate',
      topic: 'Theory & Practices',
      price: '499.000 ₫',
      studentsCount: 524,
      rating: 4.9,
      reviewsCount: 120,
      status: 'published',
      icon: 'code',
      gradient: 'from-orange-400 to-primary',
      description: 'Master arrays, lists, trees, graphs, sorting, and search concepts utilizing premium visualizations.'
    },
    {
      id: 'ic-2',
      title: 'Java Web Development',
      level: 'Beginner',
      topic: 'Backend Tech',
      price: '699.000 ₫',
      studentsCount: 312,
      rating: 4.7,
      reviewsCount: 85,
      status: 'published',
      icon: 'javascript',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Understand MVC architectures, Spring Boot pipelines, databases, and microservices logic in this beginner pack.'
    },
    {
      id: 'ic-3',
      title: 'Python for Automation',
      level: 'Advanced',
      topic: 'Scripts & Models',
      price: '599.000 ₫',
      studentsCount: 189,
      rating: 4.8,
      reviewsCount: 42,
      status: 'published',
      icon: 'terminal',
      gradient: 'from-emerald-555 to-teal-600',
      description: 'Write robust scripting solutions to automate tasks, scrape data, and implement machine learning workflows.'
    },
    {
      id: 'ic-4',
      title: 'C++ Competitive Programming',
      level: 'Advanced',
      topic: 'Coding Skills',
      price: '799.000 ₫',
      studentsCount: 0,
      rating: 0.0,
      reviewsCount: 0,
      status: 'review',
      icon: 'developer_mode',
      gradient: 'from-rose-500 to-red-600',
      description: 'Master advanced STL containers, segment trees, heavy-light decomposition, and dynamic programming for international contests.'
    },
    {
      id: 'ic-5',
      title: 'Advanced Frontend Architecture',
      level: 'Advanced',
      topic: 'Frontend Tech',
      price: '899.000 ₫',
      studentsCount: 0,
      rating: 0.0,
      reviewsCount: 0,
      status: 'draft',
      icon: 'html',
      gradient: 'from-purple-500 to-pink-600',
      description: 'Deep dive into React fiber, custom renderers, Webpack/Vite bundler design, micro-frontends, and performance profiling.'
    }
  ]);

  const [courseSubTab, setCourseSubTab] = useState<'all' | 'published' | 'review' | 'draft'>('all');
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseSortFilter, setCourseSortFilter] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const filteredAndSortedCourses = useMemo(() => {
    let result = [...instructorCourses];

    // 1. Filter by sub-tab status
    if (courseSubTab !== 'all') {
      result = result.filter(c => c.status === courseSubTab);
    }

    // 2. Filter by search query
    if (courseSearchTerm.trim() !== '') {
      const q = courseSearchTerm.toLowerCase().trim();
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    // 3. Sort
    if (courseSortFilter === 'price-low') {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
        return pA - pB;
      });
    } else if (courseSortFilter === 'price-high') {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
        return pB - pA;
      });
    } else {
      // Newest first (descending by ID string)
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [instructorCourses, courseSubTab, courseSearchTerm, courseSortFilter]);



  // Course stats timeframe period (1, 3, 6, 9, 12 months)
  const [statsPeriod, setStatsPeriod] = useState<number>(3);

  const courseStats = useMemo(() => {
    return instructorCourses
      .filter(c => c.status === 'published')
      .map(c => {
        const factor = statsPeriod / 12;
        const hash = c.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const variation = 0.8 + (hash % 5) * 0.1;
        const periodStudents = Math.round(c.studentsCount * factor * variation);
        const priceNum = parseInt(c.price.replace(/[^\d]/g, '')) || 0;
        const periodRevenue = periodStudents * priceNum;

        return {
          id: c.id,
          title: c.title,
          students: periodStudents,
          revenue: periodRevenue.toLocaleString('vi-VN') + ' ₫'
        };
      });
  }, [instructorCourses, statsPeriod]);

  const mockRegistrations = [
    { studentName: 'Nguyen Van A', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=eef7ee&color=46A040&bold=true', course: 'Data Structures & Algorithms', time: 'May 24, 2026 16:12', amount: '499.000 ₫' },
    { studentName: 'Tran Thi B', avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=fce2d3&color=F36F21&bold=true', course: 'Java Web Development', time: 'May 24, 2026 15:12', amount: '699.000 ₫' },
    { studentName: 'Le Huy C', avatar: 'https://ui-avatars.com/api/?name=Le+Huy+C&background=e8f0fe&color=1a73e8&bold=true', course: 'Python for Automation', time: 'May 23, 2026 18:12', amount: '599.000 ₫' },
    { studentName: 'Pham Van D', avatar: 'https://ui-avatars.com/api/?name=Pham+Van+D&background=fdf4ff&color=c084fc&bold=true', course: 'Data Structures & Algorithms', time: 'May 23, 2026 14:30', amount: '499.000 ₫' },
    { studentName: 'Hoang Thi E', avatar: 'https://ui-avatars.com/api/?name=Hoang+Thi+E&background=ecfdf5&color=10b981&bold=true', course: 'Java Web Development', time: 'May 22, 2026 10:15', amount: '699.000 ₫' },
    { studentName: 'Bui Van F', avatar: 'https://ui-avatars.com/api/?name=Bui+Van+F&background=fff7ed&color=f97316&bold=true', course: 'Python for Automation', time: 'May 22, 2026 09:45', amount: '599.000 ₫' },
    { studentName: 'Ngo Thi G', avatar: 'https://ui-avatars.com/api/?name=Ngo+Thi+G&background=eff6ff&color=3b82f6&bold=true', course: 'Data Structures & Algorithms', time: 'May 21, 2026 16:00', amount: '499.000 ₫' },
    { studentName: 'Vu Huy H', avatar: 'https://ui-avatars.com/api/?name=Vu+Huy+H&background=faf5ff&color=a855f7&bold=true', course: 'Java Web Development', time: 'May 20, 2026 11:20', amount: '699.000 ₫' },
    { studentName: 'Do Thi I', avatar: 'https://ui-avatars.com/api/?name=Do+Thi+I&background=f0fdf4&color=16a34a&bold=true', course: 'Python for Automation', time: 'May 19, 2026 14:10', amount: '599.000 ₫' },
    { studentName: 'Hoang Van J', avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+J&background=fef2f2&color=ef4444&bold=true', course: 'Data Structures & Algorithms', time: 'May 18, 2026 15:35', amount: '499.000 ₫' },
  ];



  // Create Course Form Specification Builders (Highlights, learn metrics, tools, etc.)
  const [learnPoints, setLearnPoints] = useState<string[]>(['Architect scalable MERN applications']);
  const [highlightPoints, setHighlightPoints] = useState<string[]>(['15+ Real-world Projects']);
  const [techPoints, setTechPoints] = useState<string[]>(['React']);
  const [prereqPoints, setPrereqPoints] = useState<string[]>(['Basic JavaScript knowledge (ES6+ features)']);
  const [audiencePoints, setAudiencePoints] = useState<string[]>(['Aspiring Full-Stack Developers']);
  const [benefitPoints, setBenefitPoints] = useState<string[]>(['Professional Certificate']);

  const [courseTitleInput, setCourseTitleInput] = useState('Mastering Full-Stack React & Node.js');
  const [courseTopicInput, setCourseTopicInput] = useState('Web Development');
  const [courseLanguageInput, setCourseLanguageInput] = useState('JavaScript');
  const [courseLevelInput, setCourseLevelInput] = useState('Intermediate');
  const [coursePriceInput, setCoursePriceInput] = useState('499000');
  const [courseDescInput, setCourseDescInput] = useState('Build scalable, production-ready web applications from scratch. Learn advanced patterns...');
  const [courseLongDescInput, setCourseLongDescInput] = useState('The "Mastering Full-Stack React & Node.js" course is a transformative journey designed to take you from zero to a production-ready developer...');
  
  // Thumbnail file mock state
  const [thumbnailFile, setThumbnailFile] = useState<{ name: string; size: string; url: string } | null>(null);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailFile({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          url: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct new InstructorCourse
    const newCourse: InstructorCourse = {
      id: `ic-${Date.now()}`,
      title: courseTitleInput || 'Untitled Course',
      level: courseLevelInput,
      topic: courseTopicInput,
      price: Number(coursePriceInput).toLocaleString('vi-VN') + ' ₫',
      studentsCount: 0,
      rating: 0.0,
      reviewsCount: 0,
      status: 'review', // Defaults to 'review' as it was submitted for review
      icon: courseTopicInput === 'Data Science & AI' ? 'analytics' : 
            courseTopicInput === 'Algorithms & Data Structures' ? 'data_object' : 
            courseTopicInput === 'Database Systems' ? 'database' : 
            courseTopicInput === 'Cloud Computing' ? 'dns' : 'code',
      gradient: courseLevelInput === 'beginner' || courseLevelInput === 'Beginner' ? 'from-blue-500 to-indigo-600' :
                courseLevelInput === 'advanced' || courseLevelInput === 'Advanced' ? 'from-emerald-500 to-teal-600' : 'from-orange-400 to-primary',
      description: courseDescInput || 'No description provided.',
    };

    setInstructorCourses(prev => [newCourse, ...prev]);
    alert(`Course "${courseTitleInput}" has been successfully created and submitted for review!`);
    setIsCreateCourseOpen(false);

    // Reset simple values
    setCourseTitleInput('Mastering Full-Stack React & Node.js');
    setThumbnailFile(null);
    setLearnPoints(['Architect scalable MERN applications']);
    setHighlightPoints(['15+ Real-world Projects']);
    setTechPoints(['React']);
    setPrereqPoints(['Basic JavaScript knowledge (ES6+ features)']);
    setAudiencePoints(['Aspiring Full-Stack Developers']);
    setBenefitPoints(['Professional Certificate']);
  };

  const resetSimpleCourseForm = () => {
    setCourseTitleInput('');
    setThumbnailFile(null);
    setLearnPoints(['']);
    setHighlightPoints(['']);
    setTechPoints(['']);
    setPrereqPoints(['']);
    setAudiencePoints(['']);
    setBenefitPoints(['']);
  };

  // Payout action
  const handlePayoutRequest = () => {
    alert("Withdrawal request submitted successfully! Funds will be credited to your bank account within 2 business days.");
  };

  // Check user logging context
  if (!user) {
    return (
      <div className="bg-surface rounded-2xl border border-gray-150 p-12 text-center shadow-sm max-w-md mx-auto my-12 relative z-10">
        <span className="material-symbols-outlined text-red-500 text-5xl mb-4">lock</span>
        <h3 className="font-display font-black text-xl text-brand-blue mb-2">Access Denied</h3>
        <p className="font-body text-sm text-text-muted mb-6">Please log in to manage your instructor courses.</p>
        <Link to="/login" className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f9] text-text-main font-body min-h-screen flex flex-row antialiased selection:bg-primary-light selection:text-brand-blue relative overflow-x-hidden w-full text-left">
      
      {/* Glow Backdrop styles and properties embedded securely */}
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }

        /* Glassmorphism details */
        .glass-panel {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .ambient-shadow {
            box-shadow: 0 4px 20px rgba(18, 40, 76, 0.04);
        }

        .ambient-shadow-hover:hover {
            box-shadow: 0 10px 30px rgba(18, 40, 76, 0.08);
            transform: translateY(-2px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Pulsing dot for ongoing contests */
        .pulse-dot {
            position: relative;
        }

        .pulse-dot::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: inherit;
            animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-ring {
            0% {
                transform: scale(1);
                opacity: 1;
            }

            100% {
                transform: scale(2.5);
                opacity: 0;
            }
        }

        /* Collapsible sidebar layout overrides */
        .sidebar-expanded {
            width: 16rem !important;
        }

        .sidebar-collapsed {
            width: 5rem !important;
        }

        .main-expanded {
            margin-left: 16rem !important;
        }

        .main-collapsed {
            margin-left: 5rem !important;
        }

        /* Elements visibility when collapsed */
        .sidebar-collapsed .sidebar-text,
        .sidebar-collapsed .sidebar-footer-text {
            display: none !important;
        }

        .sidebar-collapsed nav a {
            justify-content: center !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .sidebar-collapsed .p-3 a {
            justify-content: center !important;
        }

        .sidebar-collapsed .p-3 div.flex {
            padding: 0.25rem !important;
            justify-content: center !important;
        }

        .sidebar-collapsed #sidebar-header {
            flex-direction: column !important;
            height: auto !important;
            padding-top: 1.25rem !important;
            padding-bottom: 1.25rem !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            gap: 0.75rem !important;
        }
      `}</style>

      {/* Glowing Backdrop Circles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Pinned Left Navigation Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        } bg-brand-blue text-white flex flex-col justify-between z-50 border-r border-brand-blue-light/35 shadow-2xl shrink-0 overflow-visible`}
      >
        {/* Sidebar Brand / Logo Header */}
        <div className="flex items-center justify-center px-4 h-20 border-b border-brand-blue-light/30 shrink-0" id="sidebar-header">
          <Link to="/" className="flex items-center justify-center logo-link w-full">
            <img
              src={isSidebarCollapsed ? `${import.meta.env.BASE_URL}LOGO_SINGLE.png` : `${import.meta.env.BASE_URL}LOGO.png`}
              alt="Logo"
              className="h-12 w-[300px] object-contain transition-all duration-300"
              id="sidebar-logo"
            />
          </Link>
        </div>

        {/* Sidebar Navigation Links using state routing triggers */}
        <nav className="flex-1 flex flex-col gap-1.5 py-6 px-2.5 overflow-y-auto">
          <a
            href="#dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-white/10 text-white font-bold border-l-4 border-primary'
                : 'hover:bg-white/5 text-slate-300 hover:text-white font-medium'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-colors group-hover:text-primary ${
              activeTab === 'dashboard' ? 'text-primary icon-fill' : ''
            }`}>dashboard</span>
            <span className="sidebar-text text-sm">Dashboard</span>
          </a>

          <a
            href="#my-courses"
            onClick={() => setActiveTab('my-courses')}
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'my-courses' || activeTab === 'edit-course'
                ? 'bg-white/10 text-white font-bold border-l-4 border-primary'
                : 'hover:bg-white/5 text-slate-300 hover:text-white font-medium'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-colors group-hover:text-primary ${
              activeTab === 'my-courses' || activeTab === 'edit-course' ? 'text-primary icon-fill' : ''
            }`}>library_books</span>
            <span className="sidebar-text text-sm">My Courses</span>
          </a>



          <a
            href="#revenue"
            onClick={() => setActiveTab('revenue')}
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'revenue'
                ? 'bg-white/10 text-white font-bold border-l-4 border-primary'
                : 'hover:bg-white/5 text-slate-300 hover:text-white font-medium'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-colors group-hover:text-primary ${
              activeTab === 'revenue' ? 'text-primary icon-fill' : ''
            }`}>insights</span>
            <span className="sidebar-text text-sm">Revenue</span>
          </a>

          <a
            href="#wallet"
            onClick={() => setActiveTab('wallet')}
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'wallet'
                ? 'bg-white/10 text-white font-bold border-l-4 border-primary'
                : 'hover:bg-white/5 text-slate-300 hover:text-white font-medium'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-colors group-hover:text-primary ${
              activeTab === 'wallet' ? 'text-primary icon-fill' : ''
            }`}>account_balance_wallet</span>
            <span className="sidebar-text text-sm">Wallet</span>
          </a>
        </nav>

        {/* Sidebar Footer Action (Student View Switcher & Profile) */}
        <div className="p-3 border-t border-brand-blue-light/30 flex flex-col gap-3 shrink-0">
          {/* Student View Button */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-semibold transition-all duration-200 justify-center md:justify-start shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">swap_horiz</span>
            <span className="sidebar-footer-text whitespace-nowrap">Student View</span>
          </Link>

          {/* Instructor User Identity */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-brand-blue-light/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is"
              alt="Instructor Avatar"
              className="w-8 h-8 rounded-full border border-primary/40 object-cover shrink-0"
            />
            <div className="sidebar-footer-text flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate leading-tight">Dr. Jenkins</span>
              <span className="text-[10px] text-slate-400 truncate leading-none">Primary Instructor</span>
            </div>
          </div>
        </div>

        {/* Floating Sidebar Toggle Button (Vertically Centered on Right Border) */}
        <button
          onClick={toggleSidebar}
          id="sidebar-toggle"
          className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg border border-white/20 z-50 transition-all duration-300 hover:scale-110"
          title="Toggle Sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </aside>

      {/* Main Content Area (Shifts dynamically based on sidebar width) */}
      <div
        id="main-content"
        className={`flex-grow transition-all duration-300 relative z-10 ${
          isSidebarCollapsed ? 'main-collapsed' : 'main-expanded'
        } min-h-screen flex flex-col`}
      >
        
        {/* Main content body inside React routing layout shell */}
        {activeTab !== 'edit-course' && (
          <main className="flex-grow p-4 md:p-8 lg:p-10 flex flex-col gap-8 max-w-[1440px] mx-auto w-full">
            
            {/* ================= TAB: DASHBOARD ================= */}
            {activeTab === 'dashboard' && (
              <div id="tab-dashboard" className="tab-content flex flex-col gap-8">
                {/* Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-[#fce2d3] border border-primary/20 px-3 py-1 rounded-full text-primary font-bold text-xs uppercase tracking-wider mb-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-xs icon-fill">school</span> Instructor Dashboard
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-black leading-tight">
                      <span className="bg-gradient-to-r from-brand-blue to-blue-600 bg-clip-text text-transparent">Hello, </span>
                      <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Dr. Jenkins! 👋</span>
                    </h1>
                    <p className="text-text-muted mt-1">Here is a high-level summary of your classes and revenue statistics.</p>
                  </div>

                  {/* Quick Time Filter */}
                  <div className="flex items-center gap-2 self-start md:self-auto bg-surface py-1.5 px-3 rounded-xl border border-slate-200/60 shadow-sm">
                    <span className="material-symbols-outlined text-sm text-text-muted">calendar_today</span>
                    <select className="border-0 bg-transparent text-xs font-semibold text-text-main py-0 pl-1 pr-8 focus:ring-0 cursor-pointer">
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                    </select>
                  </div>
                </div>

                {/* Stats Overview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Stat Card 1 */}
                  <div className="bg-surface rounded-2xl p-5 border border-slate-200/50 ambient-shadow flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Students</span>
                      <span className="text-3xl font-display font-black text-brand-blue mt-1">
                        {instructorCourses.filter(c => c.status === 'published').reduce((sum, c) => sum + c.studentsCount, 0).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-brand-green mt-1">
                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +12.4% this month
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-brand-green-light text-brand-green flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl icon-fill">group</span>
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="bg-surface rounded-2xl p-5 border border-slate-200/50 ambient-shadow flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Active Courses</span>
                      <span className="text-3xl font-display font-black text-brand-blue mt-1">
                        {instructorCourses.filter(c => c.status === 'published').length}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {instructorCourses.filter(c => c.status === 'draft').length} drafts, {instructorCourses.filter(c => c.status === 'review').length} pending approval
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary-light/50 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl icon-fill">library_books</span>
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="bg-surface rounded-2xl p-5 border border-slate-200/50 ambient-shadow flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Revenue</span>
                      <span className="text-2xl md:text-3xl font-display font-black text-brand-blue mt-1">15.230K ₫</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-brand-green mt-1.5">
                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +8.2% vs last month
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl icon-fill">payments</span>
                    </div>
                  </div>
                </div>

                {/* Graphs & Actions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Analytics Enrollment Chart */}
                  <div className="lg:col-span-8 bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-display font-bold text-lg text-brand-blue">Student Enrollment Trend</h3>
                        <p className="text-xs text-text-muted">Visualizes course subscriptions over the last 5 months.</p>
                      </div>
                      <span className="text-xs font-bold text-primary flex items-center gap-1 bg-primary-light/30 px-2 py-0.5 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Subscriptions
                      </span>
                    </div>

                    {/* Curved Premium SVG Line Chart */}
                    <div className="w-full relative h-[250px] mt-4 select-none">
                      <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F36F21" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#F36F21" stopOpacity="0.00" />
                          </linearGradient>
                        </defs>

                        {/* Grid Lines */}
                        <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" strokeWidth="1.5" />
                        <line x1="0" y1="90" x2="700" y2="90" stroke="#f1f5f9" strokeWidth="1.5" />
                        <line x1="0" y1="140" x2="700" y2="140" stroke="#f1f5f9" strokeWidth="1.5" />
                        <line x1="0" y1="190" x2="700" y2="190" stroke="#f1f5f9" strokeWidth="1.5" />

                        {/* Filled Area Under the Curve */}
                        <path
                          d="M 50 190 C 150 170, 200 130, 300 120 C 400 110, 450 70, 550 50 C 600 40, 650 30, 670 25 L 670 190 Z"
                          fill="url(#chartGradient)"></path>

                        {/* Smooth Orange Trend Line */}
                        <path
                          d="M 50 190 C 150 170, 200 130, 300 120 C 400 110, 450 70, 550 50 C 600 40, 650 30, 670 25"
                          fill="none" stroke="#F36F21" strokeWidth="3" strokeLinecap="round"></path>

                        {/* Data Dots */}
                        <circle cx="50" cy="190" r="5" fill="#fff" stroke="#F36F21" strokeWidth="3"></circle>
                        <circle cx="170" cy="165" r="5" fill="#fff" stroke="#F36F21" strokeWidth="3"></circle>
                        <circle cx="300" cy="120" r="5" fill="#fff" stroke="#F36F21" strokeWidth="3"></circle>
                        <circle cx="430" cy="95" r="5" fill="#fff" stroke="#F36F21" strokeWidth="3"></circle>
                        <circle cx="550" cy="50" r="5" fill="#fff" stroke="#F36F21" strokeWidth="3"></circle>
                        <circle cx="670" cy="25" r="5" fill="#fff" stroke="#F36F21" strokeWidth="3"></circle>

                        {/* X Axis Labels */}
                        <text x="50" y="215" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">January</text>
                        <text x="170" y="215" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">February</text>
                        <text x="300" y="215" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">March</text>
                        <text x="430" y="215" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">April</text>
                        <text x="550" y="215" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">May</text>
                        <text x="670" y="215" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">June</text>
                      </svg>
                    </div>
                  </div>

                  {/* Right: Quick Console Actions */}
                  <div className="lg:col-span-4 bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-brand-blue mb-4">Quick Actions</h3>
                      <div className="flex flex-col gap-3">
                        {/* Create Course CTA */}
                        <button
                          onClick={() => setIsCreateCourseOpen(true)}
                          className="group text-left p-3.5 rounded-xl border border-slate-200 hover:border-primary/30 bg-surface hover:bg-primary-light/10 transition-all duration-300 flex items-center gap-3 w-full"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-[20px]">library_add</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-brand-blue group-hover:text-primary transition-colors">Create New Course</h4>
                            <p className="text-[11px] text-text-muted mt-0.5">Design syllabus, upload files, write content.</p>
                          </div>
                        </button>



                        {/* View Sales CTA */}
                        <a
                          href="#revenue"
                          onClick={() => setActiveTab('revenue')}
                          className="group text-left p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-surface hover:bg-blue-50/50 transition-all duration-300 flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-[20px]">query_stats</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-brand-blue group-hover:text-blue-600 transition-colors">View Sales & Revenue</h4>
                            <p className="text-[11px] text-text-muted mt-0.5">Track user payouts and subscription growth.</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted font-medium bg-slate-50 p-3.5 rounded-xl">
                      <span>Next payout cycle:</span>
                      <span className="font-bold text-brand-blue">June 01, 2026</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activities Feed */}
                <div className="bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-lg text-brand-blue">Recent Course Registrations</h3>
                    <a href="#revenue" onClick={() => setActiveTab('revenue')} className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-0.5">
                      See all records <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </a>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead>
                        <tr className="text-xs uppercase tracking-wider text-text-muted border-b border-slate-100 font-semibold bg-slate-50/50 rounded-lg">
                          <th className="py-3 px-4 rounded-l-lg">Student</th>
                          <th className="py-3 px-4">Course Name</th>
                          <th className="py-3 px-4 rounded-r-lg">Registration Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {mockRegistrations.slice(0, 3).map((reg, idx) => (
                          <tr key={idx}>
                            <td className="py-3.5 px-4 flex items-center gap-3">
                              <img src={reg.avatar} className="w-8 h-8 rounded-full border border-slate-200 object-cover" alt="Student" />
                              <span className="font-bold text-brand-blue">{reg.studentName}</span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-700 font-medium">{reg.course}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-medium">{reg.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Course Statistics Section */}
                <div className="bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-brand-blue">Course Performance Statistics</h3>
                      <p className="text-xs text-text-muted mt-0.5">Enrolled students and gross revenue by course for the selected period.</p>
                    </div>
                    {/* Timeframe selector (Pills style) */}
                    <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/40">
                      {[
                        { label: '1 Month', value: 1 },
                        { label: '3 Months', value: 3 },
                        { label: '6 Months', value: 6 },
                        { label: '9 Months', value: 9 },
                        { label: '1 Year', value: 12 },
                      ].map((t) => {
                        const isActive = statsPeriod === t.value;
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setStatsPeriod(t.value)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 select-none ${
                              isActive
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-slate-600 hover:text-brand-blue hover:bg-white/50'
                            }`}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead>
                        <tr className="text-xs uppercase tracking-wider text-text-muted border-b border-slate-100 font-semibold bg-slate-50/50 rounded-lg">
                          <th className="py-3 px-4 rounded-l-lg">Course Name</th>
                          <th className="py-3 px-4 text-center">Total Students Enrolled</th>
                          <th className="py-3 px-4 text-right rounded-r-lg">Total Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {courseStats.map((stat) => (
                          <tr key={stat.id} className="hover:bg-slate-50/65 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-brand-blue">{stat.title}</td>
                            <td className="py-3.5 px-4 text-center font-medium text-slate-700">{stat.students.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right font-bold text-brand-green">{stat.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: MY COURSES ================= */}
            {activeTab === 'my-courses' && (
              <div id="tab-my-courses" className="tab-content flex flex-col gap-8">
                {/* Top course bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-brand-blue">My Authored Courses</h2>
                    <p className="text-xs text-text-muted mt-0.5">Manage details, modules, prices, and status for your student modules.</p>
                  </div>
                  <button
                    onClick={() => setIsCreateCourseOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-semibold shadow-md shadow-primary/20 transition-all text-sm shrink-0 self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>Create Course</span>
                  </button>
                </div>

                {/* Sub-tabs for Course Categories */}
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/40 pb-4">
                  <button
                    onClick={() => setCourseSubTab('all')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all select-none border border-slate-200/60 shadow-sm ${
                      courseSubTab === 'all'
                        ? 'bg-primary text-white border-primary shadow-md shadow-primary/10'
                        : 'bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">menu</span>
                    <span>All Courses</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      courseSubTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>{instructorCourses.length}</span>
                  </button>

                  <button
                    onClick={() => setCourseSubTab('published')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all select-none border border-slate-200/60 shadow-sm ${
                      courseSubTab === 'published'
                        ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/10'
                        : 'bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] icon-fill">check_circle</span>
                    <span>Active</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      courseSubTab === 'published' ? 'bg-white/20 text-white' : 'bg-green-50 text-brand-green'
                    }`}>{instructorCourses.filter(c => c.status === 'published').length}</span>
                  </button>

                  <button
                    onClick={() => setCourseSubTab('review')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all select-none border border-slate-200/60 shadow-sm ${
                      courseSubTab === 'review'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] icon-fill">pending</span>
                    <span>Pending Approval</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      courseSubTab === 'review' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'
                    }`}>{instructorCourses.filter(c => c.status === 'review').length}</span>
                  </button>

                  <button
                    onClick={() => setCourseSubTab('draft')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all select-none border border-slate-200/60 shadow-sm ${
                      courseSubTab === 'draft'
                        ? 'bg-slate-500 text-white border-slate-500 shadow-md shadow-slate-500/10'
                        : 'bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    <span>Drafts</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      courseSubTab === 'draft' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>{instructorCourses.filter(c => c.status === 'draft').length}</span>
                  </button>
                </div>

                {/* Filter & Search Row */}
                <div className="bg-surface p-4 rounded-xl border border-slate-200/50 ambient-shadow flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[18px] text-text-muted">search</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={courseSearchTerm}
                      onChange={(e) => setCourseSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm border-slate-200/60 rounded-xl focus:border-primary focus:ring-primary focus:ring-1 bg-[#f8fafc]/50 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <select
                      value={courseSubTab}
                      onChange={(e) => setCourseSubTab(e.target.value as any)}
                      className="border-slate-200/60 rounded-xl text-xs font-semibold text-text-main py-2 focus:ring-primary focus:ring-1 focus:border-primary cursor-pointer bg-white"
                    >
                      <option value="all">All States</option>
                      <option value="published">Active (Published)</option>
                      <option value="review">Pending Review (Under Review)</option>
                      <option value="draft">Draft (Creating)</option>
                    </select>
                    <select
                      value={courseSortFilter}
                      onChange={(e) => setCourseSortFilter(e.target.value as any)}
                      className="border-slate-200/60 rounded-xl text-xs font-semibold text-text-main py-2 focus:ring-primary focus:ring-1 focus:border-primary cursor-pointer bg-white"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses-container">
                  {filteredAndSortedCourses.length === 0 ? (
                    <div className="col-span-full py-12 text-center bg-surface border border-dashed border-slate-200 rounded-2xl">
                      <span className="material-symbols-outlined text-slate-400 text-5xl mb-3">inbox</span>
                      <p className="text-sm font-semibold text-slate-500">No courses found matching your criteria</p>
                    </div>
                  ) : (
                    filteredAndSortedCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-surface rounded-2xl border border-slate-200/50 overflow-hidden ambient-shadow flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                      >
                        <div>
                          {/* SVG Thumbnail placeholder */}
                          <div className={`h-44 bg-gradient-to-r ${course.gradient} p-6 flex flex-col justify-between text-white relative`}>
                            <span className="px-2.5 py-0.5 rounded bg-white/20 text-white font-bold text-[10px] uppercase w-fit tracking-wider">
                              {course.level}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-white/80">{course.topic}</span>
                              <span className="text-xl font-display font-extrabold tracking-tight mt-1 leading-tight line-clamp-2">
                                {course.title}
                              </span>
                            </div>
                            <div className="absolute bottom-2 right-2 opacity-15">
                              <span className="material-symbols-outlined text-[80px]">{course.icon}</span>
                            </div>
                          </div>

                          <div className="p-5 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              {course.status === 'published' && (
                                <span className="px-2.5 py-0.5 text-xs rounded-full bg-brand-green-light text-brand-green font-bold flex items-center gap-1 select-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                                  Active
                                </span>
                              )}
                              {course.status === 'review' && (
                                <span className="px-2.5 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-bold flex items-center gap-1 select-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                  Under Review
                                </span>
                              )}
                              {course.status === 'draft' && (
                                <span className="px-2.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600 font-bold flex items-center gap-1 select-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                  Draft
                                </span>
                              )}
                              <span className="text-sm font-bold text-primary">{course.price}</span>
                            </div>
                            <p className="text-xs text-text-muted line-clamp-2">{course.description}</p>
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                              <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-text-muted">group</span>
                                <span>{course.studentsCount} Students</span>
                              </div>
                              <div className="flex items-center gap-1.5 justify-end">
                                <span className="material-symbols-outlined text-[16px] text-amber-500 icon-fill">star</span>
                                <span>
                                  {course.rating > 0
                                    ? `${course.rating} (${course.reviewsCount} reviews)`
                                    : 'No reviews yet'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 grid grid-cols-2 gap-3.5">
                          {course.status === 'published' && (
                            <>
                              <button
                                onClick={() => openSyllabusEditor(course.title)}
                                className="col-span-2 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-blue font-bold transition-all border border-slate-200/30"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span> Edit Syllabus
                              </button>
                            </>
                          )}

                          {course.status === 'review' && (
                            <button
                              onClick={() =>
                                alert(`Course "${course.title}" is pending admin review and activation.`)
                              }
                              className="col-span-2 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 font-bold transition-all border border-slate-200/50"
                            >
                              <span className="material-symbols-outlined text-[16px] text-amber-500">info</span>
                              View Review Details
                            </button>
                          )}

                          {course.status === 'draft' && (
                            <>
                              <button
                                onClick={() => openSyllabusEditor(course.title)}
                                className="flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-blue font-bold transition-all border border-slate-200/30"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span> Resume Edit
                              </button>
                              <button
                                onClick={() => {
                                  setInstructorCourses((prev) =>
                                    prev.map((c) =>
                                      c.id === course.id ? { ...c, status: 'review' } : c
                                    )
                                  );
                                  alert(`Submitted successfully! Course "${course.title}" has been sent for admin review.`);
                                }}
                                className="flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all shadow-sm"
                              >
                                <span className="material-symbols-outlined text-[16px]">publish</span> Submit for Review
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>


              </div>
            )}



            {/* ================= TAB: REVENUE ================= */}
            {activeTab === 'revenue' && (
              <div id="tab-revenue" className="tab-content flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-brand-blue">Revenue Analytics</h2>
                  <p className="text-xs text-text-muted mt-0.5">Gain critical insights into subscription revenues, pass rates, and client satisfaction metrics.</p>
                </div>

                {/* Earnings Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left stats summary */}
                  <div className="lg:col-span-4 bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                      <h3 className="font-display font-bold text-lg text-brand-blue">Financial Overview</h3>

                      <div className="bg-[#f8fafc] p-4.5 rounded-xl border border-slate-200/40">
                        <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Total Earnings (Gross)</span>
                        <p className="text-2xl font-display font-black text-brand-blue mt-1">15.230.000 ₫</p>
                      </div>

                      <div className="bg-brand-green-light p-4.5 rounded-xl border border-brand-green/10">
                        <span className="text-[10px] text-brand-green uppercase tracking-wider font-bold">Pending Withdrawal</span>
                        <p className="text-2xl font-display font-black text-brand-green mt-1">4.500.000 ₫</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-slate-100">
                      <button onClick={handlePayoutRequest} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs transition-colors shadow-md shadow-brand-blue/10">
                        <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span> Request Payout
                      </button>
                      <p className="text-[10px] text-text-muted text-center">Payouts processing might require up to 48 hours for local bank accounts.</p>
                    </div>
                  </div>

                  {/* Right graphs */}
                  <div className="lg:col-span-8 bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-display font-bold text-lg text-brand-blue">Earnings Breakdown</h3>
                        <p className="text-xs text-text-muted">Monthly earnings distributed between your courses.</p>
                      </div>
                    </div>

                    {/* Bar chart simulation */}
                    <div className="flex flex-col gap-5.5 py-2">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-brand-blue mb-1.5">
                          <span>Data Structures & Algorithms Course Sales</span>
                          <span>8.400.000 ₫ (55%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '55%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-brand-blue mb-1.5">
                          <span>Java Web Development Course Sales</span>
                          <span>4.100.000 ₫ (27%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '27%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-brand-blue mb-1.5">
                          <span>Python Automation Course Sales</span>
                          <span>2.730.000 ₫ (18%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problem Pass-rate Analytics and Student Reviews split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Problem Pass Rates */}
                  <div className="lg:col-span-6 bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow">
                    <h3 className="font-display font-bold text-lg text-brand-blue mb-5">Problem Solver Ratios</h3>

                    <div className="flex flex-col gap-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex flex-col">
                          <span className="text-xs font-bold text-brand-blue truncate">Two Sum</span>
                          <span className="text-[10px] text-text-muted mt-0.5">Easy • 320 attempts</span>
                        </div>
                        <div className="flex items-center gap-3 w-48 shrink-0">
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-green rounded-full" style={{ width: '82%' }}></div>
                          </div>
                          <span className="text-xs font-bold text-brand-blue w-8 text-right">82%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex flex-col">
                          <span className="text-xs font-bold text-brand-blue truncate">Reverse Linked List</span>
                          <span className="text-[10px] text-text-muted mt-0.5">Medium • 194 attempts</span>
                        </div>
                        <div className="flex items-center gap-3 w-48 shrink-0">
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }}></div>
                          </div>
                          <span className="text-xs font-bold text-brand-blue w-8 text-right">68%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex flex-col">
                          <span className="text-xs font-bold text-brand-blue truncate">Spring Hierarchy Solver</span>
                          <span className="text-[10px] text-text-muted mt-0.5">Hard • 85 attempts</span>
                        </div>
                        <div className="flex items-center gap-3 w-48 shrink-0">
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                          <span className="text-xs font-bold text-brand-blue w-8 text-right">35%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Reviews Feed */}
                  <div className="lg:col-span-6 bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow">
                    <h3 className="font-display font-bold text-lg text-brand-blue mb-4">Student Reviews</h3>

                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {/* Review 1 */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-brand-blue">Nguyen Van A</span>
                          <span className="text-amber-500 flex items-center text-xs">
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          "This Data Structures course has amazing visualizations! I finally understood graph traversal algorithms properly."
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[10px] text-text-muted font-medium">Course: DSA</span>
                          <button onClick={() => toggleReviewReplyInput('rev1')} className="text-[10px] font-bold text-primary hover:text-primary-hover">Reply</button>
                        </div>
                        
                        {/* Collapsible Reply Container */}
                        {activeReviewReplyInputs['rev1'] && (
                          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-200/50 animate-fade-in">
                            <input
                              type="text"
                              placeholder="Type your reply..."
                              value={reviewReplyTextState['rev1'] || ''}
                              onChange={(e) => setReviewReplyTextState(prev => ({ ...prev, rev1: e.target.value }))}
                              className="w-full text-xs border-slate-200 rounded-lg p-1.5 focus:ring-primary focus:border-primary"
                            />
                            <div className="flex justify-end gap-2">
                              <button onClick={() => toggleReviewReplyInput('rev1')} className="text-[10px] font-bold text-text-muted px-2 py-1">Cancel</button>
                              <button onClick={() => submitReviewReply('rev1')} className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-lg">Send</button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Review 2 */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-brand-blue">Tran Minh B</span>
                          <span className="text-amber-500 flex items-center text-xs">
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm icon-fill">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          "Spring Boot modules are useful, but please add more lessons regarding security configurations next time."
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[10px] text-text-muted font-medium">Course: Java Dev</span>
                          <button onClick={() => toggleReviewReplyInput('rev2')} className="text-[10px] font-bold text-primary hover:text-primary-hover">Reply</button>
                        </div>

                        {/* Collapsible Reply Container */}
                        {activeReviewReplyInputs['rev2'] && (
                          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-200/50 animate-fade-in">
                            <input
                              type="text"
                              placeholder="Type your reply..."
                              value={reviewReplyTextState['rev2'] || ''}
                              onChange={(e) => setReviewReplyTextState(prev => ({ ...prev, rev2: e.target.value }))}
                              className="w-full text-xs border-slate-200 rounded-lg p-1.5 focus:ring-primary focus:border-primary"
                            />
                            <div className="flex justify-end gap-2">
                              <button onClick={() => toggleReviewReplyInput('rev2')} className="text-[10px] font-bold text-text-muted px-2 py-1">Cancel</button>
                              <button onClick={() => submitReviewReply('rev2')} className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-lg">Send</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: WALLET ================= */}
            {activeTab === 'wallet' && (
              <div id="tab-wallet" className="tab-content flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-[#fce2d3] border border-primary/20 px-3 py-1 rounded-full text-primary font-bold text-xs uppercase tracking-wider mb-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-xs icon-fill">account_balance_wallet</span> My Wallet
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-brand-blue">Wallet & Financials</h2>
                    <p className="text-xs text-text-muted mt-0.5">Manage your payout methods, review historical transactions, and withdraw funds.</p>
                  </div>
                </div>

                {/* Wallet Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Main Balance */}
                  <div className="bg-gradient-to-br from-brand-blue to-brand-blue-light text-white rounded-2xl p-6 border border-brand-blue-light/50 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                    <div className="absolute -right-6 -bottom-6 opacity-10">
                      <span className="material-symbols-outlined text-[120px]">account_balance_wallet</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Available Balance</span>
                        <p className="text-3xl font-display font-black tracking-tight mt-1">10.730.000 ₫</p>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 rounded-lg text-white">Active</span>
                    </div>
                    <button onClick={handlePayoutRequest} className="w-full mt-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">local_atm</span> Withdraw Funds
                    </button>
                  </div>

                  {/* Pending Balance */}
                  <div className="bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow flex flex-col justify-between min-h-[160px]">
                    <div>
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Pending Payouts</span>
                      <p className="text-3xl font-display font-black text-brand-blue mt-1">4.500.000 ₫</p>
                      <p className="text-[10px] text-text-muted mt-1.5">Next settlement on June 01, 2026</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-green font-bold bg-brand-green-light px-3 py-1.5 rounded-xl border border-brand-green/10 mt-3">
                      <span className="w-2 h-2 rounded-full bg-brand-green inline-block animate-pulse"></span>
                      <span>Auto-transfer active</span>
                    </div>
                  </div>

                  {/* Payout Method */}
                  <div className="bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow flex flex-col justify-between min-h-[160px]">
                    <div>
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Payout Destination</span>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-brand-blue truncate">Vietcombank</p>
                          <p className="text-[10px] text-text-muted mt-0.5">•••• 8899</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => alert('Bank account routing update workflow is under maintenance.')} className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-blue font-bold text-xs transition-colors flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span> Update Method
                    </button>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="bg-surface rounded-2xl p-6 border border-slate-200/50 ambient-shadow">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-lg text-brand-blue">Transaction History</h3>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead>
                        <tr className="text-xs uppercase tracking-wider text-text-muted border-b border-slate-100 font-semibold bg-slate-50/50 rounded-lg">
                          <th className="py-3 px-4 rounded-l-lg">Transaction ID</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right rounded-r-lg font-bold text-primary">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-3.5 px-4 font-mono text-xs text-brand-blue font-bold">TXN-902348</td>
                          <td className="py-3.5 px-4 text-slate-500 font-medium">May 15, 2026</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">Withdrawal to Vietcombank</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 text-[10px] rounded-full bg-brand-green-light text-brand-green font-bold">Success</span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-red-600">-5.000.000 ₫</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-mono text-xs text-brand-blue font-bold">TXN-894723</td>
                          <td className="py-3.5 px-4 text-slate-500 font-medium">May 01, 2026</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">Monthly Settlement Payout</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 text-[10px] rounded-full bg-brand-green-light text-brand-green font-bold">Success</span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-red-600">-10.730.000 ₫</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-mono text-xs text-brand-blue font-bold">TXN-881245</td>
                          <td className="py-3.5 px-4 text-slate-500 font-medium">April 24, 2026</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">Course Sale: DSA Course</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-50 text-blue-600 font-bold">Processed</span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-brand-green">+499.000 ₫</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* ================= WORKSPACE PANEL: COURSE CURRICULUM & DETAILS (FLUSH-RIGHT) ================= */}
        {activeTab === 'edit-course' && (
          <div id="course-editor-workspace" className="flex-grow flex flex-col gap-6 w-full p-6 md:p-8 bg-[#f0f4f9] min-h-screen select-none">
            {/* Workspace Header */}
            <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between shadow-md border-b border-brand-blue-light/35 rounded-2xl shrink-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl font-bold">school</span>
                <div>
                  <h3 className="font-display font-black text-sm md:text-base leading-tight" id="workspace-course-title">{workspaceCourseTitle}</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instructor Course Management & Student Q/A Portal</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">Draft / Pending Approval</span>
                <button
                  type="button"
                  onClick={closeSyllabusEditor}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-red-600 text-white hover:text-white transition-all text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-sm">close</span> Exit Editor
                </button>
              </div>
            </div>

            {/* Workspace Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              
              {/* Left Column: Video Player and Tabs Content */}
              <div className="lg:col-span-9 flex flex-col gap-6 w-full">
                
                {/* Video Player Area */}
                <div className="w-full bg-[#0a0f1d] rounded-2xl overflow-hidden shadow-lg border border-gray-800 aspect-video relative flex items-center justify-center group" style={{ maxHeight: '520px' }}>
                  {/* Dark Overlay play area */}
                  <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
                  
                  {/* Overlay Play Button */}
                  <div id="editor-video-overlay" className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/45 gap-3 text-white transition-opacity duration-300">
                    <button className="bg-primary hover:bg-primary-hover hover:scale-105 text-white rounded-full p-5 shadow-2xl transition-all duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[48px] icon-fill">play_arrow</span>
                    </button>
                    <div className="text-center mt-2">
                      <span id="editor-video-name" className="text-xs font-bold block bg-black/60 backdrop-blur px-3.5 py-1.5 rounded-full border border-white/10 mt-1">
                        {activeLesson ? activeLesson.video : '01_env_setup.mp4'}
                      </span>
                      <span className="text-[10px] text-slate-300 mt-1 block">Video duration: 12:45 | Resolution: 1080p | Format: MP4</span>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center gap-4 z-20">
                    <span className="material-symbols-outlined text-white hover:text-primary cursor-pointer transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    <div className="flex-grow h-1 bg-white/20 rounded-full cursor-pointer relative group">
                      <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
                      <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 -translate-y-1/2 shadow opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: '30%' }}></div>
                    </div>
                    <span className="font-mono text-xs text-white/90">03:45 / 12:45</span>
                    <span className="material-symbols-outlined text-white hover:text-primary cursor-pointer transition-colors">volume_up</span>
                    <span className="material-symbols-outlined text-white hover:text-primary cursor-pointer transition-colors">fullscreen</span>
                  </div>

                  {/* Upload replace video floating trigger */}
                  <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="relative bg-brand-blue/90 hover:bg-brand-blue backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer shadow-md flex items-center gap-1.5 transition-all">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="video/mp4,video/*" onChange={handleReplaceVideo} />
                      <span className="material-symbols-outlined text-sm">video_library</span>
                      <span>Upload / Replace Video</span>
                    </div>
                  </div>
                </div>

                {/* Player Sub-tabs Navigation */}
                <div className="flex border-b border-gray-200 gap-6 overflow-x-auto hide-scrollbar pb-px">
                  <button
                    type="button"
                    onClick={() => setEditorTab('overview')}
                    className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap focus:outline-none ${
                      editorTab === 'overview' ? 'border-primary text-primary font-bold' : 'border-transparent text-text-muted hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span> Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('qa')}
                    className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap focus:outline-none ${
                      editorTab === 'qa' ? 'border-primary text-primary font-bold' : 'border-transparent text-text-muted hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">forum</span> Q&A Discussion
                    <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-red-100 text-red-600 font-bold border border-red-200/30">
                      {activeLesson?.questions.length || 0}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('code')}
                    className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap focus:outline-none ${
                      editorTab === 'code' ? 'border-primary text-primary font-bold' : 'border-transparent text-text-muted hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">code</span> Source Code
                  </button>
                </div>

                {/* Tabs Content */}
                <div className="bg-surface rounded-2xl border border-gray-200 p-6 min-h-[300px] shadow-sm">
                  
                  {/* Overview Tab */}
                  {editorTab === 'overview' && activeLesson && (
                    <div className="editor-tab-pane flex flex-col gap-3">
                      {!isOverviewEditing ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <h5 className="font-display font-bold text-lg text-brand-blue">Lesson Overview</h5>
                            <button
                              type="button"
                              onClick={openOverviewEdit}
                              className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover px-2.5 py-1.5 rounded-xl bg-primary-light/35 hover:bg-primary-light/50 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[14px]">edit</span> Edit Overview
                            </button>
                          </div>
                          <p className="text-sm text-text-muted leading-relaxed font-semibold bg-slate-50/50 p-4.5 rounded-xl border border-slate-200/30">
                            {activeLesson.overview}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Edit Lesson Overview</label>
                          <textarea
                            value={overviewTextarea}
                            onChange={(e) => setOverviewTextarea(e.target.value)}
                            className="text-xs border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-3 font-semibold text-brand-blue h-28 resize-none"
                          />
                          <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setIsOverviewEditing(false)} className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors">Cancel</button>
                            <button type="button" onClick={saveOverviewEdit} className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all">Save Changes</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Q/A Tab */}
                  {editorTab === 'qa' && activeLesson && (
                    <div className="editor-tab-pane flex flex-col gap-4">
                      <div className="flex justify-between items-center mb-1 pb-3 border-b border-gray-100">
                        <h5 className="font-display font-black text-base text-brand-blue">Student Q&A Forum</h5>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">Instructor Management Mode</span>
                      </div>
                      
                      {activeLesson.questions.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50/50 border border-dashed border-slate-200/80 rounded-xl flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-3xl text-slate-300">chat_bubble_outline</span>
                          <span className="text-xs font-bold text-slate-400">No questions asked yet for this lesson.</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4.5">
                          {activeLesson.questions.map((q) => (
                            <div key={q.id} className="bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40 flex flex-col gap-3 relative shadow-sm hover:shadow-md transition-all duration-300">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                  <img src={q.avatar} className="w-8 h-8 rounded-full border border-primary/30 object-cover shrink-0" alt="Student" />
                                  <div className="flex flex-col">
                                    <span className="text-xs font-extrabold text-brand-blue leading-tight">{q.author}</span>
                                    <span className="text-[10px] text-text-muted font-bold">{q.role} | {q.time}</span>
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 text-[8px] rounded bg-primary/10 text-primary font-bold border border-primary/20 uppercase tracking-wider">Student Question</span>
                              </div>

                              <p className="text-xs text-text-muted leading-relaxed font-semibold pl-10">{q.text}</p>

                              {/* Replies map */}
                              {q.replies && q.replies.length > 0 && (
                                <div className="mt-2 pl-9 flex flex-col gap-3 border-t border-slate-200/50 pt-3">
                                  {q.replies.map((reply, rIdx) => (
                                    <div key={rIdx} className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col gap-1.5 shadow-sm">
                                      <div className="flex items-center gap-2">
                                        <img src={reply.avatar} className="w-6 h-6 rounded-full border border-primary/20 object-cover" alt="Replier" />
                                        <div className="flex flex-col">
                                          <span className="text-[11px] font-extrabold text-brand-blue leading-tight">{reply.author}</span>
                                          <span className="text-[9px] text-text-muted leading-none">{reply.role} | {reply.time}</span>
                                        </div>
                                      </div>
                                      <p className="text-xs text-brand-blue pl-8 font-semibold leading-relaxed">{reply.text}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Instructor Answer workflow */}
                              <div className="pl-10 flex flex-col gap-2">
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => toggleQaReplyInput(q.id)}
                                    className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-[10px] font-bold flex items-center gap-1 shadow-sm hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
                                  >
                                    <span className="material-symbols-outlined text-xs">reply</span> 
                                    <span>Answer / Reply</span>
                                  </button>
                                </div>

                                {activeQaReplyInputs[q.id] && (
                                  <div className="flex flex-col gap-2 mt-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-inner animate-fade-in">
                                    <textarea
                                      placeholder={`Type your response to ${q.author}...`}
                                      value={qaReplyTextState[q.id] || ''}
                                      onChange={(e) => setQaReplyTextState(prev => ({ ...prev, [q.id]: e.target.value }))}
                                      className="text-xs border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-lg p-2.5 font-semibold text-brand-blue h-20 resize-none w-full"
                                    />
                                    <div className="flex gap-2 justify-end">
                                      <button onClick={() => toggleQaReplyInput(q.id)} className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 text-[9px] font-bold hover:bg-slate-50">Cancel</button>
                                      <button onClick={() => submitQaReply(q.id)} className="px-2.5 py-1 rounded bg-brand-green hover:bg-brand-green-hover text-white text-[9px] font-bold transition-all shadow-sm">Submit Reply</button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Source Code Tab */}
                  {editorTab === 'code' && activeLesson && (
                    <div className="editor-tab-pane flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <h5 className="font-display font-black text-base text-brand-blue">Source Code File</h5>
                        <span className="text-[10px] text-text-muted font-bold">Attached curriculum scripts</span>
                      </div>
                      <div id="editor-code-upload-zone" className="border border-dashed border-slate-200 bg-slate-50/50 rounded-xl p-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                            <span className="material-symbols-outlined text-3xl">code_blocks</span>
                          </div>
                          <div className="min-w-0">
                            <span id="editor-code-file-name" className="text-sm font-bold text-brand-blue truncate block">
                              {activeLesson.code === 'None' ? 'No source code attached' : activeLesson.code}
                            </span>
                            <span id="editor-code-file-size" className="text-[11px] text-text-muted mt-0.5 block">
                              {activeLesson.code === 'None' ? 'Click replace to upload code archive' : '1.2 MB (ZIP Archive)'}
                            </span>
                          </div>
                        </div>
                        <div className="relative bg-white border border-slate-200 hover:border-primary px-4 py-2 rounded-xl text-xs font-bold text-brand-blue cursor-pointer transition-all shrink-0 hover:scale-[1.01] active:scale-[0.99] shadow-sm">
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleReplaceCode} />
                          <span>Replace File</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Chapters & Lessons Accordion Sidebar */}
              <div className="lg:col-span-3 bg-surface rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden w-full shrink-0 sticky top-6">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div>
                    <h4 className="font-display font-black text-xs md:text-sm text-brand-blue uppercase tracking-wider">Course Syllabus</h4>
                    <span className="text-[10px] text-text-muted font-bold">Chapters & Lessons Outline</span>
                  </div>
                  <span className="px-2.5 py-0.5 text-[9px] rounded-full bg-primary-light text-primary border border-primary/20 font-bold uppercase tracking-wider shadow-sm">Builder</span>
                </div>
                
                {/* Curriculum outline mapping */}
                <div className="flex flex-col gap-4 p-4" id="editor-curriculum-chapters">
                  {curriculumData.chapters.map((chapter, chIdx) => (
                    <div key={chIdx} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                      {/* Chapter Title Row */}
                      <div className="px-4 py-3 bg-slate-50 flex items-start justify-between border-b border-gray-200 gap-3">
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <span className="material-symbols-outlined text-text-muted text-[18px] mt-0.5 shrink-0">toc</span>
                          
                          {editingChapterIdx !== chIdx ? (
                            <div className="flex items-start min-w-0 flex-1">
                              <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Chapter {chIdx + 1}</span>
                                <span className="title-text text-xs font-bold text-text-main break-words whitespace-normal mt-0.5">{chapter.title}</span>
                              </div>
                              <button
                                onClick={() => { setEditingChapterIdx(chIdx); setChapterRenameText(chapter.title); }}
                                className="p-1 text-slate-400 hover:text-primary transition-colors inline-edit-btn shrink-0 ml-1"
                                title="Rename Chapter"
                              >
                                <span className="material-symbols-outlined text-[14px]">edit</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={chapterRenameText}
                                onChange={(e) => setChapterRenameText(e.target.value)}
                                className="text-xs border-slate-350 focus:border-primary focus:ring-primary focus:ring-1 rounded-lg p-0.5 font-semibold text-brand-blue max-w-[120px]"
                              />
                              <button
                                onClick={() => saveChapterTitleInline(chIdx)}
                                className="p-0.5 rounded bg-brand-green text-white flex items-center justify-center shrink-0"
                              >
                                <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-auto mt-0.5">
                          <button onClick={() => handleAddLessonWorkspace(chIdx)} className="p-1 rounded bg-slate-100 hover:bg-primary-light/50 text-slate-500 hover:text-primary transition-colors flex items-center justify-center" title="Add Lesson">
                            <span className="material-symbols-outlined text-xs font-bold">add</span>
                          </button>
                          <button onClick={() => handleDeleteChapterWorkspace(chIdx)} className="p-1 rounded bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors flex items-center justify-center" title="Delete Chapter">
                            <span className="material-symbols-outlined text-xs">delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Lessons List Container */}
                      <div className="flex flex-col divide-y divide-gray-150 bg-slate-50">
                        {chapter.lessons.map((lesson, lesIdx) => {
                          const isSelected = selectedLessonIndices.chIdx === chIdx && selectedLessonIndices.lesIdx === lesIdx;
                          const isLessonEditing = editingLessonIndex?.chIdx === chIdx && editingLessonIndex?.lesIdx === lesIdx;

                          return (
                            <div
                              key={lesIdx}
                              onClick={() => setSelectedLessonIndices({ chIdx, lesIdx })}
                              className={`editor-lesson-item flex items-start gap-2.5 px-4 py-2.5 hover:bg-slate-100 cursor-pointer border-l-2 transition-colors group text-xs text-text-main font-medium ${
                                isSelected ? 'bg-primary-light/30 border-primary text-primary font-bold' : 'border-transparent'
                              }`}
                            >
                              <span className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${isSelected ? 'text-primary icon-fill animate-pulse' : 'text-text-muted'}`}>
                                {isSelected ? 'play_arrow' : 'radio_button_unchecked'}
                              </span>

                              {(!isLessonEditing) ? (
                                <div className="flex items-center min-w-0 flex-1">
                                  <span className="title-text break-words whitespace-normal flex-1 mt-0.5">{lesson.title}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setEditingLessonIndex({ chIdx, lesIdx }); setLessonRenameText(lesson.title); }}
                                    className="p-0.5 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-all inline-edit-btn flex items-center justify-center shrink-0 ml-1"
                                    title="Rename Lesson"
                                  >
                                    <span className="material-symbols-outlined text-[13px]">edit</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 flex-1">
                                  <input
                                    type="text"
                                    value={lessonRenameText}
                                    onChange={(e) => setLessonRenameText(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs border-slate-350 focus:border-primary focus:ring-primary focus:ring-1 rounded-lg p-0.5 font-semibold text-brand-blue max-w-[120px]"
                                  />
                                  <button
                                    onClick={(e) => { e.stopPropagation(); saveLessonTitleInline(chIdx, lesIdx); }}
                                    className="p-0.5 rounded bg-brand-green text-white flex items-center justify-center shrink-0"
                                  >
                                    <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                                  </button>
                                </div>
                              )}

                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteLessonWorkspace(chIdx, lesIdx); }}
                                className="p-0.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded shrink-0 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shrink-0 ml-1"
                                title="Delete Lesson"
                              >
                                <span className="material-symbols-outlined text-[13px]">close</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/40 shrink-0">
                  <button type="button" onClick={handleAddChapterWorkspace} className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover py-3 px-4 border-2 border-dashed border-gray-200 hover:border-primary bg-white rounded-xl transition-all w-full shadow-sm hover:scale-[1.01] active:scale-[0.99]">
                    <span className="material-symbols-outlined text-base font-bold">create_new_folder</span> Add New Chapter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: CREATE COURSE ================= */}
      {isCreateCourseOpen && (
        <div id="modal-create-course" className="fixed inset-0 bg-brand-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-4xl w-full overflow-hidden border border-slate-200/50 ambient-shadow flex flex-col transition-all duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">library_add</span>
                <h3 className="font-display font-extrabold text-base text-brand-blue">Create New Learning Course</h3>
              </div>
              <button type="button" onClick={() => setIsCreateCourseOpen(false)} className="p-1.5 rounded-xl text-text-muted hover:bg-slate-200/80 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleCreateCourseSubmit} className="flex flex-col">
              <div className="p-6 md:p-8 flex flex-col gap-6 max-h-[72vh] overflow-y-auto bg-slate-50/30">
                
                {/* PANEL 1: COURSE BASICS */}
                <div className="bg-surface rounded-2xl border border-slate-200/60 p-6 flex flex-col gap-5 shadow-sm">
                  <h4 className="font-display font-black text-sm text-brand-blue border-b border-slate-100 pb-2.5 flex items-center gap-2 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-primary text-[20px]">info</span> Course Basics
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Course Title */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Course Title</label>
                      <input
                        type="text"
                        value={courseTitleInput}
                        onChange={(e) => setCourseTitleInput(e.target.value)}
                        placeholder="e.g. Mastering Full-Stack React & Node.js"
                        className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 font-medium text-brand-blue"
                      />
                    </div>
                    
                    {/* Course Topic */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Course Topic</label>
                      <select value={courseTopicInput} onChange={(e) => setCourseTopicInput(e.target.value)} className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 cursor-pointer font-medium text-brand-blue">
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Algorithms & Data Structures">Algorithms & Data Structures</option>
                        <option value="Data Science & AI">Data Science & AI</option>
                        <option value="Database Systems">Database Systems</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Software Engineering">Software Engineering</option>
                      </select>
                    </div>

                    {/* Programming Language */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Programming Language</label>
                      <select value={courseLanguageInput} onChange={(e) => setCourseLanguageInput(e.target.value)} className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 cursor-pointer font-medium text-brand-blue">
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="Go">Go</option>
                        <option value="PHP">PHP</option>
                        <option value="Swift">Swift</option>
                        <option value="HTML/CSS">HTML/CSS</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Difficulty Level */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Difficulty Level</label>
                      <select value={courseLevelInput} onChange={(e) => setCourseLevelInput(e.target.value)} className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 cursor-pointer font-medium text-brand-blue">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    {/* Course Price */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Price (₫)</label>
                      <input
                        type="number"
                        value={coursePriceInput}
                        onChange={(e) => setCoursePriceInput(e.target.value)}
                        placeholder="e.g. 499000"
                        className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 font-medium text-brand-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* PANEL 2: MEDIA & DESCRIPTION */}
                <div className="bg-surface rounded-2xl border border-slate-200/60 p-6 flex flex-col gap-5 shadow-sm">
                  <h4 className="font-display font-black text-sm text-brand-blue border-b border-slate-100 pb-2.5 flex items-center gap-2 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-primary text-[20px]">description</span> Media & Descriptions
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Drag & Drop Thumbnail Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Course Thumbnail</label>
                      <div className="relative border-2 border-dashed border-slate-200 hover:border-primary rounded-2xl p-5 flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-primary-light/5 transition-all group cursor-pointer h-[155px]">
                        <input type="file" id="course-thumbnail" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleThumbnailUpload} />
                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">image</span>
                        <div className="text-center">
                          <span className="text-sm font-bold text-brand-blue group-hover:text-primary transition-colors block">Upload Thumbnail Image</span>
                          <span className="text-[11px] text-text-muted mt-1 block">PNG, JPG, WebP up to 5MB</span>
                        </div>
                        
                        {/* Image Thumbnail Preview Element */}
                        {thumbnailFile && (
                          <div id="thumbnail-preview-container" className="absolute inset-0 bg-white rounded-2xl p-2 flex items-center justify-center gap-3">
                            <img src={thumbnailFile.url} className="h-full max-w-[120px] object-cover rounded-xl border border-slate-200" alt="Preview" />
                            <div className="flex flex-col min-w-0 text-left">
                              <span className="text-xs font-bold text-brand-blue truncate max-w-[150px]">{thumbnailFile.name}</span>
                              <span className="text-[10px] text-text-muted mt-0.5">{thumbnailFile.size}</span>
                            </div>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setThumbnailFile(null); }} className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors ml-auto flex items-center justify-center">
                              <span className="material-symbols-outlined text-base">close</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Short Description</label>
                      <textarea
                        value={courseDescInput}
                        onChange={(e) => setCourseDescInput(e.target.value)}
                        className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 font-medium text-brand-blue h-[155px] resize-none"
                        placeholder="Build scalable, production-ready web applications from scratch..."
                      />
                    </div>

                    {/* Long Description */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Course Description (Long Description)</label>
                      <textarea
                        value={courseLongDescInput}
                        onChange={(e) => setCourseLongDescInput(e.target.value)}
                        rows={4}
                        placeholder="The course is a transformative journey designed to take you from zero to a production-ready developer..."
                        className="text-sm border-slate-200 focus:border-primary focus:ring-primary focus:ring-1 rounded-xl p-2.5 font-medium text-brand-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* PANEL 3: COURSE SPECIFICATIONS */}
                <div className="bg-surface rounded-2xl border border-slate-200/60 p-6 flex flex-col gap-6 shadow-sm">
                  <h4 className="font-display font-black text-sm text-brand-blue border-b border-slate-100 pb-2.5 flex items-center gap-2 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span> Course Specifications
                  </h4>

                  <div className="flex flex-col gap-7">
                    {/* 1. What You'll Learn */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">What you'll learn</label>
                        <span className="text-[10px] text-text-muted font-bold">Each box is 1 key point</span>
                      </div>
                      <div id="container-course-learn" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {learnPoints.map((val, idx) => (
                          <div key={idx} className="group relative bg-surface border border-slate-200/80 hover:border-primary rounded-xl p-3.5 flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-md transition-all">
                            <textarea
                              value={val}
                              onChange={(e) => {
                                const arr = [...learnPoints];
                                arr[idx] = e.target.value;
                                setLearnPoints(arr);
                              }}
                              className="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium p-0 resize-none text-brand-blue placeholder-slate-400 h-full"
                              placeholder="e.g. Architect scalable MERN applications"
                            />
                            <div className="flex justify-end mt-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setLearnPoints(prev => prev.filter((_, i) => i !== idx || prev.length === 1))}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center"
                                title="Delete Point"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setLearnPoints(prev => [...prev, ''])} className="border-2 border-dashed border-slate-200/80 hover:border-primary hover:bg-primary-light/10 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[110px] text-slate-400 hover:text-primary transition-all gap-1.5 bg-surface/50 group">
                          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:scale-110">add</span>
                          <span className="text-xs font-extrabold">Add Point</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. Course Highlights */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Course Highlights</label>
                        <span className="text-[10px] text-text-muted font-bold">Key highlights</span>
                      </div>
                      <div id="container-course-highlights" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {highlightPoints.map((val, idx) => (
                          <div key={idx} className="group relative bg-surface border border-slate-200/80 hover:border-primary rounded-xl p-3.5 flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-md transition-all">
                            <textarea
                              value={val}
                              onChange={(e) => {
                                const arr = [...highlightPoints];
                                arr[idx] = e.target.value;
                                setHighlightPoints(arr);
                              }}
                              className="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium p-0 resize-none text-brand-blue placeholder-slate-400 h-full"
                              placeholder="e.g. 15+ Real-world Projects"
                            />
                            <div className="flex justify-end mt-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setHighlightPoints(prev => prev.filter((_, i) => i !== idx || prev.length === 1))}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center"
                                title="Delete Highlight"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setHighlightPoints(prev => [...prev, ''])} className="border-2 border-dashed border-slate-200/80 hover:border-primary hover:bg-primary-light/10 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[110px] text-slate-400 hover:text-primary transition-all gap-1.5 bg-surface/50 group">
                          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:scale-110">add</span>
                          <span className="text-xs font-extrabold">Add Highlight</span>
                        </button>
                      </div>
                    </div>

                    {/* 3. Technologies & Tools */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Technologies & Tools</label>
                        <span className="text-[10px] text-text-muted font-bold">Tech stack used</span>
                      </div>
                      <div id="container-course-tech" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {techPoints.map((val, idx) => (
                          <div key={idx} className="group relative bg-surface border border-slate-200/80 hover:border-primary rounded-xl p-3.5 flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-md transition-all">
                            <textarea
                              value={val}
                              onChange={(e) => {
                                const arr = [...techPoints];
                                arr[idx] = e.target.value;
                                setTechPoints(arr);
                              }}
                              className="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium p-0 resize-none text-brand-blue placeholder-slate-400 h-full"
                              placeholder="e.g. React"
                            />
                            <div className="flex justify-end mt-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setTechPoints(prev => prev.filter((_, i) => i !== idx || prev.length === 1))}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center"
                                title="Delete Tech"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setTechPoints(prev => [...prev, ''])} className="border-2 border-dashed border-slate-200/80 hover:border-primary hover:bg-primary-light/10 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[110px] text-slate-400 hover:text-primary transition-all gap-1.5 bg-surface/50 group">
                          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:scale-110">add</span>
                          <span className="text-xs font-extrabold">Add Tech</span>
                        </button>
                      </div>
                    </div>

                    {/* 4. Prerequisites */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Prerequisites</label>
                        <span className="text-[10px] text-text-muted font-bold">Requirements</span>
                      </div>
                      <div id="container-course-prereqs" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {prereqPoints.map((val, idx) => (
                          <div key={idx} className="group relative bg-surface border border-slate-200/80 hover:border-primary rounded-xl p-3.5 flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-md transition-all">
                            <textarea
                              value={val}
                              onChange={(e) => {
                                const arr = [...prereqPoints];
                                arr[idx] = e.target.value;
                                setPrereqPoints(arr);
                              }}
                              className="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium p-0 resize-none text-brand-blue placeholder-slate-400 h-full"
                              placeholder="e.g. Basic JavaScript knowledge"
                            />
                            <div className="flex justify-end mt-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setPrereqPoints(prev => prev.filter((_, i) => i !== idx || prev.length === 1))}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center"
                                title="Delete Prerequisite"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setPrereqPoints(prev => [...prev, ''])} className="border-2 border-dashed border-slate-200/80 hover:border-primary hover:bg-primary-light/10 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[110px] text-slate-400 hover:text-primary transition-all gap-1.5 bg-surface/50 group">
                          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:scale-110">add</span>
                          <span className="text-xs font-extrabold">Add Prereq</span>
                        </button>
                      </div>
                    </div>

                    {/* 5. Target Audience */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Target Audience</label>
                        <span className="text-[10px] text-text-muted font-bold">Intended coders</span>
                      </div>
                      <div id="container-course-audience" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {audiencePoints.map((val, idx) => (
                          <div key={idx} className="group relative bg-surface border border-slate-200/80 hover:border-primary rounded-xl p-3.5 flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-md transition-all">
                            <textarea
                              value={val}
                              onChange={(e) => {
                                const arr = [...audiencePoints];
                                arr[idx] = e.target.value;
                                setAudiencePoints(arr);
                              }}
                              className="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium p-0 resize-none text-brand-blue placeholder-slate-400 h-full"
                              placeholder="e.g. Aspiring Full-Stack Developers"
                            />
                            <div className="flex justify-end mt-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setAudiencePoints(prev => prev.filter((_, i) => i !== idx || prev.length === 1))}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center"
                                title="Delete Audience"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setAudiencePoints(prev => [...prev, ''])} className="border-2 border-dashed border-slate-200/80 hover:border-primary hover:bg-primary-light/10 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[110px] text-slate-400 hover:text-primary transition-all gap-1.5 bg-surface/50 group">
                          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:scale-110">add</span>
                          <span className="text-xs font-extrabold">Add Audience</span>
                        </button>
                      </div>
                    </div>

                    {/* 6. Completion Benefits */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/40">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Completion Benefits</label>
                        <span className="text-[10px] text-text-muted font-bold">What students get</span>
                      </div>
                      <div id="container-course-benefits" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {benefitPoints.map((val, idx) => (
                          <div key={idx} className="group relative bg-surface border border-slate-200/80 hover:border-primary rounded-xl p-3.5 flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-md transition-all">
                            <textarea
                              value={val}
                              onChange={(e) => {
                                const arr = [...benefitPoints];
                                arr[idx] = e.target.value;
                                setBenefitPoints(arr);
                              }}
                              className="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium p-0 resize-none text-brand-blue placeholder-slate-400 h-full"
                              placeholder="e.g. Portfolio Projects"
                            />
                            <div className="flex justify-end mt-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setBenefitPoints(prev => prev.filter((_, i) => i !== idx || prev.length === 1))}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center"
                                title="Delete Benefit"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setBenefitPoints(prev => [...prev, ''])} className="border-2 border-dashed border-slate-200/80 hover:border-primary hover:bg-primary-light/10 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[110px] text-slate-400 hover:text-primary transition-all gap-1.5 bg-surface/50 group">
                          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:scale-110">add</span>
                          <span className="text-xs font-extrabold">Add Benefit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit buttons */}
              <div className="flex items-center justify-end gap-3.5 p-6 border-t border-slate-100 bg-slate-50 shrink-0">
                <button type="button" onClick={() => setIsCreateCourseOpen(false)} className="px-8 py-3.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-extrabold hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="button" onClick={resetSimpleCourseForm} className="px-5 py-3.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 text-sm font-bold transition-colors">Reset Form</button>
                <button type="submit" className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-extrabold transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">Submit Course</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};
