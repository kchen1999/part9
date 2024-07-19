import { Entry } from "../types";
import { Diagnosis } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import { EntryProp } from "../types";

interface EntryProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}


const EntryDetails = (({ entry }: EntryProp) => {
  switch(entry.type) {
    case "Hospital": 
      return <HospitalEntry entry={entry}/>
    case "HealthCheck": 
      return <HealthCheckEntry entry={entry}/>
    case "OccupationalHealthcare": 
      return <OccupationalHealthcareEntry entry={entry}/> 
    default:
      break;
  }
})

const Entries = ({ entries, diagnoses }: EntryProps) => {

  return (
    <div>
      <h2>entries</h2>
      {entries.map(p => {
          return (
            <div key={p.id} style={{border: 'solid', marginBottom: 12, borderRadius: 8, padding: 3}}>
              <EntryDetails entry={p}/>
              {
                p.diagnosisCodes && p.diagnosisCodes.map(d => {
                const result = diagnoses.find(diagnosis => d === diagnosis.code)
                if(result) {
                  return <li key={d}>{d} {result.name}</li>
                }
                else {
                  return <li key={d}>{d} </li>
                }
              }) 
              }
            </div>
          )
        })}
    </div>
  )
}

export default Entries;