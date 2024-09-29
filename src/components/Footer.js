import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 w-full">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Blog Manager. Developed by Mudassir Nazir.
      </p>
    </footer>
  );
};

export default Footer;
