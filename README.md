
# Nanomarx Tech Assignment

Basic clone of https://lobste.rs


## Demo

https://nanomarx-jill.onrender.com


## Tech Stack

**Client:** React (Vite), React-Router-DOM, Reduxjs/Toolkit, TailwindCSS, Axios, React-Icons, Yup

**Server:** Node, Express, Mongoose, Express-Session, Argon2, Connect-Mongo CORS, Yup


## Features

- Clone majority of features from https://lobste.rs along with UI
- Auth Module (User Signup, Login, Logout, Client Route Protection)
- Story Module (Create, Fetch Active and Recent Stories, Search)
- Comments Module (Create, Fetch and Search Comments on stories)
- Vote Module (Add or Remove Vote on stories)


## Client Environment Variables

To run this project, create a new .env file in the client directory root and add the following environment variables (refer example.env)


`VITE_NODE_ENV` = development

`VITE_PORT` = 5000

`VITE_SERVER_URL` = http://localhost:5000/api


## Server Environment Variables

To run this project, create a new .env file in the server directory root and add the following environment variables (refer example.env)


`NODE_ENV` = development

`PORT` = 5000

`DATABASE_URL` = mongodb://localhost:27017/<db_name>

`CLIENT_URL` = http://localhost:3000

`SESSION_SECRET` = sshhhh!!

## Run Locally

Clone the project

```bash
  git clone https://github.com/jillBhatt26/nanomarx_tech_assignment.git
```

Go to the project directory

```bash
  cd nanomarx_tech_assignment
```

Go to the client and server directories

```bash
  cd client OR cd server
```

Add environment variables from above or by referring relevant example.env

```bash
  touch .env
```

Install dependencies

```bash
  yarn install --frozen-lockfile
```

Start the development server

```bash
  yarn dev
```


## Authors

- [@jillBhatt26](https://www.github.com/jillBhatt26)

