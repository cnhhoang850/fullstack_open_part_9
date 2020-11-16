import diagnosisEntries from '../data/diagnoses';
import {DiagnosisEntry} from '../types/diagnosis';
// service should only include business loggic only
// no auth, no validation
// no proofing
// ONLY BUSINESS LOGIC!!!
const diagnosisData: Array<DiagnosisEntry> = diagnosisEntries;

const getDiagnosisEntries = (): Array<DiagnosisEntry> => {
  return diagnosisData;
};

const addDiagnosis = (object: DiagnosisEntry): DiagnosisEntry => {
    const newDiagnosisEntry = object;
    diagnosisEntries.push(newDiagnosisEntry);
    return newDiagnosisEntry;
};


export default {
  getDiagnosisEntries,
  addDiagnosis,
};