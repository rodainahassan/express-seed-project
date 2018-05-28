# express-seed-project

An ES6/ES7 Express.js RESTful API starter project following best practices and Airbnb javascript style guide with JWT-based authentication, Socket.io real-time updates, multer file upload and nodemailer email notifications integration.

## Technology:

* Node.js v9
* Express.js v4
* Socket.io v2
* MongoDB v3.6
* Docker

## How to run manually?

1. Clone the repo
2. `npm i`
3. 
    * Development: 
        1. `npm start`
    * Production:
        1. `npm i -g pm2`
        2. `NODE_ENV=production pm2 start ./bin/www`

## How to run with docker?

1. Clone the repo.
2. 
   * Development: `docker-compose -f docker-compose.dev.yml up`
   * Production: 
      1. `docker swarm init`
      2. `docker stack deploy -c docker-compose.yml express-seed-project`

&#9400; Omar Doma 2018
