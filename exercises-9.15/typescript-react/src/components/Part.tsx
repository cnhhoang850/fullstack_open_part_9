import React from 'react';
import {assertNever, CoursePart} from '../types/courseParts';

interface PartProp {
  part: CoursePart
}

const Part: React.FC<PartProp> = ({part}: PartProp) => {
  switch(part.name) {
    case "Fundamentals":
      return <p>
        {part.name} Exercises:
        {part.exerciseCount} Descrpition:
        {part.description? part.description : ''}
      </p>
    case "Using props to pass data": 
      return <p>
        {part.name} Exercises:
        {part.exerciseCount} Descrpition:
        {part.description? part.description : ''} Group Projects: 
        {part.groupProjectCount}
      </p>
    case "Deeper type usage":
      return <p>
        {part.name} Exercises:
        {part.exerciseCount} Descrpition:
        {part.description? part.description : ''} Submission Link: 
        {part.exerciseSubmissionLink}
      </p>
    case "Fourth part of the course":
      return <p>
        {part.name} Exercises:
        {part.exerciseCount} Descrpition:
        {part.description} 
      </p>
    default:
      return assertNever(part)
  }
}

export default Part;