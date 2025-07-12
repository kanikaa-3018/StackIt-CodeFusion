# StackIt: A Minimal Q&A Forum Platform

**Team Name:** CodeFusion  
**Team Lead Email:** nhnishantharkut@gmail.com

---

## 🎯 Problem Statement  
StackIt is a **minimal question-and-answer platform** designed to foster collaborative learning and structured knowledge sharing within a community. It focuses on a **simple, user-friendly core experience** of asking and answering questions.

**Key Requirements:**  
1. **User Roles & Permissions**  
   - **Guest:** View all questions and answers.  
   - **User:** Register, log in, post questions/answers, vote.  
   - **Admin:** Moderate content, ban users, send platform-wide messages, download reports.

2. **Ask Question**  
   - Title (short, descriptive)  
   - Description (rich text editor with formatting, media, alignment)  
   - Tags (multi-select).

3. **Rich Text Editor**  
   - Bold, Italic, Strikethrough  
   - Numbered & Bullet Lists  
   - Emoji, Hyperlinks, Image Upload (Cloudinary)  
   - Text Alignment (Left/Center/Right)

4. **Answering Questions**  
   - Logged-in users can submit formatted answers.

5. **Voting & Acceptance**  
   - Upvote/downvote answers.  
   - Question owner marks one answer as accepted.

6. **Tagging**  
   - Questions require relevant tags for discoverability.

7. **Notification System**  
   - Real-time notifications (bell icon) for answers, comments, mentions.  
   - Unread count badge, dropdown with recent items.

8. **Future Enhancements**  
   - Community Groups: Common chat, documentation, live video (facetime) sessions.

---

## 🚀 Features & Alignment with Hackathon Criteria  
| Criteria                 | Focus Area                      | Implementation Highlights                                 | Weight |
|--------------------------|---------------------------------|-----------------------------------------------------------|:------:|
| **Database Design**      | Schema structure, real-time sync| • Document-based schema (MongoDB)  
• Real-time updates via WebSockets | 35%    |
| **Coding Standards**     | Validation, modularity, performance, error handling | • Form & API validation (Joi)  
• Reusable React components & services  
• Lazy loading, caching with SWR  
• Centralized error boundary & logging | 40% |
| **UI/UX Design**         | Responsiveness, navigation, search/filter | • Responsive layout (Tailwind CSS)  
• Pagination, breadcrumb, search & tag filter  
• Consistent color palette & accessibility | 15% |
| **Team Collaboration**   | Contribution distribution        | • GitHub flow with feature branches  
• Peer code reviews, CI lint checks  | 10% |

---

## 🛠️ Tech Stack  
- **Frontend:** React, Tailwind CSS, Excalidraw for mockups  
- **Backend:** Node.js, Express.js, WebSocket (Socket.IO)  
- **Database:** MongoDB  
- **Authentication:** JWT, bcrypt  
- **Storage:** Cloudinary (image uploads)  
- **Notifications:** Socket.IO, Redis Pub/Sub  


---

## 📥 Installation & Setup  
1. **Clone the repository**  
   ```bash  
   git clone https://github.com/<your-org>/stackit.git  
   cd stackit
   ```
2. **Environment variables**
- Copy .env.example to .env and configure:
    ```bash
    DATABASE_URL=...
    JWT_SECRET=...
    CLOUDINARY_URL=...
    REDIS_URL=...   
    ```
3. **Install Dependencies**
    ```bash
    # Backend  
    cd server && npm install  
    # Frontend  
    cd ../client && npm install  
    ```
4. **Run locally**
    ```bash
    # Start backend  
    cd server && npm run dev  
    # Start frontend  
    cd ../client && npm run dev  
    ```
5. **Access**
    ```bash
    Frontend: http://localhost:5173
    Backend API: http://localhost:3000/
    ```

## 🔄 User Flow

A concise walkthrough of key user journeys in StackIt:

1. **Browse Questions (Home Page)**
   - Guest lands on Home (Screen 1): sees question list with filters (Newest, Unanswered) and Search.
   - Pagination at the bottom navigates through pages.

2. **Ask a Question (Screen 2)**
   - Logged‑in users click **Ask New Question**.
   - Fill in Title, Description (Rich Text Editor), and Tags.
   - Submit to post the question and redirect to its detail page.

3. **View & Answer (Screen 3)**
   - On Question Detail: view question, tags, author info.
   - Scroll through answers; vote (up/down) once per answer.
   - If not logged in, voting prompts login/signup.
   - Logged‑in users submit answers via the Rich Text Editor.
   - Question owner can mark one answer as **Accepted**.

4. **Notifications**
   - Actions (answer, comment, mention) trigger real‑time updates via the bell icon.
   - Unread count shows in navbar; dropdown displays recent notifications.

5. **Mobile Compatibility**
   - Responsive layout adapts filters and navigation to a mobile‑friendly menu (“More” dropdown).

---

## 📐 Architecture & Flow  
1. **Client:** React app communicates via RESTful APIs and WebSockets.  
2. **Server:** Express routes handle authentication, data operations; Socket.IO manages real-time events.  
3. **DB:** MongoDB stores users, questions, answers, votes, tags.  
4. **Cache & Pub/Sub:** Redis powers notification and live updates.  
5. **Storage:** Cloudinary manages media uploads.

---

## 🤝 Team & Collaboration  
- **CodeFusion**  
  - Lead: Nishant (nhnishantharkut@gmail.com)  
  - Backend & Real-time: Kanika and Sidrah
  - Frontend & UI/UX: Nishant 
  - Ai & DevOps : Debdip

**GitHub Workflow**:  
- Feature branches, pull request reviews, linting + tests on CI.  
- Weekly stand-ups with Excalidraw roadmaps and retrospectives.

---

## 📞 Contact & Support  
Feel free to reach out to **nhnishantharkut@gmail.com** for any queries or feedback.

**Thank you for reviewing our submission!**  
*CodeFusion is committed to delivering a robust, user-centric Q&A platform that excels in performance, maintainability, and collaboration.*

