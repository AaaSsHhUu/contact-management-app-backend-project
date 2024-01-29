const mongoose = require("mongoose");

const connectdb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            connect.connection.host, // host -> location/address of the current server where database is runnng
            connect.connection.name
        );
    }
    catch(err){
        console.log(err);;
        process.exit(1); 
    }
}

module.exports = connectdb;

// PROCESS => In Node.js, the process object is a global object that provides information and control over the current Node.js process. It represents the running instance of the Node.js application and provides various properties and methods to interact with the environment in which the Node.js process is running.

// The process.exit() method in Node.js is used to forcefully terminate the Node.js process. The argument passed to process.exit() is used as the exit code for the process. The exit code indicates the reason for the process termination, and it can be used by other programs or scripts that are interacting with the Node.js process.

// ------------------ COMMON EXIT CODES ---------------------

// 0: Success/Normal termination. It indicates that the program or script completed successfully.

// 1: General error. It is often used to indicate that the program encountered an error.

// 2: Misuse of shell built-ins. It may indicate an issue with the usage of a shell command or built-in functionality.

// 3: Command not found. It can be used to indicate that a specified command or program could not be found.

// 4: Incorrect command line arguments. It is often used to indicate that the program was called with incorrect or invalid command line arguments.