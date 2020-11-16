import {PatientEntry, Gender, Entry } from '../types/patient';

const toNewPatientEntry = (object: any): PatientEntry => {
  const newEntry: PatientEntry = {
    id: parseEntry(object.id),
    name: parseEntry(object.name),
    dateOfBirth: parseEntry(object.dateOfBirth),
    ssn: parseEntry(object.ssn),
    gender: parseGender(object.gender) as Gender, //unsafe explicait typing!!!
    occupation: parseEntry(object.occupation),
    entries: object.entries? parseEntries(object.entries) : [],
  };
  return newEntry;
}

const isString = (entry: any): entry is string => {
  return typeof entry === 'string' || entry instanceof String;
};

const isGender = (entry: any): entry is Gender => {
  return Object.values(Gender).includes(entry);
}

const parseEntries = (entries: []): Entry[] => {
  return entries
}

const parseEntry = (entry: any): string => {
  //type eval
  if (!entry || !isString(entry)) {
    throw new Error('Incorrect string only format: ' + entry);
  };

  return entry;
};

const parseGender = (gender: any): string => {
  if (!gender || !isGender(gender))  {
    throw new Error('Incorrect gender value: ' + gender);
  };

  return gender;
};

export default toNewPatientEntry;