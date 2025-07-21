# Todo App

A modern React TypeScript todo application built with Vite and styled with Tailwind CSS.

## Features

- Add, edit, and delete todo items
- Mark todos as complete/incomplete
- Filter todos by status (all, active, completed)
- Clear completed todos
- Responsive design with Tailwind CSS

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- ESLint & Prettier

## Project Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Start Development Server

Run the development server with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## Build

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   └── TodoApp.tsx      # Main todo application component
├── App.tsx              # Root application component
├── index.css            # Global styles and Tailwind imports
└── main.tsx             # Application entry point
```
