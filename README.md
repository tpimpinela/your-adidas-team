![Deployment status](https://github.com/tpimpinela/your-adidas-team/actions/workflows/pipeline.yml/badge.svg "Deployment status")

# About the application

"Your adidas team" is a React application where a user can create their own footbal team selecting players from the different national teams of the 2022 football world cup. The app is deployed <a href="https://tpimpinela-your-adidas-team.netlify.app/" target="_blank">here</a>.

# About the code

- React + TypeScript + SWC is used as the core framework to build the UI.
- React router is used for the management of the routes.
- React Context API is used for sharing the created football team and the loading state across the whole application.
- LocalStorage is used for caching the HTTP requests and persisting the team information.
- React.Lazy and React.Suspense are used for lazy loading the components and increasing the application performance.
- Custom hooks, helpers and services are used to isolate the application logic.
- Vite is the build tool of the project.
- Vitest is used for the unit test.
- ESLint is used for finding and fixing code problems.
- Github Actions are used for the CI/CD (you can have a look at pipeline.yml)
- Netlify is used for hosting the application.

# How to run the project locally

1. Clone the repository
2. Install the packages (with npm install, for example)
3. Get an API key for <a href="https://rapidapi.com/api-sports/api/api-football/" target="_blank">this API</a>.
4. In the root of the repository create a .env file an put your API key as the value of the VITE_API_KEY environment variable (you can have a look at sample.env)
5. Run the development server with the "dev" command (with npm run dev, for example)

# Available commands

- dev: start the development server
- build: build the project
- preview: serve the build solution (you need to run build command first)
- test: run the unit tests
- lint: run eslint

# Possible improvements

- Handle HTTP errors inside useFetch custom hook and show a modal/page to the user about the error.
- Handle application errors with a React Error Boundary.
- Add filters to player selection (by position, for example).
- Show a toast to the user everytime the validations are updated (for example: you need only one more attacker to complete your team).
