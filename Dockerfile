# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.26.1-focal
 
# Set the work directory for the application
WORKDIR /app
 
# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY package.json /app/
COPY src/ /app/src/
COPY *.json /app/
COPY reports /app/reports
COPY features /app/features
COPY cucumber.mjs /app/cucumber.mjs
COPY .eslintignore /app/.eslintignore
COPY .eslintrc.json /app/.eslintrc.json
COPY .npmrc /app/.npmrc
# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN npm install