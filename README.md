# Code Review Automation <img style="width: 40px;" src="https://github.com/sammsts/Code-Review-Automation/assets/100657343/0609c938-ec14-4303-987b-b81e09031349" />

> Status: Developed ✅

<div>
  <img src="https://github.com/sammsts/Code-Review-Automation/assets/100657343/a7a80afc-795b-42cd-a61d-a3d45de08318" width="48%" /> 
  <img src="https://github.com/sammsts/Code-Review-Automation/assets/100657343/ddda6877-a872-49c3-93f2-0c17084069f4" width="48%" />
</div>


## A web application developed in React.Js, to assist in the code review of commits from a repository.

## Resume:

The web application was developed by me and collaborator [augustojwerke](https://github.com/augustowjerke). It is possible to filter the grid records by period, repository and developer. You can view the commit details and also generate a report.
This application has a server, user authentication (login), connection to a database (postgreSQL), and integrates with the github API.
The server was deployed on the website https://squarecloud.app/, and the interface was deployed on the website https://app.netlify.com/.

## functionalities:

+ Filter by:
   + Period
   + Repository
   + Developer
+ View commit details
+ View commit additions/removals (in each committed file)
+ Generate report
+ Dark mode

## Technologies Used:

| Technology           | description                                                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| React 18.2.0         | React is a widely used JavaScript library for creating interactive user interfaces and reusable components.                 |
| Node.js 18.16.0      | Node.js is an open-source runtime environment that allows you to execute JavaScript code on the server side. It is designed to be efficient and scalable, making it suitable for developing network and server applications. |
| Axios                | Axios is a JavaScript library that makes it easy to send HTTP requests to servers. It is often used to make requests to REST APIs and to manipulate data.   |
| Express              | Express.js is a framework for Node.js web applications. It simplifies the process of creating web servers and APIs. It is fast, flexible, and widely used for developing Node.js-based web applications. |
| Babel                | Babel is a JavaScript compiler that allows developers to write modern JavaScript code and convert it to an older version that is compatible with most browsers. This is useful for ensuring that JavaScript code works in older browsers. |
| Sequelize 6.33.0     | Sequelize is a JavaScript library that is an Object-Relational Mapping (ORM) for relational databases, including PostgreSQL. It simplifies the interaction with databases and allows you to work with them as JavaScript objects. |
| HTML5                | HTML5 is the markup language that structures the page content.                                                               |
| CSS3                 | CSS3 is the styling language that defines the layout and visual presentation of the application.                               |
| API GitHub           | The GitHub REST API is a powerful tool that allows you to create integrations, retrieve data, and automate your workflows. You can use it to build custom tooling that interacts with your server and a third-party app. |


## How to run the application

1) Access the code-review-back folder and execute the command "npm run start", now the server is running and connected to the database that is hosted for free on the website https://www.elephantsql.com/.
2) Access the code-rewiew-api folder and execute the same command "npm run start", a question regarding the ports will appear in the terminal, you must accept. Okay, now the interface is running, just access localhost and view it.

https://github.com/sammsts/Code-Review-Automation/assets/100657343/265dbda7-4d07-4e76-9ac7-d4140e409046
