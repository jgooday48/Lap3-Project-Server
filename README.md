# Lap3-Project-Server

This is the server for the notes app.
## Installation

- Clone or fork this repo
- Run `npm i` to install required packages
- Run `touch .env`
- Copy and paste `PORT=3000` and `MONGO_ARI=mongodb://username:password@localhost:27017/database?authSource=admin` into the .env file
- Open Docker
- Run `docker pull mongo`
- Edit the docker-compose.yaml file to your own specifications
- Replace the username and password with your own credentials in the .env file
- `docker compose up -d`
- Run `npm run dev` to start the server

## Technologies 
- Mongoose 
- Mongo DB
- JavaScript
- Express
- NoSQL
