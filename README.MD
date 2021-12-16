# Kisaragi Users API
Kisaragi is a social network made to share your thoughts but also sell or buy whatever you want.
This project has a microservice approach, this is the users microservice.
## Features
- User authentication
- Users operations (CRUD)
- Manage follow and unfollow users
## Run
To run it locally follow the next steps:
```bash
npm install
run-rs
nodemon app
```
Since this project use MongoDB transactions, you will need to run rs on you computer to create replica sets.
This comes by default on Mongo Atlas.