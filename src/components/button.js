import React from "react";
import testing from "@site/static/files/tests/Testing.postman_collection.json";
import nodered from "@site/static/files/tests/Node-RED Testing.postman_collection.json";
import prompt from "@site/static/files/tests/Prompt Testing.postman_collection.json";

const Button = () => {
  const handleDownload = (url) => {
    // Logic to download the JSON file
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  return (
    <div>
      <button onClick={() => handleDownload(testing)}>
        Download Testing JSON
      </button>
      <button onClick={() => handleDownload(nodered)}>
        Download Node-RED JSON
      </button>
      <button onClick={() => handleDownload(prompt)}>
        Download Prompt JSON
      </button>
    </div>
  );
};

export default Button;
