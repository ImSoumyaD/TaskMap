
# TaskMap 1.0 🚀

**TaskMap 1.0** is a web-based to-do application designed to help users manage their tasks efficiently. The application features a secure user authentication system and session management, allowing users to create, view, and delete tasks seamlessly.

---

## Features ✨

- 🔒 **User Authentication**: Secure login and registration using JWT.
- 🕒 **Session Management**: Maintain user sessions to ensure secure access to the application.
- 📝 **Add/Delete Todos**: Easily create new tasks and delete existing ones.

---

## Technologies Used 🛠️

### Frontend 🌐
- ![React](https://img.shields.io/badge/-ReactJS-61DAFB?logo=react&logoColor=white)  
- ![HTML](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)  
- ![CSS](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)  
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)  
- ⚡ **Axios** (for API calls, no logo available)

### Backend 🖥️
- ![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=springboot&logoColor=white)  
- ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white) **Authentication**  
- ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)

### Tools 🛠️
- ![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white)  
- ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)  
- ⚡ **Axios** (API interaction, no specific logo available)

---

Here’s the updated **Installation** section with the required libraries added:

---

## Installation 🖥️

### 1. Clone the Repository 📂

```bash
git clone https://github.com/ImSoumyaD/TaskMap.git
cd TaskMap
```

### 2. Set Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Configure the MySQL database in `application.properties`:
   - Database Name: `taskmap_db`
   - Username: `root`
   - Password: `yourpassword`

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### 3. Set Up the Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install additional libraries:
   ```bash
   npm install jwt-decode react-router-dom react-datepicker
   ```
   - **jwt-decode**: To decode JWT tokens.
   - **react-router-dom**: For routing in React.
   - **react-datepicker**: For date and time picking functionalities.

4. Start the React development server:
   ```bash
   npm start
   ```
---

## Screenshots & Videos 📸

### Home Page 🔑
<img src="https://drive.google.com/uc?id=1wOOplsru43D4mQvixYK5Wem_xEQu6yYY" alt="Home Page" width="600"/>

### Login Page 🔑
<img src="https://drive.google.com/uc?id=152LCCHlqGwKE0KC8NptqEVKSjEOqJ7gU" alt="Login Page" width="600"/>

### Register Page 📝
<img src="https://drive.google.com/uc?id=1jWGMvz8ywlKvMtgq3rHMZ8Amd_AKJA0-" alt="Register Page" width="600"/>

### Task Management View 📝
<img src="https://drive.google.com/uc?id=1YPMANoZa8rz_dl3mKJf_DzlAHLEr64YR" alt="Task Management" width="600"/>
<img src="https://drive.google.com/uc?id=1h5XzxWUj8OsAT1oCxvXkOghvTeZyqs47" alt="Task Management" width="600"/>

---

By adding better contrast (black text/logos for Axios and JWT), this version ensures all technologies are presented more uniformly. Let me know if you'd like to adjust further!
