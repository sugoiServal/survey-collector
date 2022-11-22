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
# auths
npm install passport
npm install passport-google-oauth20
npm install --save cookie-session 

npm uninstall passport
npm uninstall passport-google-oauth20
npm uninstall mongoose

# run npm run dev to develop backend
sed '/"scripts":.*/a\    "dev": "nodemon server.js",' package.json > ptem; mv ptem package.json

# TBD