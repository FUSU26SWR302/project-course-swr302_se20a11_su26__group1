<div align="center">
  <img src="https://img.shields.io/badge/Course-SWR302-blue?style=for-the-badge&logo=fpt" alt="Course" />
  <img src="https://img.shields.io/badge/Model-Hybrid%20Platform-success?style=for-the-badge" alt="Model" />
  <img src="https://img.shields.io/badge/Framework-Spring%20Boot-6DB33F?style=for-the-badge&logo=Spring" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Frontend-ReactJS-61DAFB?style=for-the-badge&logo=React" alt="React" />
  <br /><br />
  
  <h1>🚀 CodeElite</h1>
  <h3>Integrated E-Learning Marketplace & Competitive Programming Platform</h3>
  
  <p>
    <b>Đồ án môn học:</b> Software Requirements (SWR302)<br/>
    <b>Mô hình hệ thống:</b> Hybrid Platform (Udemy's Marketplace Model + LeetCode/Codeforces's Online Judge Model)
  </p>
</div>

---

<details open>
  <summary><b>📑 Mục lục (Table of Contents)</b></summary>
  <ol>
    <li><a href="#-1-giới-thiệu-dự-án-introduction">Giới thiệu dự án (Introduction)</a></li>
    <li><a href="#-2-hàm-lượng-nghiên-cứu-rbl---research-based-learning">Hàm lượng nghiên cứu (RBL - Research-Based Learning)</a></li>
    <li><a href="#-3-mô-hình-tác-nhân--phân-quyền-actors--roles">Mô hình Tác nhân & Phân quyền (Actors & Roles)</a></li>
    <li><a href="#-4-tính-năng-cốt-lõi-core-features">Tính năng cốt lõi (Core Features)</a></li>
    <li><a href="#-5-công-nghệ-sử-dụng-tech-stack">Công nghệ sử dụng (Tech Stack)</a></li>
    <li><a href="#-6-kiến-trúc-hệ-thống-system-architecture">Kiến trúc hệ thống (System Architecture)</a></li>
    <li><a href="#-7-hướng-dẫn-cài-đặt--khởi-chạy-setup-instructions">Hướng dẫn Cài đặt & Khởi chạy (Setup Instructions)</a></li>
    <li><a href="#-8-tài-liệu-đặc-tả-đính-kèm-documentation">Tài liệu Đặc tả đính kèm (Documentation)</a></li>
    <li><a href="#-9-thành-viên-nhóm-team-members">Thành viên nhóm (Team Members)</a></li>
    <li><a href="#-10-quản-lý-dự-án-jira-project-management">Quản lý dự án (Jira Project Management)</a></li>
  </ol>
</details>

---

## 🎯 1. Giới thiệu dự án (Introduction)

**CodeElite** là một nền tảng ứng dụng Web hoạt động theo mô hình lai (Hybrid) độc đáo. Hệ thống giải quyết trọn vẹn hai bài toán lớn trong ngành EdTech hiện nay:

1. 🛒 **Sàn thương mại điện tử khóa học (Marketplace):** Cho phép các Giảng viên tự do (Instructors) đăng ký, tạo khóa học, định giá và nhận doanh thu.
2. 💻 **Nền tảng thi đấu & luyện tập thuật toán (Online Judge):** Cung cấp Web-based IDE, tự động biên dịch, chấm điểm mã nguồn (C++, Java, Python...) và cập nhật bảng xếp hạng thời gian thực. Bài tập thuật toán được tích hợp linh hoạt: *Cuối mỗi bài học, trong danh sách luyện tập chung, hoặc trong các Kỳ thi (Contests) có tính giờ.*

---

## 🔬 2. Hàm lượng nghiên cứu (RBL - Research-Based Learning)

### 🏗️ 2.1. Nghiên cứu Kiến trúc Hệ thống (System Architecture)

| Nội dung nghiên cứu | Ứng dụng trong dự án |
|:---|:---|
| **Kiến trúc Decoupled Client-Server** | Tách biệt hoàn toàn Frontend (ReactJS) và Backend (Spring Boot). Backend đóng vai trò là một RESTful API Server thuần túy, đảm bảo khả năng mở rộng (Scale-out) độc lập khi lượng học viên tăng đột biến. |
| **Kiến trúc Hướng sự kiện & Bất đồng bộ (Event-Driven & Async Architecture)** | Thiết kế luồng xử lý riêng biệt cho hệ thống chấm code. Khi có hàng trăm User cùng submit code, Server không chờ kết quả (Blocking) mà lập tức giải phóng Thread. Kết quả chấm được luân chuyển ngầm qua cơ chế Webhook, đảm bảo Backend chính không bao giờ bị nghẽn (Bottleneck). |
| **Kiến trúc Thời gian thực (Real-time Communication)** | Nghiên cứu và triển khai giao thức WebSocket (STOMP) để thiết lập luồng giao tiếp song công (Full-duplex) giữa Server và Client. Giúp đẩy kết quả chấm bài của từng Testcase (AC, WA, TLE...) ngay lập tức về màn hình học viên theo thời gian thực. |

### 🧠 2.2 Thuật toán & Logic nghiệp vụ

| Nội dung nghiên cứu | Ứng dụng trong dự án |
|:---|:---|
| **Race Condition Prevention** | Xử lý đa luồng khi nhiều webhook callback về đồng thời bằng Redis Atomic Counter (`INCR`) và `setIfAbsent` (tương đương distributed lock). |
| **Short-circuit Evaluation (Contest Mode)** | Thuật toán chốt kết quả sớm: khi phát hiện testcase sai đầu tiên trong contest mode → dừng ngay, không chờ chấm hết, tối ưu thời gian phản hồi. |
| **Language-aware Time Limit** | Tính toán time limit động theo ngôn ngữ lập trình (C++ ×1.0, Java ×2.0+1s, Python ×3.0) để đảm bảo công bằng giữa các ngôn ngữ. |
| **Progress Aggregation** | Tính phần trăm tiến độ khóa học qua 2 bảng cache (LessonProgress + CompletedLessonsCount), giảm chi phí tính toán tại runtime. |

### 🔧 2.3 Công nghệ & Tích hợp hệ thống

| Nội dung nghiên cứu | Ứng dụng trong dự án |
|:---|:---|
| **Judge0 Integration** | Nghiên cứu và tích hợp Judge0 CE — hệ thống sandbox chấm code hỗ trợ 60+ ngôn ngữ lập trình, sử dụng Batch Submission API + Webhook Callback. |
| **WebSocket (STOMP)** | Nghiên cứu giao thức STOMP over WebSocket để đẩy kết quả chấm bài real-time về client, thay vì client phải liên tục polling server. |
| **OAuth2 Resource Server + JWT** | Nghiên cứu chuẩn OAuth2 Bearer Token, triển khai JWT với HMAC-SHA512. Token chứa claims tùy chỉnh (userId, scope, type) và hỗ trợ đọc từ Cookie HttpOnly. |
| **Redis** | Sử dụng Redis cho: (1) Atomic counter đếm testcase đã chấm xong, (2) Short-circuit flag để chốt kết quả sớm khi gặp lỗi trong contest mode. |
| **WebClient (Reactive HTTP)** | Cấu hình WebClient với 3 lớp timeout bảo vệ (Connection, Response, Read/Write) để giao tiếp ổn định với Judge0 API. |

---

## 👥 3. Mô hình Tác nhân & Phân quyền (Actors & Roles)

Hệ thống được thiết kế đa đối tượng, bảo mật bằng JWT và RBAC/ABAC phân tầng:

*   👤 **Guest (Khách vãng lai):** Duyệt danh mục, xem video demo và tham khảo đề bài thuật toán (không được Submit).
*   🎓 **Customer (Học viên):** Nạp tiền/thanh toán mua khóa học (Enroll), làm Quiz, nộp bài code (Submit OJ), tham gia thi đấu (Contest) và theo dõi Live Leaderboard.
*   👨‍🏫 **Instructor (Giảng viên tự do):** Gửi yêu cầu kiểm duyệt lên Admin. Khi được duyệt, có quyền tải lên video, tạo Quiz, cấu hình bài tập OJ (Testcases), tự định giá khóa học và nhận doanh thu.
*   🛡️ **Admin (Quản trị viên):** Quản lý dòng tiền, phê duyệt khóa học/giảng viên, quản lý ngân hàng đề thi chung toàn cầu và giải quyết khiếu nại.
*   🤖 **Judge0 API (System Actor):** Trọng tài máy chủ tự động biên dịch, chạy thử nghiệm trên các ràng buộc về thời gian/bộ nhớ và trả về kết quả cho máy chủ chính.

---

## 🧩 4. Tính năng cốt lõi (Core Features)

### 🛒 Phân hệ E-Learning Marketplace
*   **Đăng ký & Bán khóa học:** Instructor tự quản lý nội dung (Video, PDF, Theory). Hệ thống chia sẻ doanh thu.
*   **Learning Progress:** Cập nhật tiến độ học tập (%) theo thời gian thực dựa trên các Lesson hoàn thành.
*   **Interactive Q/A:** Hỗ trợ bình luận/thảo luận bài học trực tiếp dưới mỗi Lesson.

### ⚡ Phân hệ Trình chấm tự động (Online Judge)
*   **Ngân hàng bài tập thuật toán (LeetCode-style Problem Bank):** Cung cấp danh sách các bài tập lập trình độc lập bên ngoài khóa học, phân loại rõ ràng theo mức độ khó (Dễ, Trung bình, Khó) và theo chủ đề cấu trúc dữ liệu & giải thuật (Mảng, Chuỗi, Quy hoạch động, Cây đồ thị...). Bộ lọc thông minh và tính năng tìm kiếm nhanh giúp học viên dễ dàng lựa chọn bài tập phù hợp.
*   **Đa ngôn ngữ & Chấm điểm chuẩn xác:** Biên dịch và chấm code tự động cho các ngôn ngữ phổ biến (C, C++, Java, Python). Đánh giá chi tiết các trạng thái: `AC (Accepted)`, `WA (Wrong Answer)`, `TLE (Time Limit Exceeded)`, `MLE (Memory Limit Exceeded)`.
*   **Lịch sử nộp bài & Thống kê hiệu năng:** Lưu trữ lịch sử nộp bài chi tiết, thống kê thời gian chạy (Runtime) và dung lượng bộ nhớ tiêu hao (Memory) để học viên tối ưu hóa giải thuật.
*   **Quản lý Testcase & Ràng buộc:** Giảng viên (Instructor) dễ dàng cấu hình bộ Test Case (Input/Output chuẩn), thiết lập giới hạn tài nguyên (Thời gian chạy, dung lượng bộ nhớ) riêng cho từng ngôn ngữ.

### 🏆 Phân hệ Thi đấu (Contest Room)
*   **Live Leaderboard:** Bảng xếp hạng cập nhật thời gian thực qua WebSocket. Xếp hạng theo số lượng bài giải quyết và Penalty Time.
*   **Time-restricted:** Cấu hình thời gian bắt đầu, kết thúc; tự động khóa nộp bài khi hết giờ.

---

## 🛠️ 5. Công nghệ sử dụng (Tech Stack)

### 🎨 Frontend Core
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" alt="React Query" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
</p>

| Công nghệ | Phiên bản | Mục đích |
|:---|:---:|:---|
| **React** | `18.x` | Thư viện xây dựng giao diện người dùng (UI) chính |
| **TypeScript** | `5.x` | Ngôn ngữ phát triển (đảm bảo an toàn kiểu dữ liệu - Type-safe) |
| **Tailwind CSS** | `3.x` | Utility-first CSS framework giúp thiết kế UI nhanh chóng và hiện đại |
| **Framer Motion** | `11.x` | Thư viện tạo các hiệu ứng animation và chuyển động mượt mà |
| **Axios & React Query** | `Latest` | Gọi API và quản lý trạng thái dữ liệu (Server state) |
| **Vite** | `5.x` | Build tool và Dev server tốc độ cao cho Frontend |

### ⚙️ Backend Core
<p>
  <img src="https://img.shields.io/badge/Java_21-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white" alt="Spring Security" />
</p>

| Công nghệ | Phiên bản | Mục đích |
|:---|:---:|:---|
| **Java** | `21` (LTS) | Ngôn ngữ lập trình chính |
| **Spring Boot** | `3.5.7` | Framework cốt lõi |
| **Spring Security** | `6.x` | Bảo mật, xác thực người dùng |
| **Spring Data JPA** | `3.x` | ORM, truy vấn cơ sở dữ liệu |
| **Spring WebFlux** | `6.x` | WebClient (HTTP client reactive) |
| **Spring WebSocket** | `6.x` | Giao tiếp thời gian thực |
| **Maven (mvnw)** | `3.9.x` | Quản lý dependency, build project |

### 🗄️ Cơ sở dữ liệu & Cache
<p>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis" />
</p>

| Công nghệ | Phiên bản | Mục đích |
|:---|:---:|:---|
| **PostgreSQL** | `18` | Cơ sở dữ liệu quan hệ lưu trữ dữ liệu chính |
| **Redis** | `Latest` | In-memory Cache, atomic counter, token blacklist |

### 🌐 Hệ thống bên ngoài
<p>
  <img src="https://img.shields.io/badge/Judge0_CE-000000?style=flat-square&logo=linux&logoColor=white" alt="Judge0" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

| Hệ thống | Mục đích |
|:---|:---|
| **Judge0 CE** | Sandbox chấm code tự động (Triển khai qua Docker-based) |

---

## 🏗️ 6. Kiến trúc hệ thống (System Architecture)

### Kiến trúc tổng quan

```text
┌──────────────────────────────┐      REST API      ┌──────────────────────────────────┐    Batch API   ┌──────────────┐
│       Frontend Client        │ ◄────────────────► │       Spring Boot Backend        │ ─────────────► │  Judge0 CE   │
│     (React + TypeScript)     │     WebSocket      │                                  │ ◄───────────── │  (Sandbox)   │
│ ┌──────────────────────────┐ │ ◄────────────────  │ ┌──────────┐    ┌──────────────┐ │     Webhook    └──────────────┘
│ │ UI Components & Routing  │ │                    │ │Controller│ ──►│Business Logic│ │
│ │ (Tailwind, Framer, Vite) │ │                    │ └──────────┘    └──────┬───────┘ │
│ └────────────┬─────────────┘ │                    │                 ┌──────┴───────┐ │
│ ┌────────────┴─────────────┐ │                    │                 │ Data Access  │ │
│ │ State & API (React Query)│ │                    │                 └──────┬───────┘ │
│ └──────────────────────────┘ │                    └────────────────────────┼─────────┘
└──────────────────────────────┘                                             │
                                                             ┌───────────────▼───────────────┐
                                                             │  PostgreSQL   │     Redis     │
                                                             └───────────────┴───────────────┘
```

---

## 🚀 7. Hướng dẫn Cài đặt & Khởi chạy (Setup Instructions)

### Yêu cầu hệ thống (Prerequisites)
*   ☕ **Java JDK 21** (hoặc mới hơn)
*   🟩 **Node.js 18+** & **npm**
*   🐳 **Docker & Docker Compose** *(khuyên dùng để triển khai các dịch vụ bổ trợ một cách nhanh chóng)*

### Bước 1: Khởi chạy các dịch vụ bổ trợ bằng Docker Compose
Dự án đi kèm file cấu hình Docker Compose để thiết lập tự động PostgreSQL, Redis và Sandbox chấm code Judge0:
```bash
docker-compose up -d
```
> [!NOTE]  
> Sau khi khởi chạy thành công, **PostgreSQL** sẽ chạy ở cổng `5432`, **Redis** ở cổng `6379`, và **Judge0 CE** ở cổng `2358`.

### Bước 2: Cài đặt và khởi chạy Backend (Spring Boot)
1. Sao chép file cấu hình môi trường `.env.example` thành `.env` và tùy chỉnh các thông số kết nối (DB, Redis, JWT Secret...) nếu cần.
2. Sử dụng Maven Wrapper để tải dependencies và chạy ứng dụng:
```bash
./mvnw spring-boot:run
```
> 💡 **Tip:** Mặc định Backend sẽ chạy tại: `http://localhost:8080/codelearning`

### Bước 3: Cài đặt và khởi chạy Frontend (React + Vite)
1. Di chuyển vào thư mục dự án Frontend:
```bash
cd frontend
```
2. Cài đặt các thư viện cần thiết:
```bash
npm install
```
3. Khởi chạy máy chủ phát triển (Dev server):
```bash
npm run dev
```
> 💡 **Tip:** Frontend sẽ hoạt động tại: `http://localhost:5173`

---

## 📂 8. Tài liệu Đặc tả đính kèm (Documentation)

*   **SRS (Software Requirement Specification):** Đặc tả chi tiết toàn bộ Actor, Use Case Diagram, Activity Diagram và các ràng buộc phi chức năng (Non-functional).

> [!TIP]  
> Các tài liệu đặc tả và sơ đồ thiết kế chi tiết được đặt trong thư mục `/docs` của mã nguồn dự án.

---

## 👥 9. Thành viên nhóm (Team Members)

| STT | MSSV | Họ và tên | GitHub | Vai trò |
| :---: | :---: | :--- | :--- | :---: |
| 👑 **1** | DE190293 | **Võ Ngọc Thanh** | [@ThanhMila](https://github.com/ThanhMila) | **Leader** |
| 🧑‍💻 **2** | DE190023 | **Trịnh Hoàng Thiên Bảo** | [@Bazero06](https://github.com/Bazero06) | Member |
| 🧑‍💻 **3** | DE190416 | **Nguyễn Duy Phương** | [@duyphuong24](https://github.com/duyphuong24) | Member |
| 🧑‍💻 **4** | DE190094 | **Nguyễn Văn Quang** | [@nguyenvanquangfptu](https://github.com/nguyenvanquangfptu) | Member |
| 🧑‍💻 **5** | DE190307 | **Hồ Sĩ Tấn** | [@Hositan26](https://github.com/Hositan26) | Member |

---

## 📅 10. Quản lý dự án (Jira Project Management)

*   🔗 **Link bảng công việc nhóm (Jira Board):** [Jira Project Workspace](https://duyphuongg2410.atlassian.net/jira/software/projects/SS/boards/3/backlog?atlOrigin=eyJpIjoiOGYyYzEwNDZjODQ5NGY0ZmJiOGM2M2JmZGZmNDkzMDEiLCJwIjoiaiJ9)

