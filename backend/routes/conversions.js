// const express = require('express');
// const Conversion = require('../models/conversion');
// const router = express.Router();

// // POST: Save a new conversion
// router.post('/', async (req, res) => {
//   try {
//     const newConversion = new Conversion(req.body);
//     await newConversion.save();
//     res.status(201).send(newConversion);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // GET: Fetch conversion history
// router.get('/', async (req, res) => {
//   try {
//     const conversions = await Conversion.find();
//     res.status(200).send(conversions);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // DELETE: Delete a conversion
// router.delete('/:id', async (req, res) => {
//   try {
//     const conversion = await Conversion.findByIdAndDelete(req.params.id);
//     res.status(200).send(conversion);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// module.exports = router;
