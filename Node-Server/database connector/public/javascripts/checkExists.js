const express = require('express')
const app = express();

const checkExists = function (req, res, next){
    if (req == 'test'){
        console.log("success!")
    }
}

module.exports = {checkExists}