# CodePulse 🚀

CodePulse is a robust backend engine designed to track competitive programming progress, monitor coding statistics, manage streaks, and provide performance insights. It is structured as a scalable monorepo to seamlessly connect a Spring Boot core, a React user interface, and an upcoming Python-based Machine Learning prediction service.

---

## 🛠️ Tech Stack

- **Language:** Java 17+
- **Framework:** Spring Boot 3.x
- **Database:** MySQL
- **ORM/Data Access:** Spring Data JPA / Hibernate
- **Build Tool:** Maven

---

## 🏗️ System Architecture

The project is structured side-by-side to allow independent development and deployment of each system tier:

```text
codepulse/
├── Backend/        <-- Spring Boot API (Current)
├── Frontend/       <-- React UI (Upcoming)
└── ai-service/     <-- Python ML Model Service (Upcoming)
