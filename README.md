# Storage Monitoring System (Monorepo)

This is a **full-stack storage monitoring system** that allows users to **manage storages, items, and simulate production processes**.  

✅ Built with **Spring Boot (backend)** and **React + TypeScript (frontend)**  
✅ Uses **PostgreSQL** for data storage and **JWT authentication** for security  
✅ UI powered by **Material UI**, with support for **Light/Dark mode**  
✅ Comes with **Docker support** and **automated tests**

---

## 📌 Features
- ✅ **User authentication** (Register & Login with JWT)
- ✅ **Storage & Item management** (Create, List, Delete, Refill)
- ✅ **Product definition and production simulation**
- ✅ **User-specific data access**
- ✅ **Modern UI with Material UI**
- ✅ **Light/Dark mode toggle**
- ✅ **Unit and integration testing**
- ✅ **Dockerized setup for full stack**

---

## 🏗 Tech Stack

| **Layer**     | **Technology**                                                                 |
|---------------|--------------------------------------------------------------------------------|
| **Frontend**  | [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org) [![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org) [![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev) [![Material UI](https://img.shields.io/badge/-MUI-007FFF?logo=mui&logoColor=white)](https://mui.com) |
| **Backend**   | [![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot) [![Java](https://img.shields.io/badge/-Java%2017-007396?logo=java&logoColor=white)](https://www.oracle.com/java/) [![Maven](https://img.shields.io/badge/-Maven-C71A36?logo=apachemaven&logoColor=white)](https://maven.apache.org) |
| **Database**  | [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org) |
| **Security**  | [![Spring Security](https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security) [![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io) |
| **Containerization** | [![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/products/docker-desktop) |


---

## 🚀 Getting Started

### 🔧 With Docker (recommended)

To run the full application stack using Docker:

1. Make sure **[Docker Desktop](https://www.docker.com/products/docker-desktop)** is installed and running on your machine.

   - Windows/Mac: Download and install Docker Desktop  
   - Linux: Use Docker Engine and Docker Compose

2. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```
2. Run the full stack using Docker Compose:
   ```sh
   docker compose up --build
   ```
- Frontend will be available at: **http://localhost:3000**  
- Backend will be available at: **http://localhost:8080**

---

### 🧑‍💻 Manual Setup

#### **1️⃣ Prerequisites**
- **Java 17+**
- **Maven**
- **Node.js 18+**
- **PostgreSQL**

#### **2️⃣ Backend Setup**
```sh
cd backend
./mvnw spring-boot:run
```

#### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

---

## 🔑 Authentication & Security
The backend uses **JWT tokens**.  
Include your token in the `Authorization` header:

```http
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

- 🖼️ Add images for items and products  
- 🔐 Improve access control with user roles (admin/user)  
- 📧 Email verification
- 📊 Production history
