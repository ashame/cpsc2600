# [CPSC 2600 Final Project](https://project-2600.herokuapp.com/)

This is a somewhat basic restaurant menu management application. Features include secured API routes via sessionId tokens, fully functioning user signup / login, the ability to create new 'restaurants' - each with their own menu (or menus), and the ability to add items to the menu.

Also included in the project is an openapi.yml file, documenting (most) of the API routes.

## Project Structure

- /api/v1 - contains all API routes, with each route separated into it's own appropriate folder
  - /login - 1 POST route
  - /logout - 1 POST route
  - /menus - 2 POST routes (secured), 2 GET routes (one with a specific :id)
  - /register - 1 POST route 
  - /restaurants - 1 POST route (secured), 3 GET routes
  - /util.js - helper authentication method for securing some API routes

- /db - contains database connection code
- /models - contains all models and schemas used in the project

- /src
  - /components - all (styled) components and partials used in App.js
  - /pages - contains all pages used as routes in App.js
    - /components - contains all (styled) components used in above pages

## Instructions

1. npm install

2. npm start OR npm run dev

## Dependencies

- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)
- [axios](https://www.npmjs.com/package/axios)
- [babel-loader](https://www.npmjs.com/package/babel-loader)
- [bcrytpjs](https://www.npmjs.com/package/bcryptjs)
- [bootstrap](https://getbootstrap.com/)
- [css-loader](https://www.npmjs.com/package/css-loader)
- [css-reset-and-normalize](https://www.npmjs.com/package/css-reset-and-normalize)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://expressjs.com/)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [mongoose](https://mongoosejs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [react](https://reactjs.org/)
- [react-bootstrap](https://react-bootstrap.github.io/)
- [react-router-dom](https://reactrouter.com/)
- [style-loader](https://www.npmjs.com/package/style-loader)
- [styled-components](https://www.npmjs.com/package/styled-components)
- [uuid](https://www.npmjs.com/package/uuid)
- [webpack](https://www.npmjs.com/package/webpack)
- [webpack-cli](https://www.npmjs.com/package/webpack-cli)