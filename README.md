# Event Calendar App

A simple Event Calendar application built using React, day.js, and localStorage to manage events. Users can add, edit, and delete events, view a calendar, and track events for selected dates.

## Features

- View calendar by month and navigate through months.
- Add, edit, and delete events.
- Store events in localStorage so they persist even after a page refresh.
- Responsive and interactive UI with dynamic event markers on selected days.

## Installation

### Prerequisites

Ensure that you have the following installed:

- Node.js
- npm

### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/event-calendar-app.git
   cd event-calendar-app
2. **Install dependencies: Run the following command to install the required dependencies using npm**:
   ```bash
   npm install
3. **Start the development server: To run the application locally, use the following script**:
   ```bash
   npm start
This will start the development server at http://localhost:5173. You can view the calendar and start adding/editing events.


## Scripts

### Available Scripts

- `npm start`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
- `npm run build`: Builds the app for production to the `build` folder. It correctly bundles the React app in production mode.
- `npm test`: Launches the test runner in the interactive watch mode (if tests are configured).
- `npm run eject`: This command removes the single build dependency from your project and gives you full control over the webpack configuration.

## How It Works

- **React State Management**: Events are stored in the state of the `Home` component and are persisted in `localStorage`. The state is updated whenever events are added, edited, or deleted.
- **Calendar View**: The calendar grid is generated based on the current month, and events for each day are displayed with a small red dot. Clicking on a day opens a form to add or edit events.
- **EventForm Component**: The form allows the user to input event details (name, start time, end time, description). The form is shown when a day is clicked in the calendar grid.
- **LocalStorage**: Events are saved in `localStorage` to ensure that event data persists even if the page is refreshed.

## Tech Stack

- **Frontend**: React, day.js
- **State Management**: React `useState` and `useEffect` hooks
- **Styling**: Tailwind CSS (you can modify the design based on your needs)

## Folder Structure

     src/
     ├── components/
     │   ├── CalendarGrid.js
     │   ├── EventForm.js
     │   └── ui/
     │       └── button.js
     ├── utils/
     │   └── calendarLogic.js
     ├── App.js
     └── index.js





# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
