const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // To handle CORS issues

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO form_submissions (name, email, message) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;
        console.log('Form data inserted:', result);
        res.status(200).send('Form submission successful');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
