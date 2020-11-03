import express from 'express';
import patientService from '../services/getPatients';
import toNewPatientEntry from '../utils/toNewPatientEntry';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patientToSend = patientService.getPatientById(id);
    patientToSend.entries = patientToSend.entries ? patientToSend.entries : [];

    res.status(200).json(patientToSend);
  } catch (e) {
    res.status(400).send(e.message)
  }
});

patientsRouter.post('/', (req, res) => {
  const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const entries = req.body.entries? req.body.entries : [];
  const id = "random id" //dummy id generator
  try {
    const newPatientEntry = toNewPatientEntry({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
    });

    const addedEntry = patientService.addPatientEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default patientsRouter;
