import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';

interface OccupationalHealthcareEntryProp {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryPage = ({ entry }: OccupationalHealthcareEntryProp) => {
  return (
    <div>
      <p>{entry.date} <WorkIcon /></p> 
      <em>{entry.description}</em>
      {
        entry.sickLeave && 
        <div>
          <p>Start date: {entry.sickLeave.startDate}</p>  
          <p>End date: {entry.sickLeave.endDate}</p> 
        </div> 
      }
      <p>diagnose by {entry.specialist}</p>
    </div>
    
  )
}

export default OccupationalHealthcareEntryPage;