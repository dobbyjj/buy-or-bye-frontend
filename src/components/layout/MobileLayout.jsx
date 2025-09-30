import React from 'react';

const MobileLayout = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 768,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#fff",
        padding: "24px 16px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export default MobileLayout;