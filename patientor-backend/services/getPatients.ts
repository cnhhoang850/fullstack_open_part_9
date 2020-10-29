import patientEntries from '../data/patients';
import {nonSensitivePatientEntry, PatientEntry} from '../types/patient';

const patientData: Array<PatientEntry> = patientEntries;

const getPatientEntries = (): Array<PatientEntry> => {
  return patientData;
};

const getNonSensitivePatientEntries = (): Array<nonSensitivePatientEntry> => {
  return patientData.map(({id, name, dateOfBirth,gender, occupation}) => ({
    id, 
    name,
    gender,
    occupation,
    dateOfBirth,
  }));
};

const addPatientEntry = (): any => {
  return;
};

export default {
  getPatientEntries,
  addPatientEntry,
  getNonSensitivePatientEntries,
}