
import { NewPatient, Gender, Diagnosis, Discharge, HealthCheckRating, EntryWithoutId, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" ?? text instanceof String; 
};

const isNumber = (input: unknown): input is number => {
  return typeof input === "number" ?? input instanceof Number;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}


const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation|| !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ');
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn|| !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
  }
  return healthCheckRating;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
  if(!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object) || !object.date || !object.criteria || !isString(object.date) || !isString(object.criteria) || !isDate(object.date)) {
    throw new Error('Incorrect or missing start date or criteria')
  }
  return {
    date: object.date,
    criteria: object.criteria
  }
}

const parseEmployerName = (employerName: unknown): string => {
  if(!employerName|| !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist|| !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if(!description|| !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if(!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object) || !(object.startDate) || !(object.endDate) || !isString(object.startDate) || !isString(object.endDate) || !isDate(object.startDate) || !isDate(object.endDate)) {
    throw new Error('Incorrect start date or enddate')
  }
  console.log('c')
  return {
    startDate: object.startDate,
    endDate: object.endDate
  } 
}


export const toNewEntry = (object: unknown) : EntryWithoutId => {
  if( !object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
    if('discharge' in object) {
      console.log('hello1')
      const newHospitalEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist), 
        discharge: parseDischarge(object.discharge), 
        diagnosisCodes: parseDiagnosisCodes(object),
        type: 'Hospital',
      }
      return newHospitalEntry;
    }
    else if('healthCheckRating' in object) {
      console.log('hello2')
      const newHealthCheckEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist), 
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: 'HealthCheck'
      }
      return newHealthCheckEntry;
    }
    else if('employerName' in object) {
      if('sickLeave' in object) {
        const newOccupationalHealthcareSickLeaveEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist), 
          employerName: parseEmployerName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: 'OccupationalHealthcare'
        }
        return newOccupationalHealthcareSickLeaveEntry;
      }
      const newOccupationalHealthcareSickLeaveEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist), 
        employerName: parseEmployerName(object.employerName),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: 'OccupationalHealthcare'
      }
      return newOccupationalHealthcareSickLeaveEntry;
      
      
    }
  }
  throw new Error('Incorrect data: some fields are missing');
}

export const toNewPatient = (object: unknown): NewPatient => {
  if( !object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
 
};



