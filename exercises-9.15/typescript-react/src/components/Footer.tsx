import React from 'react';

interface course {
  name: string,
  exerciseCount: number,
}

interface FooterProp  {
  courses: Array<course>
}

const Footer: React.FC<FooterProp> = ({courses}: FooterProp) => {
  return <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
};

export default Footer;