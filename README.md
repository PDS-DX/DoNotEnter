# DoNotEnter

## Description
I don't really know what this is going to be yet but it's certainly something.

## Pre-requisites
Python Version 3.13.2

Other Python Packages
- `pip`
- `pipenv`

NodeJS Version 22.14.0

NPM Version 10.9.2

## Installation

---

### Windows

These Windows installation instructions are fully functional using a clean install of Windows 11(64 bit). Please regard the notes as they are important for avoiding installation issues.

#### Code Repository
First, you will need to clone this repository by either using the `git clone` command or by downloading the zip file and extracting it to your desired location.

#### Python & Pipenv
To install python, download python version 3.13.2 from the [official website](https://www.python.org/downloads/) and follow the installation instructions.

***Note: Make sure to add python to your PATH during the installation process otherwise you will have to manually add it later.***

Next, you will need to install pipenv. To do this, open a terminal and run the following command
```bash
pip install pipenv
```

To initialize the python application on Windows, cd to the root directory of the project and run
```bash 
pipenv install
pipenv shell
```

Then cd to the `backend` directory and run
```bash
python manage.py migrate
```

Now that your database migrations have run, you can run the following command to start the python application
```bash
python manage.py runserver
```

The python application should now be running at `http://localhost:8000`

#### NodeJS & NPM
To install NodeJS, download NodeJS version 22.14.0 from the [official website](https://nodejs.org/en/download/) and follow the installation instructions.

***Note: If you get errors when trying to run the npm commands, you may need to restart your terminal and/or run the following command.***
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

To initialize the react ts application, cd to the `/frontend/` directory and run
```bash
npm install
```
Now that your dependencies have been installed, you can run the following command to start the react ts application
```bash
npm run dev
```

The react ts application should now be running at `http://localhost:5173` but you should double check the terminal output to confirm the port number.

#### OpenAI API Key and Environment Variables
To use the OpenAI API, you will need to create an account and generate an API key. You can do this by going to the [OpenAI website](https://platform.openai.com/settings/organization/api-keys) to create and save an api key.
Next, you will need to create a `.env` file in the `/backend/` directory of the project and add the following environment variables. You can copy the `example.env` file and rename it to `.env` or create a new file and add the following variables.
```bash
OPENAI_API_KEY=your_api_key
```

---

### Linux

These Linux installation instructions aren't as thorough as the Windows instructions because they assume that if you are running Linux, you are familiar with dependencies and package management.

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

### Running the Application
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

### OpenAI API Key and Environment Variables
To use the OpenAI API, you will need to create an account and generate an API key. You can do this by going to the [OpenAI website](https://platform.openai.com/settings/organization/api-keys) to create and save an api key.
Next, you will need to create a `.env` file in the `/backend/` directory of the project and add the following environment variables. You can copy the `example.env` file and rename it to `.env` or create a new file and add the following variables.
```bash
OPENAI_API_KEY=your_api_key
```

## Notes
To confirm the versions of the packages you are using, run the following commands
```bash
python --version
pipenv --version
node --version
npm --version
```