import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, path, filename }) => {
  const handleDownload = () => {
    const fileUrl = `${process.env.PUBLIC_URL || ""}${path}/${filename}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <button onClick={handleDownload}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};

export default Button;
