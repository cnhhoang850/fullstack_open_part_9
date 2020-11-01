export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
}

export type nonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}