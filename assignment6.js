const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

// Middleware for JSON parsing
app.use(express.json());

// Serve static files using absolute paths
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/img")));

// Route: Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "app", "html", "index.html"));
});

// Route: Movies data (JSON)
app.get("/movies", (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, "app", "data", "movies.json"), "utf8");
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    } catch (error) {
        console.error("Error reading movies.json:", error);
        res.status(500).send({ error: "Failed to load movies data." });
    }
});

// Route: Coming soon page (HTML)
app.get("/comingsoon", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "app", "data", "comingsoon.html"));
    } catch (error) {
        console.error("Error reading comingsoon.html:", error);
        res.status(500).send("Failed to load coming soon page.");
    }
});

// Route: User records from MySQL database
app.get("/user-records", async (req, res) => {
    const userName = req.query.userName;
    if (!userName) {
        return res.status(400).send("Missing userName query parameter.");
    }
    try {
        const table = await connectToMySQL(userName);
        res.send(table);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Failed to retrieve user records.");
    }
});

// Function: Connect to MySQL and retrieve user records
async function connectToMySQL(userName) {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6",
        multipleStatements: true
    });

    try {
        const [rows] = await connection.execute(
            `SELECT 
                database1_user.user_name, 
                database1_user_timeline.post_date, 
                database1_user_timeline.post_time, 
                database1_user_timeline.post_text, 
                database1_user_timeline.views 
             FROM 
                database1_user_timeline 
             INNER JOIN 
                database1_user 
             ON 
                database1_timeline.user_id = database1_user.ID 
             WHERE 
                database1.user_name = ?`,
            [userName]
        );

        let table = `<table id='records'>
            <tr>
                <th>User Name</th>
                <th>Post Date</th>
                <th>Post Time</th>
                <th>Movie Review</th>
                <th>Views</th>
            </tr>`;

        rows.forEach(row => {
            table += "<tr>";
            for (const property in row) {
                let value = row[property];
                if (property === "post_date" && value instanceof Date) {
                    value = value.toLocaleDateString("en-CA");
                }
                table += `<td>${value}</td>`;
            }
            table += "</tr>";
        });

        table += "</table>";
        return table;
    } finally {
        await connection.end();
    }
}

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
