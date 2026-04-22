# bnt-switch-admin-portal
## 📌 Overview

The **BNT Switch Admin Portal** is part of the **B-Switch payment engine**, used in the financial payments industry to acquire, authenticate, route, and authorize transactions across multiple channels.
This project provides both **backend (Spring Boot / Java)** and **frontend (Angular)** components along with **Docker support** for deployment.

---
basic filter

SELECT
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
FROM txn_log t1_0
WHERE
    t1_0.txn_recv_date_time BETWEEN '2022-04-18 10:34:48'
                                AND '2025-04-20 10:34:48'
ORDER BY
    t1_0.created_on DESC
LIMIT 0, 20;



with tcn type filter
SELECT
    txn_log.id,
    JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value')) AS amount_value,
    txn_log.created_on,
    txn_log.ipc,
    txn_log.merchant_id,
    JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.rrn')) AS rrn,
    txn_log.terminal_id,
    txn_log.txn_data,
    txn_log.txn_id,
    txn_log.txn_originator_reference,
    txn_log.txn_psp_reference,
    txn_log.txn_recv_date_time,
    txn_log.txn_type,
    txn_log.updated_on
FROM
    txn_log
WHERE
    txn_log.txn_type = 'Withdrawal'
    AND txn_log.txn_recv_date_time BETWEEN '2022-04-18 10:34:48' AND '2025-04-20 10:34:48'
ORDER BY
    txn_log.created_on DESC
LIMIT 0, 20;




with trenial id filter
SELECT
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
FROM txn_log t1_0
WHERE
    t1_0.txn_recv_date_time BETWEEN '2022-04-19 10:34:48'
                                AND '2026-04-20 10:34:48'
    AND t1_0.terminal_id = '321452'
ORDER BY t1_0.created_on DESC
LIMIT 0, 20;


with amount filter
SELECT
    txn_log.id,
    JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value')) AS amount_value,
    txn_log.created_on,
    txn_log.ipc,
    txn_log.merchant_id,
    JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.rrn')) AS rrn,
    txn_log.terminal_id,
    txn_log.txn_data,
    txn_log.txn_id,
    txn_log.txn_originator_reference,
    txn_log.txn_psp_reference,
    txn_log.txn_recv_date_time,
    txn_log.txn_type,
    txn_log.updated_on
FROM
    txn_log
WHERE
    txn_log.txn_recv_date_time BETWEEN '2022-04-18 10:34:48'
                                  AND '2025-04-20 10:34:48'
    AND JSON_UNQUOTE(JSON_EXTRACT(
        txn_log.txn_data,
        '$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value'
    )) = 50
ORDER BY
    txn_log.created_on DESC
LIMIT 0, 20;










with source acquire filter
SELECT
    txn_log.id,
    JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value')) AS amount_value,
    txn_log.created_on,
    txn_log.ipc,
    txn_log.merchant_id,
    JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.rrn')) AS rrn,
    txn_log.terminal_id,
    txn_log.txn_data,
    txn_log.txn_id,
    txn_log.txn_originator_reference,
    txn_log.txn_psp_reference,
    txn_log.txn_recv_date_time,
    txn_log.txn_type,
    txn_log.updated_on
FROM
    txn_log
WHERE
    txn_log.txn_recv_date_time BETWEEN '2022-04-18 10:34:48' AND '2025-04-20 10:34:48'
    AND JSON_UNQUOTE(JSON_EXTRACT(txn_log.txn_data,'$.message_collection[0].message_exchange.request_message.acquirer_institution_code')) = 'ACQ001'
ORDER BY
    txn_log.created_on DESC
LIMIT 0, 20;



//two json filtter source acquirer and amount

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
    t1_0.txn_recv_date_time between '2024-04-19 08:20:33'
    and '2026-04-20 08:20:33'

    and json_unquote(json_extract(
        t1_0.txn_data,
        '$.message_collection[0].message_exchange.request_message.acquirer_institution_code'
    )) = 'ACQ001'

    and json_unquote(json_extract(
        t1_0.txn_data,
        '$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value'
    )) = 50

order by t1_0.created_on desc
limit 0, 20;

















filetrs destination endpoint
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
    t1_0.txn_recv_date_time between '2024-04-19 08:20:33'
    and '2026-04-20 08:20:33'

    and json_unquote(json_extract(
        t1_0.txn_data,
        '$.message_collection[1].message_exchange.request_message.acquirer_institution_code'
    )) = '100'

    and json_unquote(json_extract(
        t1_0.txn_data,
        '$.message_collection[1].message_exchange.service_type'
    )) = 'AUTH_SERVICE'

order by t1_0.created_on desc
limit 0, 20;


filter 
Responce code
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



with respoence code filter
SELECT
    t1_0.id,
    JSON_UNQUOTE(JSON_EXTRACT(
        t1_0.txn_data,
        '$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value'
    )) AS amount_value,
    t1_0.created_on,
    t1_0.ipc,
    t1_0.merchant_id,
    JSON_UNQUOTE(JSON_EXTRACT(
        t1_0.txn_data,
        '$.message_collection[0].message_exchange.request_message.rrn'
    )) AS rrn,
    t1_0.terminal_id,
    t1_0.txn_data,
    t1_0.txn_id,
    t1_0.txn_originator_reference,
    t1_0.txn_psp_reference,
    t1_0.txn_recv_date_time,
    t1_0.txn_type,
    t1_0.updated_on
FROM txn_log t1_0
WHERE
    t1_0.txn_recv_date_time BETWEEN '2022-03-21 09:24:41'
                                AND '2026-04-21 10:24:41'
    AND JSON_UNQUOTE(JSON_EXTRACT(
        t1_0.txn_data,
        '$.message_collection[0].message_exchange.response_message.response_code'
    )) LIKE '%68%' ESCAPE '!'
ORDER BY t1_0.created_on DESC
LIMIT 0, 20;

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


<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="warn" monitorInterval="60">

    <Properties>
        <Property name="LOG_PATTERN">[%d{yyyy-MM-dd HH:mm:ss.SSS}]%5p [%t] - %c{1}:%m%n</Property>
        <Property name="basePath">${env:switch_log_location:-/usr/local/tomcat/logs}</Property>
    </Properties>

    <Appenders>

        <Console name="Console" target="SYSTEM_OUT" follow="true">
            <PatternLayout pattern="${LOG_PATTERN}" />
        </Console>

        <RollingFile name="File"
                     fileName="${basePath}/app-ui-log.log"
                     filePattern="${basePath}/$${date:yyyy-MM}/app-ui-%d{yyyy-MM-dd-HH}-%i.log.gz"
                     immediateFlush="false">

            <PatternLayout pattern="${LOG_PATTERN}" />

            <Policies>
                <SizeBasedTriggeringPolicy size="20 MB" />
            </Policies>

            <DefaultRolloverStrategy max="5">
                <Delete basePath="${basePath}" maxDepth="2">
                    <IfFileName glob="*/app-ui-*.log.gz" />
                    <IfLastModified age="7d" />
                </Delete>
            </DefaultRolloverStrategy>

        </RollingFile>

        <RollingFile name="USER_ACTIVITY_LOG_FILE"
                     fileName="${basePath}/user-ui-activity-log.log"
                     filePattern="${basePath}/$${date:yyyy-MM}/user-ui-activity-%d{yyyy-MM-dd-HH}-%i.log.gz">

            <PatternLayout pattern="${LOG_PATTERN}" />

            <Policies>
                <SizeBasedTriggeringPolicy size="20 MB" />
            </Policies>

            <DefaultRolloverStrategy max="5">
                <Delete basePath="${basePath}" maxDepth="2">
                    <IfFileName glob="*/user-ui-activity-*.log.gz" />
                    <IfLastModified age="7d" />
                </Delete>
            </DefaultRolloverStrategy>

        </RollingFile>

        <RollingFile name="MONITORING_LOG_FILE"
                     fileName="${basePath}/monitoring-log.log"
                     filePattern="${basePath}/$${date:yyyy-MM}/monitoring-log-%d{yyyy-MM-dd-HH}-%i.log.gz">

            <PatternLayout pattern="${LOG_PATTERN}" />

            <Policies>
                <SizeBasedTriggeringPolicy size="20 MB" />
            </Policies>

            <DefaultRolloverStrategy max="5">
                <Delete basePath="${basePath}" maxDepth="2">
                    <IfFileName glob="*/monitoring-log-*.log.gz" />
                    <IfLastModified age="7d" />
                </Delete>
            </DefaultRolloverStrategy>

        </RollingFile>

    </Appenders>

    <Loggers>

        <!-- Core logs -->
        <Logger name="org.springframework" level="off"/>
        <Logger name="org.apache" level="info"/>
        <Logger name="com.bnt" level="info"/>

        <!-- ========================= -->
        <!-- Hibernate DEBUG CLEAN FIX -->
        <!-- ========================= -->

        <!-- SQL Queries -->
        <Logger name="org.hibernate.SQL" level="debug" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Logger>

        <!-- Bind Parameters (VERY IMPORTANT) -->
        <Logger name="org.hibernate.orm.jdbc.bind" level="trace" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Logger>

        <!-- Optional: result extraction (can be noisy) -->
        <!--
        <Logger name="org.hibernate.orm.jdbc.extract" level="trace" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Logger>
        -->

        <!-- REMOVE FULL HIBERNATE DEBUG (IMPORTANT) -->
        <!-- ❌ DO NOT USE: org.hibernate debug -->

        <!-- Monitoring logs -->
        <Logger name="com.bnt.monitoring" additivity="false" level="info">
            <AppenderRef ref="MONITORING_LOG_FILE"/>
        </Logger>

        <!-- User activity logs -->
        <Logger name="userActivityLogger" additivity="false" level="info">
            <AppenderRef ref="USER_ACTIVITY_LOG_FILE"/>
        </Logger>

        <!-- Root -->
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Root>

    </Loggers>

</Configuration>

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

logging.level.root=INFO
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.orm.jdbc.bind=TRACE
logging.level.org.hibernate.orm.jdbc.extract=TRACE
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
