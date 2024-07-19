import { CoursePart } from "./App";

interface part {
  part: CoursePart
}

const Part = ({part} : part) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(value)}`
    );
  };
    switch(part.kind){
      case "basic":
        return (
          <div>
            <em>{part.description}</em>
          </div>
        )
      case "group":
        return (
          <div>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        )
      case "background": 
        return (
          <div>
            <em>{part.description}</em>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        )
        case "special": 
        return (
          <div>
            <em>{part.description}</em>
            <p>required skills {part.requirements.join(", ")}</p>
          </div>
        )
      default: 
          return assertNever(part)
    }
}

export default Part;