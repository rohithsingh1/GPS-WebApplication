GPS Full-Stack Application(with unit-testing at FrontEnd and BackEnd)

Description

1)It is a full-Stack Application that lists the latest GPS data of every Device with the interval of 5 minutes. 2)We can search the GPS data by providing DeviceId or DeviceType or by DeviceLocation. 3)We can sort the GPS data by DeviceID or DeviceType or by Location. 4)We can Add custom GPS data 5)In order to perform above functionality or to access the lists of latest GPS data of every Device , we need a user because we are using JSON WebToken as authentication to Authenticate the user before accessing the API calls. 6)A user has to be created from registration page 7)A user has to be logged, In order to perform above functionality or to access the lists of latest GPS data of every Device.

Requirements (Prerequisites) Tools and packages required to successfully install this project. For example: . NodeJS and NPM . mysql database

Installation A step by step list of commands / guide that informs how to install an instance of this project.

step-1 you can clone the repo or you can download the zip file and unzip the zip file.

step-2 move into that folder

step-3 download the dependencies that are required for your project to run npm install

step-4 Once you have downloaded the dependencies , you can start your server by npm start

That runs on port no 5000

step-5 In order to start your react application cd client npm install npm start

now your react application starts and runs on port no 3000

open your browser and paste below url

http://localhost:3000/register

In order to run the unit test in react

cd client npm install npm run test or ### npm test

In order to run the unit test in nodejs

npm install npm test or ### npm run test

Screenshots
![Screenshot (930)](https://user-images.githubusercontent.com/46070911/217729122-473c903a-68c8-4000-80fb-8cc48fd007ea.png)
![Screenshot (934)](https://user-images.githubusercontent.com/46070911/217729140-7d16f83d-ed91-4755-9436-e8b76e5acfee.png)
![Screenshot (967)](https://user-images.githubusercontent.com/46070911/217729175-5e10e492-70ba-4d67-81f2-ac8066228dc0.png)
![Screenshot (968)](https://user-images.githubusercontent.com/46070911/217729185-d1b79283-b899-425e-9de2-0f1e88928eb6.png)
