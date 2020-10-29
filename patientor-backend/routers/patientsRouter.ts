import express from 'express';
import patientService from '../services/getPatients';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

patientsRouter.post('/', (_req, res) => {
  res.send('sending patientEntry');
});

export default patientsRouter;
