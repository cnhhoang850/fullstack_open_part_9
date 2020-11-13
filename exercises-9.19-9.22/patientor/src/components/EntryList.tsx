import React from 'react';
import { Patient, Entry,  Diagnosis } from "../types";
import DetailedDiagnosis from "./DetailedDiagnosis";

type EntryListProps = {
  patientToShow: Patient | undefined;
  diagnosesToShow: Array<Diagnosis> | undefined;
};

const EntryList = ({patientToShow, diagnosesToShow}: EntryListProps) => {
  return <div>
    {patientToShow && patientToShow.entries ? patientToShow.entries.map((entry: Entry, i) => {
          return <DetailedDiagnosis key={i} entry={entry} diagnosesToShow={diagnosesToShow}/>;
            }
          )
        : <></>
        }
  </div>;
};

export default EntryList;