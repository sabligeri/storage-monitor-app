# Storage Monitoring System (Monorepo)

This is a **full-stack storage monitoring system** that allows users to **manage storages, items, and simulate production processes**.  

✅ Built with **Spring Boot (backend)** and **React + TypeScript (frontend)**.  
✅ Uses **PostgreSQL** for data storage and **JWT authentication** for security.  
✅ UI powered by **Material UI** for a modern look and feel.  

---

## 📌 Features
- ✅ **User authentication** (Register & Login with JWT)
- ✅ **Storage & Item management** (Create, List, Delete)
- ✅ **Item refill and delete**
- ✅ **Product definition and production simulation**
- ✅ **User-specific data access**
- ✅ **Modern UI with Material UI**

---

## 🏗 Tech Stack

| **Layer**     | **Technology**                                                                 |
|---------------|--------------------------------------------------------------------------------|
| **Frontend**  | [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org) [![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org) [![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev) [![Material UI](https://img.shields.io/badge/-MUI-007FFF?logo=mui&logoColor=white)](https://mui.com) |
| **Backend**   | [![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot) [![Java](https://img.shields.io/badge/-Java%2017-007396?logo=java&logoColor=white)](https://www.oracle.com/java/) [![Maven](https://img.shields.io/badge/-Maven-C71A36?logo=apachemaven&logoColor=white)](https://maven.apache.org) |
| **Database**  | [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org) |
| **Security**  | [![Spring Security](https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security) [![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io) |

---


## 🚀 Getting Started

### **1️⃣ Prerequisites**
- **Java 17+** (for backend)
- **Maven** (for backend)
- **Node.js 18+** (for frontend)
- **PostgreSQL** (for database)

### **2️⃣ Backend Setup (Spring Boot)**
1. Navigate to the **backend** folder:
   ```sh
   cd backend
   ```
2. Set up **environment variables** (or configure `application.properties`):
   ```sh
   export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_database
   export SPRING_DATASOURCE_USERNAME=your_username
   export SPRING_DATASOURCE_PASSWORD=your_password
   export SECRET_KEY=your_jwt_secret
   ```
3. Run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```
   The backend will start at **http://localhost:8080**.

### **3️⃣ Frontend Setup (React + Vite)**
1. Navigate to the **frontend** folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the frontend:
   ```sh
   npm run dev
   ```
   The frontend will be available at **http://localhost:5173**.

---

## 🔑 Authentication & Security
- The backend uses **JWT authentication** with **Spring Security**.
- When a user logs in, they receive a **JWT token**, which must be included in the `Authorization` header for protected requests:
  ```sh
  Authorization: Bearer <your_token>
  ```

---

## 📡 API Documentation

### **User Authentication**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/user/register` | Register a new user | ❌ No |
| POST   | `/api/user/login`    | Login and get JWT token | ❌ No |

### **Storage Management**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/storage/` | Create a new storage | ✅ Yes |
| GET    | `/api/storage/user/{userId}` | Get storages for a user | ✅ Yes |
| DELETE | `/api/storage/{userId}/{storageId}` | Delete a storage | ✅ Yes |
| GET    | `/api/storage/{storageId}/items` | Get items in a storage | ✅ Yes |

### **Item Management**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/item/` | Add a new item | ✅ Yes |
| DELETE | `/api/item/{itemId}` | Delete an item | ✅ Yes |
| PATCH  | `/api/item/{itemId}/refill` | Refill item quantity | ✅ Yes |

### **Item Types**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/itemType/` | Create an item type | ✅ Yes |
| GET    | `/api/itemType/user/{userId}` | Get item types by user | ✅ Yes |

### **Product Management**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/product/` | Create a new product | ✅ Yes |
| GET    | `/api/product/user/{userId}` | Get products for a user | ✅ Yes |

### **Production Simulation**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/production/simulate` | Simulate product creation (inventory check & deduction) | ✅ Yes |

### **Quantity Types**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET    | `/api/quantity-types/` | Get all quantity types | ❌ No |

---

## 🔮 Future Plans

- 🖼️ Adding picture to items and products
- 🔐 Improve access control with user roles (admin/user)  
- 🌐 i18n: Add support for multiple languages  
- 🧪 Add unit and integration tests for core backend logic  

  
---
