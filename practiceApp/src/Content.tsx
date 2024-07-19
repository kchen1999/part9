import Part from "./Part"
import { CoursePart } from "./App"

interface coursePartProps {
  courseParts: CoursePart[]
}

const Content = ({courseParts}: coursePartProps) => {
  return courseParts.map(part => (
    <div key={part.name}>
      <h3>{part.name} {part.exerciseCount}</h3>
      <Part part={part}/>
    </div>
  ))
}

export default Content;