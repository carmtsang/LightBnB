# LightBnB

LightBnB is a project created by [Carmen](https://github.com/carmtsang) for Lighthouse Labs focused on the database. Back-end queries are used to allow users to search for accomodations in an online travel app. The prject conntects to a PostgreSQL database using Node's postgres library.


## Final Product
![Sign Up Screen](https://github.com/carmtsang/LightBnB/blob/main/docs/signup.png)
Sign up to create a new account.
![Log in view](https://github.com/carmtsang/LightBnB/blob/main/docs/login.png)
Log in to your account. 
![Logged In](https://github.com/carmtsang/LightBnB/blob/main/docs/logged_in.png)
View when logged in.
![new listing](https://github.com/carmtsang/LightBnB/blob/main/docs/create.png)
Create a new listing.

## Getting Started
1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command in the LightBnB_WebApp folder. The app will be served at <http://localhost:3000/>.
3. Go To <http://localhost:3000/> in your browser. 


## Project Structure

* `01_queries` contains some sql queries for the database.
* `LightBnB_WebApp` See below.
* `migrations` sql file to create the tables for the database
* `seeds` sql seed files that for the database.
* `docs` screen shots of web app.

## Dependencies
- bcrypt
- bodyparser
- cookie-session
- nodemon
- pg