import express from 'express';
import patientService from '../services/getPatients';
import toNewPatientEntry from '../utils/toNewPatientEntry';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientById(id));
});

patientsRouter.post('/', (req, res) => {
  const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const id = "random id" //dummy id generator
  try {
    const newPatientEntry = toNewPatientEntry({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    });

    const addedEntry = patientService.addPatientEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default patientsRouter;
