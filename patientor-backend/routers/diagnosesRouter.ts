import express from 'express';
import diagnosisService from '../services/getDiagnoses';
const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnosisEntries());
});

diagnosesRouter.post('/', (_req, res) => {
  res.send('saving new diagnosisEntry');
});

export default diagnosesRouter;