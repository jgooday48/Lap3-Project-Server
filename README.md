# Lap3-Project-Server

This is the server for the notes app. The client side can be found [here](https://github.com/jgooday48/Lap3-Project-Client)
## Instructions for Installation and Usage

- Clone or fork this repo
- Run `npm i` to install required packages
- Run `touch .env`
- Copy and paste `PORT=3000` and `MONGO_ARI=mongodb://username:password@localhost:27017/database?authSource=admin` into the .env file
- Open Docker
- Run `docker pull mongo`
- Edit the docker-compose.yaml file to your own specifications (i.e username, password and container name)
- Replace the username and password with your own credentials in the URL in the .env file
- Run `docker compose up -d` to start running the docker container
- Run `npm run dev` to start the server
- See the [client side repo](https://github.com/jgooday48/Lap3-Project-Client) for instructions to set up the client side

## Technologies 
- Mongoose 
- Mongo DB
- JavaScript
- Express
- NoSQL
