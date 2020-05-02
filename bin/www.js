const app = require("../app");
const dbSync = require("./db");

dbSync().then(()=>{
    console.log('Sync Database..');
    app.listen(7000, ()=>{
        console.log("server start port 7000");
    });
});



