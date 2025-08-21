///////////// 4 เป็น tag <p>

import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Ptag: React.FC<ParagraphProps> = ({ children, className = "" }) => {
  return (
    <p className={`text-base text-gray-800 leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

export default Ptag;
