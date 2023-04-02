console.log('JWT Test');
require('dotenv').config()

let jwtSecret = process.env.TOKEN_SECRET;
console.log('jwtSecret: ' + jwtSecret);