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

interface BaseEntry {
    id: string;
    description: string;
    date: string; 
    diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

enum HealthCheckRating { 
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

export type Entry = 
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

