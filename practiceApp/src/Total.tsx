import { CoursePart } from "./App";

interface coursePartProps {
  courseParts: CoursePart[]
}

const Total = ({courseParts}: coursePartProps) => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {totalExercises}</p>

}

export default Total;