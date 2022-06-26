# Code Snippet Storage 📘

As the name suggests this is an app to store code snippets. 

This is the first electron/nodejs project that I've made. I created this app so I could quickly save code snippets and have them stored in an easy to access location.

![image](https://user-images.githubusercontent.com/2316269/175801359-1c48888d-1845-474c-a6b5-040197e1f622.png)


## Getting started

To install the app simply follow the instructions below:
 
#### Starting the application
  1. `git clone https://github.com/andrew-waite/code-snippet-storage.git`
  2. `npm i`
  3. `npm run start-app`

This will launch the electron app.
 
## Features
- Create new files using the 'New File' button
- Rename files in the file explorer by right clicking and then clicking rename in the context menu
  ![image](https://user-images.githubusercontent.com/2316269/175801336-0f11b3db-c543-4ec6-815f-e57319a0d80d.png)
- Save files to disk using the save file button

## Planned Features

- Improve the file explorer window by showing files in folders in a cascading view
- Support for creating and exploring folders through the file explorer

## Tech Specs

- The app is made using Angular 13, NodeJS, Electron 18, the Monaco Editor, and Bootstrap 5.
- The folder that is used to save and read files is <your user home directory>/Documents/code-snippet-storage.
- I chose the monaco editor for it's functionality and readability in formatting code snippets.  
