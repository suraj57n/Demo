const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = 5001;

// Middlewares
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON requests

// Endpoint to save drones data
app.post('/save-drones', (req, res) => {
    const data = req.body;

    // Make sure to validate your data here!
const dronePath = path.resolve(__dirname, '../public/Drone.json');


    // Save the data to Drone.js
    fs.writeFile(dronePath, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        res.json({ success: true, message: 'Data saved successfully' });
    });
});

app.post('/save-markers', (req, res) => {
    const data = req.body;

    // Make sure to validate your data here!
const dronePath = path.resolve(__dirname, '../public/Drone1.json');


    // Save the data to Drone.js
    fs.writeFile(dronePath, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        res.json({ success: true, message: 'Data saved successfully' });
})});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
