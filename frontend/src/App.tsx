import React, { useState } from "react";
import Popup from "./Popup";
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
  padding: 2rem;
  border-radius: 15px;
  background: linear-gradient(to right bottom, ddd, fff);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

// Increase the size of the label
const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ResultOutput = styled.p`
  font-size: 1.5rem;
  margin: 2rem;
  padding: 2rem;
  width: 91%;
  min-height: 50vh; // This will make sure the component always takes at least 50% of the view height
  text-align: left;
  border-radius: 10px;
  color: black;
  background: linear-gradient(to right bottom, #eee, #fff);
  box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  white-space: pre-wrap;
`;

// Add some styling to the input
const Input = styled.input`
  width: 60%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid grey;
`;

// Modify the button with more styling
const Button = styled.button`
  width: 20%;
  padding: 1rem;
  background-color: dodgerblue;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background: linear-gradient(to right top, rgb(30, 85, 92), rgb(90, 146, 148));
  }
`;


export default function App() {
  const [result, setResult] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  // These handlers remain unchanged
  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("question", question);

    // for(let pair of formData.entries()) {
    //   console.log(pair[0]+ ', '+ pair[1]); 
    // }

    fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    })

    // fetch("http://127.0.0.1:8000/predict", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data', // specify the content type
    //   }
    // })

    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setResult(data.result);
      setShowPopup(true);
      setPopupMessage("File uploaded successfully!");
      setFile(null); // Clear the file input
      setQuestion(""); // Clear the question input
    })
    .catch((error) => {
      console.error("Error:", error);
      setShowPopup(true);
      setPopupMessage("Error uploading file. Please try again.");
    });
  };

  return (
  <div className="appBlock">
    <Form onSubmit={handleSubmit} className="form">
      <Label htmlFor="question">
        Enter your question: here:
      </Label>
      <Input
        id="question"
        type="text"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Type your question here"
      />
      <br />
      <Label htmlFor="file">
        Upload your file(Supported formats are .csv, .pdf, .txt, .docx):
      </Label>
      <Input
        type="file"
        id="file"
        name="file"
        accept=".csv, .txt, .docx, .pdf"
        onChange={handleFileChange}
      />
      <br />
      <Button
        type="submit"
        disabled={!file || !question}
      >
        Submit
      </Button>
    </Form>
    {/*<p className="resultOutput">Result: {result}</p>*/}
    <ResultOutput>Result: {result}</ResultOutput>

    {/* Conditional rendering of the popup */}
    {showPopup && (
      <Popup
        message={popupMessage}
        onClose={() => setShowPopup(false)} // Close the popup when the Close button is clicked
      />
    )}
  </div>
);
}

//   return (
//     <div className="appBlock">
//       <form onSubmit={handleSubmit} className="form">
//         <label className="questionLabel" htmlFor="question">
//           Enter your question: here:
//         </label>
//         <input
//           className="questionInput"
//           id="question"
//           type="text"
//           value={question}
//           onChange={handleQuestionChange}
//           placeholder="Type your question here"
//         />
//         <br />
//         <label className="fileLabel" htmlFor="file">
//           Upload your file(Supported formats are .csv, .pdf, .txt, .docx):
//         </label>
//         <input
//           type="file"
//           id="file"
//           name="file"
//           accept=".csv, .txt, .docx, .pdf"
//           onChange={handleFileChange}
//           className="fileInput"
//         />
//         <br />
//         <button
//           className="submitBtn"
//           type="submit"
//           disabled={!file || !question}
//         >
//           Submit
//         </button>
//       </form>
//       <p className="resultOutput">Result: {result}</p>

//       {/* Conditional rendering of the popup */}
//       {showPopup && (
//         <Popup
//           message={popupMessage}
//           onClose={() => setShowPopup(false)} // Close the popup when the Close button is clicked
//         />
//       )}
//     </div>
//   );
// }
