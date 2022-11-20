# Accord

Accord is a fullstack web application modeled after the popular chat app, Discord. Signed up users have the ability to join communities or create their own community and chat through live messaging.

Visit live site here :https://accord-lynn.onrender.com/

This is a group project that I continued to work on individually. 
You can find the earlier version here: https://github.com/kevin9gao/accord-flask-react-project


## Technologies Used
* **Languages:** Javascript, Python, HTML/CSS
* **Backend:** Flask
* **Frontend:** React, Redux
* **Database:** PostgreSQL
* **Hosting:** Render
* **Real-time Communication:** Socket.io


## How to Start the Development Environment
1. Clone this repository
    git clone https://github.com/kevin9gao/accord-flask-react-project.git
2. Install dependencies
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a **.env** file based on the example with the proper settings for your development environment
4. Setup your PostgresSQL user,password, and database and make sure it matches with your **.env** file
5. Enter your environment, migrate your database, seed your database, and run your flask app
    * pipenv shell
    * flask db upgrade
    * flask seed all
    * flask run
6. Go into your react app directory and install dependencies and run the app
    * npm install
    * npm start
7. Open your browser and go to the localhost address your are running the app in

## Features
# Servers
As a signed in user, one can access servers that the user is apart of, as well as being able to join other serversvia Discover page.  The signed in user has the capability to create servers if so desired, thereofre, that user becomes the owner of said server which enables the ability to edit and delete that specific server.  Servers can be found on the very left navigation bar, and he/she can create a server by clicking the "+" icon, which will have a form pop up to the user.  The user can edit and delete the created server by clicking the drop-down menu next to the server's name at the top of the following navigation bar.


# Channels
As a signed in user, one can access the channels in a unique server.  If the user is the owner of the server, the user is able to create, edit, and delete channels within said server.  Channels can be found in the second-left navigation bar after the user has clicked on which server he/she wants to view.  The user can then click on the settings icon (cog wheel) and can choose to edit/delete that specific channel once the Edit Channel form pops up.


# Live Chat
A signed in user can view and create messages in specific channels.  This feature also allows users to see the chat history.

# Direct Messaging via Private Servers
A signed in user can view other users and create direct messages.  This feature also allows users to see the chat history.


## Future Features to Implement
* Friends
* Video Chat
* Audio Chat
* Threads
* Live Streaming
* Server Roles

## Technical Implementation Details
Accord brought many challenges to the team, primarily implementing web sockets.  Web sockets proved to be the most diffcult task placed upon the team because there was not any prior instruction on how to implement this task.  Through constant research and attempts of implementing web sockets, the team was able to implement the web sockets and can be viewed through Direct Messages via Private Servers and Live Chat.  
