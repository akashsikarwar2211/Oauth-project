import React from 'react';

const AuthBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-center max-w-lg mx-auto p-12 bg-cover bg-center text-white rounded-lg shadow-md hover:shadow-lg mt-10 ${className}`} style={{ backgroundImage: "url('/v1016-b-09.jpg')" }}>
      {children}
    </div>
  );
};

export default AuthBox;
