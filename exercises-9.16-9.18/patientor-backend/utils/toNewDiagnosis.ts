import {DiagnosisEntry} from '../types/diagnosis';

const toNewDiagnosisEntry = (object: any): DiagnosisEntry => {
  const newEntry: DiagnosisEntry = {
    code: parseEntry(object.code),
    name: parseEntry(object.name),
    latin: object.latin === undefined ?  undefined : parseEntry(object.latin),
  };

  return newEntry;
};

const isString = (entry: any): entry is string => {
  return typeof entry === 'string' || entry instanceof String;
};

const parseEntry = (entry: any): string => {
  //type eval
  if (!entry || !isString(entry)) {
    throw new Error('Incorrect string format: ' + entry);
  };

  return entry;
};

export default toNewDiagnosisEntry;