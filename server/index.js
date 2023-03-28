const express = require("express");
const cors = require("cors");
const compounds = require("./componds");
const PORT = 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', compounds);

app.use(function(err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.")
});

app.listen(PORT, ()=>{
    console.log('server running on port ', PORT)
})


