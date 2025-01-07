// this file handle backend datas

const express = require('express');
const cors = require('cors'); // midleware to allow cross-origin requests

const app = express();
app.use(cors()); // activates cors for all routes

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
]; // list of states

app.get('/states', (req, res) => {
    res.json(states);
    // api route to get states!!!
});

//start the server at port
app.listen(5000, () => {
    console.log('Server started at http://localhost:5000/states');
}); // start the server at port 5000

// now testing the backend

// need to initiate backend

// backend good