const asyncHandler = require('express-async-handler');
const Prescription = require('../models/Prescription');

const createPrescription = asyncHandler(async (req, res) => {
  const { patientName, patientAge, medications, notes } = req.body;

  if (!patientName || patientAge === undefined || !Array.isArray(medications) || medications.length === 0) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const prescription = new Prescription({
    user: req.user._id,
    patientName,
    patientAge,
    medications,
    notes,
  });

  const createdPrescription = await prescription.save();
  return res.status(201).json(createdPrescription);
});

const listPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ user: req.user._id });
  return res.json(prescriptions);
});

module.exports = {
  createPrescription,
  listPrescriptions,
};
