console.log("------------------------------");
console.log("Game_FPS > server.js ");
console.log("------------------------------");

//-------------------------
//imports
//-------------------------
const app = require('./backend/app');


//-------------------------
//configurations
//-------------------------
const hostname = 'localhost';
const port = 5432;




//-------------------------
//main
//-------------------------

//start listening for requests
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});