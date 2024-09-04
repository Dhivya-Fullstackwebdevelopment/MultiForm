const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS

const app = express();
const port = 3002;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'applicant_db' // The database you created
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('/submit', (req, res) => {
  const data = req.body;

  const sql = `INSERT INTO applicant_details 
    (applicantName, dob, age, phoneNo, aadharNo, anotherIdentity, anotherIdentityLabel, voterId, residenceType, stayingYears, stayingMonths, ebNo, familyCardNo, rationShopNo, 
    permanentDoorNo, permanentStreetNo, permanentPanchayat, permanentTaluk, permanentDistrict, permanentPincode, permanentState, permanentCountry, 
    currentDoorNo, currentStreetNo, currentPanchayat, currentTaluk, currentDistrict, currentPincode, currentState, currentCountry, gender) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
      data.applicantName, data.dob, data.age, data.phoneNo, data.aadharNo, data.anotherIdentity, data.anotherIdentityLabel, data.voterId,
      data.residenceType, data.stayingYears, data.stayingMonths, data.ebNo, data.familyCardNo, data.rationShopNo,
      data.permanentAddress.doorNo, data.permanentAddress.streetNo, data.permanentAddress.panchayat, data.permanentAddress.taluk, data.permanentAddress.district,
      data.permanentAddress.pincode, data.permanentAddress.state, data.permanentAddress.country,
      data.currentAddress.doorNo, data.currentAddress.streetNo, data.currentAddress.panchayat, data.currentAddress.taluk, data.currentAddress.district,
      data.currentAddress.pincode, data.currentAddress.state, data.currentAddress.country, data.gender
  ];

  db.query(sql, values, (err, result) => {
      if (err) {
          res.status(500).send('Error occurred while saving data.');
          throw err;
      }
      res.send('Applicant details saved successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
