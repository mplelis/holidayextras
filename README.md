

# Holidayextras user API
### Author : Mihalis Plelis
### Version : 1.0.0
### Production URL in Heroku: https://pacific-inlet-33187.herokuapp.com/
### Production URL in AWS : http://ec2-34-207-69-160.compute-1.amazonaws.com/

This Node JS application keeps track of users and persists them in a MongoDB database.  
It is deployed in production using Heroku and it can be accessed via this <a href="https://pacific-inlet-33187.herokuapp.com/">Heroku URL</a>.  
It is also deployed in AWS and it can be accessed via this <a href="http://ec2-34-207-69-160.compute-1.amazonaws.com/">AWS URL</a>.

### Functionality Description

* Users can be inserted into the database. Below, the request body is shown as well as the resources of the application.  
		
* The API exposes operations for  
	- Creation of a user.  
	- Returning a list of all users or a single user.  
	- Updating a user.  
	- Deleting a user.  

### Getting Started with the Node JS application
* Make sure you have installed Node and NPM from https://nodejs.org/en/ before moving forward.  
* Also Docker has to be installed in order to keep the MongoDB container for the development and testing environments.  
  Otherwise, the databases will have to be created manually, and the database configuration will have to be updated within the project.
  The database configuration file, is kept under */config/database.js*.  

### Running the Holidayextras user API locally

1. Navigate in the project's folder, and type the following command which will install all dependencies and modules.  
    *npm install*  

2. Now navigate in the */stubs* directory of the project, and type the command **docker compose up -d**.  
   This command will download, build and start the database container.   
   If docker is not available, then the database instance will have to be created manually using MongoDB and the config will have to be updated.
   The database configuration file, is kept under */config/database.js*.  

3. Now, you should be able to run the application with the command, **npm run dev** and also unit test it with the command, *npm test*.  
   The server is running on port 5555 on localhost by default. Example URL : *http://localhost:5555/users/*
   This application was tested on Windows, so please make sure that you are using the correct URL on Mac/Linux and also make sure to  
   use the correct path for the docker container as well in order to use the database. In case the parameters are different,  
   please make sure to update them in the */config/database.js* file.

4. Congratulations! Now you should be able to send HTTP requests to the API.

### Exposed endpoints

*	The following resources have been registered which can be accessed on the URL *http://localhost:5555/users/*:

	- POST    http://localhost:5555/users/ -> (creates a new user)  
	- GET     http://localhost:5555/users/ -> (returns a list with all the persisted users)  
	- GET     http://localhost:5555/users/{userId} -> (returns a single user using his ID)  
	- PUT     http://localhost:5555/users/{userId} -> (updates the user using his ID and a JSON body)  
	- DELETE  http://localhost:5555/users/{userId} -> (deletes a user using his ID)  
    
    Those resources can be accessed by the application Postman. It can be downloaded at https://www.getpostman.com/  
    - Two Postman collections have been attached to this project. They can be found under the path */scripts/*  
    - There is one script for the development environment and one for the production environment.  
    - After Postman has been installed, please select the option to import a collection.  
    - Then you can navigate to the path */scripts/* and import the two files.  
    - Now you should be able to fire requests against the API either locally or in production!  

### How the body of the resources should be

Inside the Postman collections, all the requests with their bodies can be found.  
The GET, PUT and DELETE requests are using the user ID in the URL.  
The POST and PUT requests are using a body which is actually the same.  

* Example  
```json
{
	"email": "test@test.com",
	"forename" : "TestForename",
	"surname" : "TestSurname"
}
```

### Notes

- 	When the requests contain malformed JSON input or wrong values, the relevant validation errors will be returned.  
