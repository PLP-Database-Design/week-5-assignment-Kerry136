// Import necessary dependencies/packages
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables to the application
dotenv.config();

// Initialize the server
const app = express();

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test db connection
db.connect((err)=>{
    if(err){
        return console.log('Error connecting to the database', err);
    }
    console.log('Database connected successfully!');
});

// route for getting patients question one 
app.get('/patients', (req, res)=>{
    // define the SQL query
const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
db.query(getPatients, (err, result)=>{
    if(err){
        return res.send('Error in fetching patients');
    }
    res.send(result);
});
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = `SELECT * FROM providers`;
  
    db.query(getProviders, (err, results) => {
      if (err) {
        return res.send('error in fetching providers ');
      }
      res.send(results);
    });
  });

  // Question 3: Filter patients by first name
  app.get('/get-firstnamepatients', (req, res) => {
    const getPatientsByFirstName = "SELECT first_name FROM patients";

    db.query(getPatientsByFirstName, (err, data) => {
        if (err) {
            return res.status(400).send('Failed to get patients', err);
        }
        res.status(200).send(data);
    });
});
  // Question 4: Retrieve providers by specialty
  app.get('/providers-specialty', (req, res) => {
    const getProvidersBySpecialty = "SELECT provider_specialty FROM providers";

    db.query(getProvidersBySpecialty, (err, data) => {
        if (err) {
            return res.status(400).send('Failed to get providers', err);
        }
        res.status(200).send(data);
    });
});
    


//Start the server
const port = process.env.PORT || 3300;
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

