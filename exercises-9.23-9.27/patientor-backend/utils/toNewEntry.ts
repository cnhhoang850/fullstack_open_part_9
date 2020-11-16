import {Entry} from '../types/patient';
import {DiagnosisEntry} from '../types/diagnosis';

const toNewEntry = (object: any): Entry => {
  switch(object.type) {
    case "HealthCheck":
      const newHealthEntry: Entry = {
        id: parseEntry(object.id),
        description: parseEntry(object.description),
        date: parseDate(object.date),
        diagnosisCodes: object.diagnosisCodes? parseDiagnosisCodes(object.diagnosisCodes) : [],
        type: "HealthCheck",
        healthCheckRating: object.healthCheckRating as number,
      };
      return newHealthEntry;
    case "OccupationalHealthCare":
      const newOccupationalEntry: Entry = {
        id: parseEntry(object.id),
        description: parseEntry(object.description),
        date: parseDate(object.date),
        diagnosisCodes: object.diagnosisCodes? parseDiagnosisCodes(object.diagnosisCodes) : [],
        type: "OccupationalHealthCare",
        specialist: parseEntry(object.specialist),
        employerName: parseEntry(object.employerName),
        sickLeave: object.sickLeave as {startDate: string, endDate: string},
      };
      return newOccupationalEntry;
    case "Hospital":
      const newHospitalEntry: Entry = {
        id: parseEntry(object.id),
        description: parseEntry(object.description),
        date: parseDate(object.date),
        diagnosisCodes: object.diagnosisCodes? parseDiagnosisCodes(object.diagnosisCodes) : [],
        type: "Hospital",
        specialist: parseEntry(object.specialist),
        discharge: object.discharge as {date: string, criteria: string},
      };
      return newHospitalEntry;
    default: 
      throw new Error('Object received is not a type!')
  }
}

const isString = (entry: any): entry is string => {
  return typeof entry === 'string' || entry instanceof String;
};

const isDiagnosisCodes = (entry: any): entry is Array<DiagnosisEntry['code']> => {
  return entry instanceof Array;
}

const parseDiagnosisCodes = (entry: any): Array<DiagnosisEntry['code']> => {
  if (!entry || !isDiagnosisCodes(entry)) {
    throw new Error('Incorrect diagnosis codes only format: ' + entry);
  };

  return entry;
};

const parseDate = (entry: any): string => {
  const regex = /\d\d[-]\d\d[-]\d\d/g;
  const day = Number(entry.slice(0,2))
  const month = Number(entry.slice(3,5))
  const found = entry.match(regex)
  if (!entry || !found ) {
    throw new Error('Inccorect date format: ' + entry)
  };
  if (entry.length > 8) {
    throw new Error('Inccorect date format: ' + entry) 
  };
  console.log(day,month)
  if (!day || !month || month > 12) {
    throw new Error('There are only 12 months: ' + entry)
  } 
  return entry;
}

const parseEntry = (entry: any):string => {
  if (!entry || !isString(entry)) {
    throw new Error('Incorrect string onnly format: ' + entry);
  };

  return entry;
};

export default toNewEntry;

