// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/unitConverter', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Conversion schema and model
// const conversionSchema = new mongoose.Schema({
//   inputValue: Number,
//   fromUnit: String,
//   toUnit: String,
//   result: Number,
// });

// const Conversion = mongoose.model('Conversion', conversionSchema);

// // POST: Save a new conversion to the history
// app.post('/api/conversions', async (req, res) => {
//   try {
//     const newConversion = new Conversion(req.body);
//     await newConversion.save();
//     res.status(201).send(newConversion);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // GET: Fetch conversion history
// app.get('/api/conversions', async (req, res) => {
//   try {
//     const conversions = await Conversion.find();
//     res.status(200).send(conversions);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // DELETE: Delete a conversion
// app.delete('/api/conversions/:id', async (req, res) => {
//   try {
//     const conversion = await Conversion.findByIdAndDelete(req.params.id);
//     res.status(200).send(conversion);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
