# node-passwordGen

This project is a commandline tool created in nodejs that generates a password.
The user gets asked for length and the type of characters they want.
Afte teh selection the a newly generated passwrod is creaeted and saved to passwords.txt.

## Technology Used

This project was created fully in typescript.
The project utlizes fs, chalk, and inquirer to run this app.
There are two objects used: GenPassword and App

### GenPassword

This object simply takes the selection data from inquirer and creates the password.

### App

This object does the runs the app. Calling the needed functions and creating the instance of GenPasswrod.
