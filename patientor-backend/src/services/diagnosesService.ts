import diagnosesData from '../../data/diagnoses-data'; 

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getDiagnoses
};