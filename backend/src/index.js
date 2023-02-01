const mongoose = require('mongoose');
const app = require("./app");
const config = require('./config/config');


const DB_URL = `${config.mongoose.url}/xflix`

mongoose
.connect(DB_URL)
.then(()=> { console.log("its connected to db", DB_URL)})
.catch((err)=>{console.log(err)});

app.listen(config.port, () => {
    console.log(`Server has started to listen on ${config.port} ...`)
})