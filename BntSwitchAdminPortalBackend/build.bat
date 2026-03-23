@echo off
call ../gradlew clean build -x test war
rem call %GRADLE_HOME%/bin/gradle sonarqube