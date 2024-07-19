import { HospitalEntry } from "../types";
import LogoutIcon from '@mui/icons-material/Logout';

interface HospitalEntryProp {
  entry: HospitalEntry;
}

const HospitalEntryPage = ({ entry }: HospitalEntryProp) => {
  return (
    <div>
      <p>{entry.date} </p> 
      <em>{entry.description}</em>
      <p>discharge date: {entry.discharge.date} <LogoutIcon /></p>
      <p>criteria: {entry.discharge.criteria} </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
    
  )
}

export default HospitalEntryPage;