import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Patient, Diagnosis, EntryWithoutId } from "../types";
import EntryDetails from "./EntryDetails";
import patientService from "../services/patients";
import { Alert } from "@mui/material";
import { AddEntryForm } from "./AddEntryForm";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}


const PatientPage = ({ patients, diagnoses, setPatients } : Props) => {
  const [newEntryOpen, setNewEntryOpen] = useState<boolean>(false);
  const [entryFormType, setEntryFormType] = useState<string>('');
  const [error, setError] = useState<string>();
  const id = useParams().id;
  const patientData = patients.find(p => p.id === id);

  const closeEntryForm = () : void => {
    setEntryFormType('')
    setNewEntryOpen(false);
    setError(undefined);
  }
 
  const submitNewEntry = async (entry: EntryWithoutId) => {
    try {
      if(id) {
        const newEntry = await patientService.addEntry(entry, id); 
        if(patientData) {
          setPatients(patients.map(p => {
            if(p.id !== id) {
              return p
            }
            else {
              p.entries.concat(newEntry)
              return p
            }
          }))
      }
      setEntryFormType('')
      setNewEntryOpen(false);
      setError(undefined);
    }
    }
    catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  if(patientData) {
    return (
      <div>
        <h1>{patientData.name}</h1>
        <p>ssh: {patientData.ssn}</p>
        <p>occupation: {patientData.occupation}</p>
        {error && <Alert severity="error">{error}</Alert>}
        {
          newEntryOpen ? <AddEntryForm entryFormType={entryFormType} onCancel={closeEntryForm} onSubmit={submitNewEntry}/> : 
          <div>
            <button onClick={() => {
              setNewEntryOpen(true)
              setEntryFormType('healthCheck')
            }}>Add new health check entry </button> 
            <button onClick={() => {
              setNewEntryOpen(true)
              setEntryFormType('occupationalHealthCare')
            }}>Add new occupational healthcare entry </button> 
            <button onClick={() => {
              setNewEntryOpen(true)
              setEntryFormType('hospital')
            }}>Add new hospital entry </button> 
          </div>
        }
        <EntryDetails entries={patientData.entries} diagnoses={diagnoses}></EntryDetails>
      </div>
    );
  }
  else {
    return <div>Patient not found!</div>
  }
};

export default PatientPage;
