const express = require('express'); 
const app = express();

// load your loggin module before you load other modules to catch all errors from other modules 
require('./on_startup/logging'); 

const port = process.env.PORT || 3344; 
app.listen(port, console.log(`listeing on port ${port}`)); 