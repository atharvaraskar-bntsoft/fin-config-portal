# Stage 1: Build Custom JRE using jlink
FROM eclipse-temurin:21-jdk-alpine AS jre-builder

RUN jlink --output /jre --verbose --strip-debug --compress 2 --no-header-files --no-man-pages \
    --add-modules java.base,jdk.net,jdk.charsets,java.sql,java.naming,java.desktop,java.management,java.security.jgss,java.instrument,jdk.unsupported,java.xml,java.scripting,java.net.http,java.logging,java.prefs,java.rmi,java.security.sasl,java.xml.crypto,jdk.crypto.ec,jdk.crypto.cryptoki,jdk.localedata,jdk.zipfs,java.transaction.xa,java.compiler,jdk.management,jdk.management.agent,jdk.httpserver,java.se \
    && apk add --no-cache binutils \
    && strip -p --strip-unneeded /jre/lib/server/libjvm.so

# Stage 2: Final Image
FROM alpine:3.19.1

# Locale environment variables
ENV LANG='en_US.UTF-8' \
    LANGUAGE='en_US:en' \
    LC_ALL='en_US.UTF-8'

# Build arguments
ARG mysqlHost=localhost
ARG TOMCAT_DIR=/usr/local/tomcat
ARG JAVA_DIR=/opt/java/openjdk

# Environment variables
ENV JAVA_HOME=${JAVA_DIR} \
    PATH="${JAVA_DIR}/bin:${TOMCAT_DIR}/bin:${PATH}" \
    mysql_host=${mysqlHost}

# Install dependencies and locales
RUN apk add --no-cache \
        tzdata \
        musl-locales \
        musl-locales-lang \
        bash \
        curl \
        dos2unix \
        iproute2 \
    && rm -rf /var/cache/apk/*

# Create Java directory and copy custom JRE
RUN mkdir -p ${JAVA_HOME}
COPY --from=jre-builder /jre ${JAVA_HOME}

# Create tomcat directory
RUN mkdir -p ${TOMCAT_DIR}

# Download and install Tomcat
WORKDIR /tmp
RUN curl -O https://archive.apache.org/dist/tomcat/tomcat-10/v10.1.16/bin/apache-tomcat-10.1.16.tar.gz \
    && tar xzf apache-tomcat-10.1.16.tar.gz \
    && mv apache-tomcat-10.1.16/* ${TOMCAT_DIR}/ \
    && rm -rf apache-tomcat-10.1.16* \
    && rm -f ${TOMCAT_DIR}/lib/tomcat-jdbc.jar

# Create user
RUN adduser -S -G root -u 1001 -s /bin/bash bntsoft

# Copy application files
WORKDIR ${TOMCAT_DIR}/webapps

COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/build/libs/switch-admin-portal*.war ${TOMCAT_DIR}/webapps/
COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/ssl/server.xml ${TOMCAT_DIR}/conf/
COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/ssl/keystore.p12 ${TOMCAT_DIR}/conf/
COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/ssl/generic-error.html ${TOMCAT_DIR}/webapps/ROOT/
COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/ssl/index.jsp ${TOMCAT_DIR}/webapps/ROOT/
COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/ssl/web.xml ${TOMCAT_DIR}/webapps/ROOT/WEB-INF/
COPY --chown=bntsoft:root BntSwitchAdminPortalBackend/ssl/catalina.sh ${TOMCAT_DIR}/bin/

# Setup files and permissions
RUN set -eux; \
    cd ${TOMCAT_DIR}/webapps && mv switch-admin-portal*.war bntmvpadm.war; \
    cd ${TOMCAT_DIR}/conf && touch server.xml.orig keystore.p12.orig; \
    cd ${TOMCAT_DIR}/webapps/ROOT && touch generic-error.html.orig index.jsp.orig; \
    cd ${TOMCAT_DIR}/webapps/ROOT/WEB-INF && touch web.xml.orig; \
    chmod +x ${TOMCAT_DIR}/bin/*.sh

# Set ownership
RUN chown -R bntsoft:root ${TOMCAT_DIR} \
    && chmod -R 750 ${TOMCAT_DIR}

# Switch to non-root user
USER bntsoft

WORKDIR ${TOMCAT_DIR}

EXPOSE 8080

CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]

