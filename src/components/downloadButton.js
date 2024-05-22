import React from "react";

const DownloadButton = ({ filePath, fileName }) => (
  <a href={filePath} download>
    <button className="download-button">{fileName}</button>
  </a>
);

export default DownloadButton;
