# Marko

MarkLogic's personal assistant.

This site uses voice recognition to search through your contacts database. Just click the mic button and tell a command, Marko will be happy to help you with it. You can just try and say: 'Hi Marko, how are you?'. 
This site has been tested only in Chrome. 

### Installation

The application uses NodeJs and Marklogic. So both are required to run Marko. Once installed you can follow these commands to download and compile the code, create the database and run Marko: 

```
git clone git@github.com:garraspin/marko.git
cd marko
npm install
cd db
node setup.js && node load.js
cd .. && npm start
```

The data has been created using mockaroo.com