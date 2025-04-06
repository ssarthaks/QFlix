import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="lg:w-[80%] md:w-[90%] w-[90%] mx-auto">{children}</div>
  );
};

export default Container;
