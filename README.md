# Scheduler App

The Scheduler App is a web application that allows users to schedule appointments with interviewers. It was built using React, Axios, and Storybook, and tested with Cypress, Jest and React Testing Library.

<img width="1414" alt="image" src="https://user-images.githubusercontent.com/112909357/229339427-7d2da63d-6d27-4aea-9c4f-d6a46cc0c147.png">

<img width="1136" alt="image" src="https://user-images.githubusercontent.com/112909357/229339487-3636fe34-ca68-4bb1-ac43-e563b89c4112.png">

<img width="1136" alt="image" src="https://user-images.githubusercontent.com/112909357/229339561-788340b1-67b8-44f6-8585-8043494bb695.png">

![image](https://user-images.githubusercontent.com/112909357/229339840-d672be38-ef9f-4265-8f8c-c068e2f989f4.png)


## Features

- Display appointments for each day of the week.
- Allow users to add and edit appointments.
- Allow users to delete appointments.
- Automatically update the number of spots remaining for each day.
- Display error messages when appointments cannot be saved or deleted.
- Support multiple users and allow them to switch between them.

## Setup

1. Clone this repository to your local machine
2. Install the dependencies:
  ```sh
npm install
```

## Running Webpack Development Server

```sh
npm start
```
## Running Jest Test Framework and Cypress

```sh
npm test
```

- Install Cypress
```sh
npm install -g cypress@9.7.0 
```
- Load Test Database
```sh
NODE_ENV=test npm start
```
- Run Cypress
```sh
npm run cypress
```
## Running Storybook Visual Testbed

```sh
npm run storybook
```


## Dependencies

- React: A JavaScript library for building user interfaces
- Axios: A promise-based HTTP client for making API requests
- Storybook: A tool for building UI components in isolation
- Jest: A JavaScript testing framework