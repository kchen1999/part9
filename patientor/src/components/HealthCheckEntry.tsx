import { HealthCheckEntry} from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HealthCheckEntryProp {
  entry: HealthCheckEntry;
}

const HealthCheckEntryPage = ({ entry }: HealthCheckEntryProp) => {
  let heartColor = ''
  if(entry.healthCheckRating === 0) {
    heartColor = 'green'
  }
  else if(entry.healthCheckRating === 1) {
    heartColor = 'yellow'
  }
  else if(entry.healthCheckRating === 2) {
    heartColor = 'orange'
  }
  else if(entry.healthCheckRating === 3) {
    heartColor = 'red'
  }
  return (
    <div>
      <p>{entry.date} <LocalHospitalIcon /></p> 
      <em>{entry.description}</em>
      <p></p><FavoriteIcon style={{color: heartColor}}/>
      <p>diagnose by {entry.specialist}</p>
    </div>
    
  )
}

export default HealthCheckEntryPage;