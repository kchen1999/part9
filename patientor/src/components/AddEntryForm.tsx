import { useState, SyntheticEvent, useEffect } from "react"
import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../types";

import { TextField, Grid, Button } from '@mui/material';

interface Props {
  entryFormType: string;
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

export const AddEntryForm = ({ entryFormType, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(Array<Diagnosis['code']>);
  const [diagnosisCode, setDiagnosisCode] = useState('');

  useEffect(() => {
    const codes = diagnosisCode.split(', ')
    setDiagnosisCodes([...codes])
  },[diagnosisCode])

  const resetBaseEntries = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCode('');
    setDiagnosisCodes([]);
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    
    console.log(diagnosisCodes);
    if(entryFormType === 'healthCheck') {
      const rating = Object.values(HealthCheckRating).find(h => h.toString() === healthCheckRating);
      if(rating) {
        setHealthCheckRating(rating.toString());
      } 
      onSubmit({
        description,
        date,
        type: "HealthCheck",
        specialist,
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes,
       
      } as EntryWithoutId);
      setHealthCheckRating('');
    }
    else if(entryFormType === 'occupationalHealthCare') {
      onSubmit({
        description,
        date,
        type: "OccupationalHealthcare",
        specialist,
        employerName,
        sickLeave: {
          startDate,
          endDate
        },
        diagnosisCodes
      } as EntryWithoutId);
      setEmployerName('');
      setStartDate('');
      setEndDate('');
    }
    else {
      onSubmit({
        description,
        date,
        type: "Hospital",
        specialist,
        discharge: {
          date: dischargeDate,
          criteria
        },
        diagnosisCodes
       
      } as EntryWithoutId);
      setDischargeDate('');
      setCriteria('');
    }
   
    resetBaseEntries();
   
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
        />
        {
          entryFormType === 'healthCheck' ?  
          <TextField
            label="Healthcheck rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          /> : entryFormType === 'occupationalHealthCare' ? 
            <div>
              <TextField
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <p>Sickleave</p>
              <input type='date'/>
              <TextField
                label="start"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
              />
              <TextField
                label="end"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
              />
            </div> : 
            <div>
              <p>Discharge</p>
              <TextField
                label="date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                label="criteria"
                fullWidth
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
            </div>
        }
       
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}