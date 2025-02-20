# DoNotEnter

This README is a WIP(work-in-progress) as I haven't had a chance to run a clean install of this project. Please report any issues with this process.

## Pre-requisites
Python Version 3.13.2

NodeJS Version 22.14.0

NPM Version 10.9.2

### Python Packages
- `pip`
- `pipenv`
- `django`

## Installation

### Windows
To initialize the python application on Windows, cd to the root directory of the project and run
```bash 
pipenv install
pipenv shell
```

Then cd to `backend` directory and run
```bash
python manage.py migrate
```

### Linux
To intialize the python application on Linux, cd to the root directory of the project and run
```bash
python3 -m venv .venv
source .venv/bin/activate
pipenv install
```

Then cd to `backend` directory and run
```bash
python manage.py migrate
```

### Frontend (OS independent)

To initialize the react ts application, cd to the `/frontend/` directory and run
```bash
npm install
```

## Running the Application
To run the python application, cd to the `/backend/` directory and run
```bash
python manage.py runserver
```
The python application should now be running at `http://localhost:8000`

To run the react ts application, cd to the `/frontend/` and run
```bash
npm run dev
```
The react ts application should now be running at `http://localhost:5175`
