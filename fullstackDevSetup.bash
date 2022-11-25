#!/bin/bash
# git 
git init

# make frontend folder after npx create-react-app
mkdir frontend
mv * frontend

# create server
mkdir backend
cd backend
npm init -y    # fill everything with yes

# install Backend dependencies (MERN)
npm install express
npm install nodemon
npm install mongoose
npm install dotenv     # configure environment variables
npm install cors
# auths
npm install passport
npm install passport-google-oauth20
npm install --save cookie-session 

# frontend dependencites
npm install react-router-dom
npm install @reduxjs/toolkit react-redux



# run npm run dev to develop backend
sed '/"scripts":.*/a\    "dev": "nodemon server.js",' package.json > ptem; mv ptem package.json

# TBD