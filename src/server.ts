
import 'dotenv/config';

const express = require("express");

require("dotenv").config();



const app = express();
const port = process.env.PORT;
app.use(express.json());
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀Server is running on http://localhost:${port}`);
});





