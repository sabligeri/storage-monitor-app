# Storage Monitoring System (Monorepo)

This is a **full-stack storage monitoring system** that allows users to **manage storages, items, and simulate production processes**.  

✅ Built with **Spring Boot (backend)** and **React + TypeScript (frontend)**.  
✅ Uses **PostgreSQL** for data storage and **JWT authentication** for security.  
✅ UI powered by **Material UI** for a modern look and feel.  

## 📌 Features
- ✅ **User authentication** (Register & Login with JWT)
- ✅ **Storage & Item management** (Create, List, Delete)
- ✅ **User-specific data access** (Only view your own storages/items)
- ⏳ **Upcoming**:  
  - 🏗 **Implwmwnt item refill and delete feature**  
  - 🔄 **Production simulation**   
  - 🎨 **UI upgrade with Material UI**  

---

## 🏗 Tech Stack
| **Layer**  | **Technology** |
|------------|--------------|
| **Frontend** | React, TypeScript, Vite, Material UI |
| **Backend** | Spring Boot, Java 17, Maven |
| **Database** | PostgreSQL |
| **Security** | Spring Security, JWT |

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
|--------|---------|-------------|---------------|
| **POST** | `/api/user/register` | Register a new user | ❌ No |
| **POST** | `/api/user/login` | Login and get JWT token | ❌ No |

### **Storage Management**
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| **POST** | `/api/storage/` | Create a new storage | ✅ Yes |
| **GET** | `/api/storage/user/{userId}` | Get storages for a user | ✅ Yes |
| **DELETE** | `/api/storage/{userId}/{storageId}` | Delete a storage | ✅ Yes |

### **Item Management**
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| **POST** | `/api/item/` | Add a new item to storage | ✅ Yes |

### **Item Types**
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| **POST** | `/api/itemType/` | Create an item type | ✅ Yes |
| **GET** | `/api/itemType/user/{userId}` | Get all item types by user | ✅ Yes |

---

## 🔮 Future Plans
- 🏗 **Implwmwnt item refill and delete feature**
- 🔄 **Implement production simulation feature**
- 🎨 **Switch frontend from plain CSS to Material UI**
  

---
