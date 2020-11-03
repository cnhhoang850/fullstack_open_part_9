import patientEntries from '../data/patients';
import { PatientEntry, PublicPatient} from '../types/patient';

const patientData: Array<PatientEntry> = patientEntries;

const getPatientEntries = (): Array<PatientEntry> => {
  return patientData;
};

const getNonSensitivePatientEntries = (): Array<PublicPatient> => {
  return patientData.map(({id, name, dateOfBirth,gender, occupation}) => ({
    id, 
    name,
    gender,
    occupation,
    dateOfBirth,
  }));
};

const getPatientById = (id: string): PatientEntry  => {
  const patientEntry = patientData.find(entry => entry.id === id);
  if (patientEntry === undefined) {
    throw new Error("Didn't find any patient matching the same ID")
  } else {
    return patientEntry;
  }
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