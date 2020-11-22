import {PatientEntry} from '../types/patient';
import {Entry} from '../types/patient';
import PatientService from './getPatients';

const addEntriesEntry = (object: Entry, id: string): Entry => {
  const patientToAdd: PatientEntry = PatientService.getPatientById(id);
  const newEntriesEntry: Entry = object;
  patientToAdd.entries.push(newEntriesEntry);
  PatientService.modifyPatientEntry(patientToAdd, id);

  return newEntriesEntry;
}

export default {
  addEntriesEntry,
}