# About the application

"Your adidas team" is React application where a user can create their own footbal team selecting players from the different national teams of the 2022 football world cup. The app is deployed [https://tpimpinela-your-adidas-team.netlify.app/](here).

# About the code used

- React is used as the core framework to build the UI.
- React router is used for the management of the routes.
- React Context API is used for sharing the created football team and the loading state across the whole application.
- Custom hooks, helpers and services are used to isolate the application logic.
- Vite is the build tool of the project.
- Vitest is used for the unit test.
- Github Actions are used for the CI/CD (you can have a look at pipeline.yml)
- Netlify is used for hosting the application.

# How to run the project locally

1. Clone the repository
2. Install the packages (with npm install, for example)
3. Run the development server with the "dev" command (with npm run dev, for example)

# Available commands

- dev: start the development server
- build: build the project
- preview: serve the build solution (you need to run build command first)
- test: run the unit tests
- lint: run eslint

# Possible improvements

- Handle HTTP errors inside useFetch custom hook and show a modal/page to the user about the error.
- Handle application errors with a React Error Boundary.
