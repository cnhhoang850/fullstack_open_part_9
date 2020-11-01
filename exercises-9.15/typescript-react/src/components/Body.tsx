import React from 'react';
import Part from './Part';
import {CoursePart} from '../types/courseParts';


interface BodyProp  {
  courses: Array<CoursePart>
}

const Body: React.FC<BodyProp> = ({courses}: BodyProp) => {
  return <>
  {courses.map((course, i) => 
     <Part part={course} key={i} />
    )
  }
  </>;
};

export default Body;  