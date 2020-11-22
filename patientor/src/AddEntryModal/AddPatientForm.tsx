import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import axios from 'axios';
import { apiBaseUrl } from "../constants";

import { TextField, SelectField, DiagnosisSelection, EntryOption, NumberField} from "./FormField";
import {  DiagnosisEntry, Entry, Diagnosis } from "../types";


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: EntryOption[] = [
  { value: "", label: "Please select one" },
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthCare", label: "OccupationalHealthCare" },
  
];




export const AddEntryForm: React.FC<Props> = ({onSubmit, onCancel}) => {
  const [diagnosesToShow, setDiagnoses] = React.useState<Diagnosis[] | undefined>(undefined);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: detailedDiagnoses } = await axios.get<DiagnosisEntry[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnoses(detailedDiagnoses);
        setLoading(false);
        console.log(detailedDiagnoses);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDiagnoses();
  },[]);


  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        type: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string} = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.type === "Hospital" && !values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge?.date) {
          errors.discharge = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge?.criteria) {
          errors.discharge = requiredError;
        }
        if (values.type === "OccupationalHealthCare" && !values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "OccupationalHealthCare" && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.type === "OccupationalHealthCare" && !values.sickLeave?.startDate) {
          errors.sickLeave = requiredError;
        }
        if (values.type === "OccupationalHealthCare" && !values.sickLeave?.endDate) {
          errors.sickLeave = requiredError;
        }
        if (values.type ==="HealthCheck" && values.healthCheckRating){
          if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
            errors.healthCheckRating = "Health rating must be no higher than 3, no lower than 0";
          }

        } 
        if (values.type === ""){
          errors.type = requiredError;
        }
        console.log(errors);
        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched}) => {
          if (isLoading) {
            return <h1>Loading</h1>;
          } 
          return (
            <Form className="form ui">
              <SelectField
                label="Diagnosis type"
                name="type"
                options={typeOptions}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="dd-mm-yy"
                name="date"
                component={TextField}
              />
              <DiagnosisSelection 
                diagnoses={diagnosesToShow as Diagnosis[]}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
                <Field
                  label="Health score"
                  name="healthCheckRating"
                  min={0}
                  max={3}
                  component={NumberField}
                  disabled={!(values.type==="HealthCheck")}
                />

                <Field
                  label="Specialist"
                  placeholder="Specialist's name"
                  name="specialist" 
                  component={TextField}
                  disabled={!(values.type==="Hospital")}
                />
                <Field
                  label="Discharge date"
                  placeholder="dd-mm-yy"
                  name="discharge.date" 
                  component={TextField}
                  disabled={!(values.type==="Hospital")}
                /> {errors["discharge"] && touched["discharge"] ? <div style={{ color:'red' }}  >{"Both discharge date and criteria is required"}</div> : null}
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge Criteria"
                  name="discharge.criteria" 
                  component={TextField}
                  disabled={!(values.type==="Hospital")}
                /> {errors["discharge"] && touched["discharge"] ? <div style={{ color:'red' }}  >{"Both discharge date and criteria is required"}</div> : null}
                <Field
                  label="Specialist"
                  placeholder="Specialist's name"
                  name="specialist" 
                  component={TextField}
                  disabled={!(values.type==="OccupationalHealthCare")}
                />
                <Field
                  label="Employer"
                  placeholder="Employer's name"
                  name="employerName" 
                  component={TextField}
                  disabled={!(values.type==="OccupationalHealthCare")}
                />
                <Field
                  label="Sick leave starting date"
                  placeholder="dd-mm-yy"
                  name="sickLeave.startDate" 
                  component={TextField}
                  disabled={!(values.type==="OccupationalHealthCare")}
                /> {errors.sickLeave && touched.sickLeave ? <div style={{ color:'red' }}  >{"Both sick leave start and end date is required"}</div> : null}
                <Field
                  label="Sick leave ending date"
                  placeholder="dd-mm-yy"
                  name="sickLeave.endDate" 
                  component={TextField}
                  disabled={!(values.type==="OccupationalHealthCare")}
                /> {errors.sickLeave && touched.sickLeave ? <div style={{ color:'red' }}  >{"Both sick leave start and end date is required"}</div> : null}

              <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
              </Grid>
            </Form>
          );
        }
      }
    </Formik>
  );
};

export default AddEntryForm;