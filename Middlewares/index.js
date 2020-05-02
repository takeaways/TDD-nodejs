const express = require("express");
const morgan = require("morgan");

module.exports = (app, ENV) => {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));


    if(ENV!== "test"){
        app.use(morgan(ENV === "dev" ? "dev" : "combined"));
    }

};
