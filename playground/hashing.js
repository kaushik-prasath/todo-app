const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id:28
};


var token = jwt.sign(data,'bollocksbee');
console.log(token);

var decoded = jwt.verify(token,'bollocksbee');
console.log(decoded);







// var message = 'Iam user kaushik';
// var hash = SHA256(message);

// // console.log(`Message:${message}`);
// // console.log(`Hash:${hash}`);


// var data = {
//     id:18
// };

// var token ={
//     data,
//     hash:SHA256(JSON.stringify(data)+'kaushik123').toString()
// };


// // token.data.id = 25;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data)+'kaushik123').toString();

// if(token.hash === resultHash){
//     console.log('Data was not changed.Trust the user');
// }else{
//     console.log('Data was changed.Do not trust the user');
// }