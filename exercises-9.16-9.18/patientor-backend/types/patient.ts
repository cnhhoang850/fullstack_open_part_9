export interface Entry {

}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>

export type nonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}