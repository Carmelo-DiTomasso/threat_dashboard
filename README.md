# Threat Dashboard

A full-stack threat dashboard that allows users to search for public IP addresses and view data from the Shodan API. Built with a React frontend and Django backend.

## Features

- IP search bar for any public IPv4 (depending on Shodan's data availability and API access level)
- - Displays key details like:
  - ISP
  - Organization
  - Country
  - City
  - Open Ports
  - Exposed Services (Transport, Banner, OS, Product, Version, Port)
- Secure API key handling using .env and Django backend
- Active search message showing what is currently being queried
- Simple loading and error handling
- Clean separation between frontend and backend projects

## Tech Stack

- Frontend: React (JavaScript)
- Backend: Django (Python)
- External API: Shodan
- Version Control: Git + GitHub
- Environment Management: .env variables

## Project Structure

- `threat_dashboard/`
  - `frontend/` – React project
  - `backend/` – Django project

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/Carmelo-DiTomasso/threat_dashboard.git
cd threat_dashboard
```

### 2. Backend Setup (Django)

```
cd backend
python -m venv venv
venv\Scripts\activate          # On Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with:

```
SHODAN_API_KEY=your_api_key_here
```

Then run:

```
python manage.py runserver
```

### 3. Frontend Setup (React)

Open a new terminal:

```
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:

```
REACT_APP_API_URL=http://localhost:8000/api/search
```

Then start the frontend:

```
npm start
```

## Usage

1. Type a public IP address (like `8.8.8.8`) into the search bar
2. Press Search
3. View Shodan data for that IP displayed on the page

## Notes

- The Django backend handles all API calls to Shodan to keep the API key secure.
- The React frontend takes user input, sends it to the backend, and displays the response data.

## About

Built by Carmelo DiTomasso for practice with full-stack development, API usage, and secure architecture.
