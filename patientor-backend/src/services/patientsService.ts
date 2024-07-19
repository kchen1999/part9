import patientsData from '../../data/patients-data'; 
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient
  
} 

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name, 
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (
  patient: NewPatient
): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;  
};

const addEntry = (
  entry: EntryWithoutId, id: String 
): Entry => {
  const newEntry = {
    id: uuid(), 
    ...entry
  };
  const patient = patients.find(p => p.id === id);
  if(patient) {
    patient.entries.push(newEntry);
  }
  return newEntry;
}

export default {
  getPatients,
  getPatient, 
  getNonSensitivePatients, 
  addPatient,
  addEntry
};