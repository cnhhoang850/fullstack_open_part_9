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

const getPatientById = (id: string): PatientEntry | undefined => {
  const patientEntry = patientData.find(entry => entry.id === id);
  return patientEntry;
};

const addPatientEntry = (object: PatientEntry): PatientEntry => {
  const newPatientEntry = object;
  patientEntries.push(newPatientEntry);
  return newPatientEntry; 
};

export default {
  getPatientEntries,
  addPatientEntry,
  getNonSensitivePatientEntries,
  getPatientById,
}