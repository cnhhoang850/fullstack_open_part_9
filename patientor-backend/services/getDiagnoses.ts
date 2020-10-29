import diagnosisEntries from '../data/diagnoses';
import {DiagnosisEntry} from '../types/diagnosis';

const diagnosisData: Array<DiagnosisEntry> = diagnosisEntries;

const getDiagnosisEntries = (): Array<DiagnosisEntry> => {
  return diagnosisData;
};

const addDiagnosis = (): any => {
  return;
};

export default {
  getDiagnosisEntries,
  addDiagnosis,
}