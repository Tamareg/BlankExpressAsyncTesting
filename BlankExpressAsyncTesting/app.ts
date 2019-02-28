//cd C:\Development\JavaScript\BlankExpressAsyncTesting\BlankExpressAsyncTesting
//node app.js
//localhost:3000
//nodemon server.js
//nodemon app.js -e js,nbs

const mylib = require('./mylib_express.ts');


console.log('Starting Express Async');
mylib.myCallBacks();


console.log('Finishing Express Async');

