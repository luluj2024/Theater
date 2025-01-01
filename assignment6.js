const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function(req,res){
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/movies", function(req, res){
    res.setHeader("Content-Type", "application/json");
    res.send(fs.readFileSync("./app/data/movies.json", "utf8"));
    
});

app.get("/comingsoon",function(req,res){
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./app/data/comingsoon.html", "utf8"));
});

app.get("/user-records", function (req, res) {
    const userName = req.query.userName;
    connectToMySQL(res, userName);
});

async function connectToMySQL(res, usr){
    const mysql = require('mysql2/promise');
    const connnection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6",
        multipleStatements: true
    });

    connnection.connect();

    const [rows, fields] = await connnection.execute("SELECT A01409982_user.user_name, A01409982_user_timeline.post_date, A01409982_user_timeline.post_time, A01409982_user_timeline.post_text, A01409982_user_timeline.views FROM A01409982_user_timeline INNER JOIN A01409982_user ON A01409982_user_timeline.user_id = A01409982_user.ID AND A01409982_user.user_name = ?", [usr]);
    let table = "<table id='records'><tr><th>User name</th><th>Post Date</th><th>Post Time</th><th>Movie Review</th><th>Views</th></tr>";
    for (let i = 0; i < rows.length; i++){
        table += "<tr>";
        for (const property in rows[i]) {
            let value = rows[i][property];
            if (property == "post_date" && value instanceof Date){
                value = value.toLocaleDateString("en-CA");
            }
            table += `<td>${value}</td>`;         
        }
        table += "</tr>";

    }

    table += "</table>";
    await connnection.end();
    res.send(table);
};


let port = 8000;
app.listen(port, function() {
    console.log("Listening on port " + port + "!");
});
