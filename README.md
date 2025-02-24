# Backend - Storage Monitoring App

This is the backend for the **Storage Monitoring System**, built with **Spring Boot, PostgreSQL, and JWT authentication**.

## 🚀 Features
- ✅ **User authentication** (Register & Login) with JWT
- ✅ **Storage & Item management** (Create, List, Delete)
- ✅ **User-specific data access** (Only view your own storages/items)
- ⏳ Upcoming: **Production simulation**, improved role-based access

## 🏗 Setup & Installation

### **Prerequisites**
- **Java 17+**
- **Maven**
- **PostgreSQL** (Running locally or via Docker)

### **1️⃣ Database Setup**
Make sure you have a **PostgreSQL** database running. Then, set up the required environment variables:

```sh
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_database
export SPRING_DATASOURCE_USERNAME=your_username
export SPRING_DATASOURCE_PASSWORD=your_password
export SECRET_KEY=your_jwt_secret
```

### **2️⃣ Run the Application**
```sh
./mvnw spring-boot:run
```