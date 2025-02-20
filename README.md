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
To initialize the python application, cd to the root directory of the project and run
```bash 
pipenv install
pipenv shell
python manage.py migrate
```

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
