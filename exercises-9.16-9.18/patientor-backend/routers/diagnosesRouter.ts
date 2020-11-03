import express from 'express';
import diagnosisService from '../services/getDiagnoses';
import toNewDiagnosisEntry from '../utils/toNewDiagnosis';
const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnosisEntries());
});

diagnosesRouter.post('/', (req, res) => {
  const {code, name, latin} = req.body;
  try {
    const newDiagnosisEntry = toNewDiagnosisEntry({
      code,
      name,
      latin: latin ? latin : undefined,
    });

    const addedEntry = diagnosisService.addDiagnosis(newDiagnosisEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


export default diagnosesRouter;