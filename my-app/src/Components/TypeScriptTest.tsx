import React, { FC } from 'react';

interface TitleProps {
  title: string;
  subtitle: string
}

const TypeScriptTest: FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </>
  );
};

export default TypeScriptTest;