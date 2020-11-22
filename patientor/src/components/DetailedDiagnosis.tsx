import React from 'react';

import { Header, Segment, Icon} from "semantic-ui-react";
import {Entry, DiagnosisEntry, Diagnosis } from "../types";
import HealthRatingBar from '../components/HealthRatingBar';

type DetailedProps = {
  key: number;
  entry: Entry;
  diagnosesToShow: Diagnosis[] | undefined;
};

const DetailedDiagnosis = ({ entry, diagnosesToShow}: DetailedProps) => { 
  const EntryType = (entry: Entry): string => {
    switch (entry.type) {
      case "Hospital":
        return "hospital";
      case "OccupationalHealthCare":
        return "user md";
      case "HealthCheck":
        return "heartbeat";
      default:
        return "heart";
    }
  };

  const returnDiagnosisCode = (code: string): string | undefined=> {
    const descriptionToReturn = diagnosesToShow 
      ? diagnosesToShow.find((diagnosis: Diagnosis) => diagnosis.code === code)
      : {name: "Cannot find diagnosis description"};
    if (descriptionToReturn) {
      return descriptionToReturn.name;
    }
    return;
  };
  
  return (
    <>
      <Segment className="animated">
                  <Header as="h2">
                    {entry.date}
                    <Icon className={EntryType(entry)}></Icon>  
                  </Header>
                  <Header as="h3" color="grey">
                    {entry.description}  
                  </Header>
                  <ul>
                    {entry && entry.diagnosisCodes 
                      ? entry.diagnosisCodes.map((code: DiagnosisEntry['code'], i) => {
                      return <Segment color="green" key={i} className="compact">
                          <p>
                          {code} {returnDiagnosisCode(code)}
                          </p>
                        </Segment>;
                      })
                      : <></>
                    }
                  </ul>
                  {entry.type === "HealthCheck" && <HealthRatingBar showText={false} rating={entry.healthCheckRating} />}
      </Segment>
    </>
  );
};

export default DetailedDiagnosis;