# bnt-switch-admin-portal
## 📌 Overview

The **BNT Switch Admin Portal** is part of the **B-Switch payment engine**, used in the financial payments industry to acquire, authenticate, route, and authorize transactions across multiple channels.
This project provides both **backend (Spring Boot / Java)** and **frontend (Angular)** components along with **Docker support** for deployment.

---

select
    t1_0.id,
    json_unquote(json_extract(t1_0.txn_data,'$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value')),
    t1_0.created_on,
    t1_0.ipc,
    t1_0.merchant_id,
    json_unquote(json_extract(t1_0.txn_data,'$.message_collection[0].message_exchange.request_message.rrn')),
    t1_0.terminal_id,
    t1_0.txn_data,
    t1_0.txn_id,
    t1_0.txn_originator_reference,
    t1_0.txn_psp_reference,
    t1_0.txn_recv_date_time,
    t1_0.txn_type,
    t1_0.updated_on
from txn_log t1_0
where
    t1_0.txn_recv_date_time between '2026-04-13 09:58:00'
    and '2026-04-20 09:58:00'

    and json_unquote(json_extract(
        t1_0.txn_data,
        '$.message_collection[0].message_exchange.response_message.response_code'
    )) like '%20%' escape '!'

order by t1_0.created_on desc
limit 0, 20;

## 📂 Repository

* **Admin Portal Codebase**
* Built using **Java (Spring Boot)**, **Gradle**, **Angular**, and **Docker**
* Integrated with **B-Switch Framework**

---

## 🛠 Prerequisites

Ensure the following tools are installed:

* Java **JDK 21**
* Gradle 8.5
* Node.js 18.11.9 & npm 4.1.5
* Angular CLI 14.2.12
* Spring Tool Suite (STS)
* Docker & Docker Compose
* Git

---

## 🚀 Local Setup & Build

### Step 1: Clone the Repository

```bash
git clone https://github.com/bnt-ps-org/bnt-switch-admin-portal.git
```

Create a directory structure like:

```text
Project/
 ├── code-bnt-swtich-admin-portal/
 └── ws-bnt-switch-admin-portal/
```

---

### Step 2: Create Workspace in STS

1. Open **Spring Tool Suite (STS)**
2. Select `ws-bnt-switch-admin-portal` as the workspace
3. Click **Launch**

---

### Step 3: Import Bnt-Switch-Admin-Portal

1. In STS → **Import Projects**
2. Select **Gradle → Existing Gradle Project**
3. Browse to `code-bnt-swtich-admin-portal`
4. Finish import

---

### Step 4: Build the project

1. Open **Gradle Tasks**
2. Refresh all tasks
3. Navigate to:

```text
bnt-switch-admin-portal > build
```

4. Run the task
   ✔️ Wait for **BUILD SUCCESSFUL**

### Step 5: Run Switch Admin Portal

## ▶️ Running the Application

### Backend (Spring Boot)

Path:

```text
bnt-switch-admin-portal/
 └── BntSwitchAdminPortalBackend/
     └── src/main/java/com/bnt/main
```

Run the **main class** as a Java application.

---

### Frontend (Angular)

```bash
cd bnt-switch-admin-portal/BntSwitchAdminPortalFrontend
ng serve
```

---

## 🐳 Docker Configuration

### Build Docker Image

```bash
docker build \
-t bnt-switch-admin-portal:latest \
--build-arg tomcatDir=/usr/local/tomcat \
-f Dockerfile .
```

---

### Run Docker Container

```bash
docker run -d \
--name bnt-switch-admin-portal-container \
--network bnt-network \
-p 8084:8080 \
-e RSWITCH_DB_HOST=mysql-container \
-e RSWITCH_DB_HOST_READ=mysql-container \
-e RSWITCH_DB_PORT=3306 \
-e RSWITCH_DB_PORT_READ=3306 \
-e RSWITCH_DB_USERNAME=root \
-e RSWITCH_DB_USERNAME_READ=root \
-e RSWITCH_DB_SCHEMA=switch \
-e RSWITCH_AUDIT_DB_SCHEMA=switch-db-audit \
bnt-switch-admin-portal:latest
```
