import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {  useParams } from "react-router-dom";
import {Container, Divider, Header, Icon, Button } from "semantic-ui-react";

import { EntryFormValues } from "../AddEntryModal/AddPatientForm";
import AddEntryModal from "../AddEntryModal";

import { Patient, DiagnosisEntry, Diagnosis } from "../types";
import { useStateValue, addPatientToList} from "../state";
import EntryList from "../components/EntryList";

const DetailedPatientPage: React.FC = () => {
  const [{patients}, dispatch ] = useStateValue();
  const { id } = useParams<{id: string}>();
  const [patientToShow, setPatient] = React.useState<Patient | undefined>(undefined);
  const [diagnosesToShow, setDiagnoses] = React.useState<Diagnosis[] | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    //funtion to fetch detailed patients 
    //and dispatch fetched patient to 
    //state
    const fetchDetailedPatient = async () => {
      try {
        const { data: detailedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientToList(detailedPatient));
        setPatient(detailedPatient);
        console.log(patients);
      } catch (e) {
        console.error(e);
      }
    };
    //parse patients in to array
    const MapPatients = Object.values(patients).map((patient: Patient) => {
      return patient;
    }); 
    //find requested patient in state
    const thePatientToShow = MapPatients.find((patient: Patient) => {
      return patient.id === id;
    });
    //if the patient is not already fetched
    //call fetch function based on ssn presence
    if (thePatientToShow && thePatientToShow.ssn) {
      setPatient(thePatientToShow);
    } else {
      fetchDetailedPatient();
    }
  }, [id]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: detailedDiagnoses } = await axios.get<DiagnosisEntry[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnoses(detailedDiagnoses);
        console.log(detailedDiagnoses);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDiagnoses();
  },[patientToShow]);

  let genderIcon;
  switch(patientToShow?.gender) {
    case "male": 
      genderIcon = "mars";
      break;
    case "female":
      genderIcon = "venus";
      break;
    case "other":
      genderIcon = "genderless";
      break;
  }


  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<DiagnosisEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        {...values, id: "random-dummy-id"}
      );

      console.log(newEntry);
      closeModal();

      const { data: detailedPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(addPatientToList(detailedPatient));
      setPatient(detailedPatient);

    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
    console.log('submitNewEntry called');
  };

  

  return (
    <div className="App">
      <Container textAlign="left">
        <Header as="h2">
          {patientToShow?.name}
          <Icon className={genderIcon}></Icon>
        </Header>
        <p>SSN: {patientToShow?.ssn}</p>
        <p>Occupation: {patientToShow?.occupation}</p>
        <Divider hidden />
        <Header as="h3">
          entries 
        </Header>
        <EntryList patientToShow={patientToShow} diagnosesToShow={diagnosesToShow} />
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default DetailedPatientPage;



