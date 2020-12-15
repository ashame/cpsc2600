# CPSC 2600 Final Project

This is a somewhat basic restaurant menu management application. Features include secured API routes via sessionId tokens, fully functioning user signup / login, the ability to create new 'restaurants' - each with their own menu (or menus), and the ability to add items to the menu. 

As you might have noticed, the frontend is completely different from what I demonstrated to you during our meeting on Tuesday. Since Wednesday afternoon, I've completely scrapped my entire frontend and rebuilt it from the ground up, tidying up code and rewriting most components as functional components with useState and useEffect hooks. 

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

## Disclaimer

All images used in menu items that I created were either created or photographed by myself.

## Additional resources used

- [uuid](https://www.npmjs.com/package/uuid)
- [morgan](https://www.npmjs.com/package/morgan)
- [styled-components](https://www.npmjs.com/package/styled-components)
- [react-router-dom](https://reactrouter.com/)
- [css-reset-and-normalize](https://www.npmjs.com/package/css-reset-and-normalize)
- [react-bootstrap](https://react-bootstrap.github.io/)
- [bcrytpjs](https://www.npmjs.com/package/bcryptjs)