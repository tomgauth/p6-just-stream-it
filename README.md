# Openclassrooms Project 6
# JUST STREAM IT WEBSITE

This website is created to display top movies in different categories consuming the local OCMovies API (https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)

The project was designed for the specific needs of the project 6 in Openclassrooms' track "Python App Developper"

## Installation

Download the repository on your computer.

Run npm install to install depedencies
```
npm install
```

Install the API OCMovies by following the steps specified in this repo:
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR


## See the website

First, setup and run the server:

```
# go to the API folder

cd api

# Create a virtual environment

python3 -m venv env

# Activate the virtual environment

source env/bin/activate

# Install the requirements

pip install -r requirements.txt

# Install the database

python manage.py create_db

# Run the server

python3 manage.py runserver
```

Simply open the main.html page.

click on a movie to see more about it.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
Name: Tom Gauthier
Github: https://github.com/tomgauth
