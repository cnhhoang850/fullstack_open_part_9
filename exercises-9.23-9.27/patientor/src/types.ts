export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  Heath = "HealthCheck",
  Occupational = "OccupationalHealthCare",
  Hospital = "Hospital",
  Unselected = "Not selected"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Array<Entry>;
}

export interface DiagnosisEntry  {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string; 
    diagnosisCodes?: Array<DiagnosisEntry['code']>;
    specialist?: string;
  discharge?: {
    date: string;
    criteria: string;
  };
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeave?: {
    startDate?: string;
    endDate?: string;
  };
}

export enum HealthCheckRating { 
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthCare";
  specialist: string;
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  specialist: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface UnselectedEntry extends BaseEntry {
  type: "";
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry
  | UnselectedEntry
  ;

