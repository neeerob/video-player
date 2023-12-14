// import React, { useRef, useState } from "react";
// import SignatureCanvas from "react-signature-canvas";

// const SignableForm = () => {
//   const signatureRef = useRef();
//   const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

//   const handleSign = () => {
//     const signatureData = signatureRef.current.toDataURL();
//     // You can save or process the signature data here
//     console.log("Signature Data:", signatureData);
//     setIsSignatureEmpty(false);
//   };

//   const handleDownload = () => {
//     if (!isSignatureEmpty) {
//       const signatureData = signatureRef.current.toDataURL();
//       const link = document.createElement("a");
//       link.href = signatureData;
//       link.download = "signature.png";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <SignatureCanvas
//         ref={signatureRef}
//         canvasProps={{ width: 400, height: 200, className: "signatureCanvas" }}
//         onBegin={() => setIsSignatureEmpty(true)}
//       />
//       <div>
//         <button onClick={handleSign}>Sign</button>
//         <button onClick={handleDownload} disabled={isSignatureEmpty}>
//           Download
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignableForm;

// import React, { useRef, useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./SignableForm.css"; // Import the CSS file for styling

// const SignableForm = () => {
//   const signatureRef = useRef();
//   const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

//   const handleSign = () => {
//     const signatureData = signatureRef.current.toDataURL();
//     // You can save or process the signature data here
//     console.log("Signature Data:", signatureData);
//     setIsSignatureEmpty(false);
//   };

//   const handleDownload = () => {
//     if (!isSignatureEmpty) {
//       const signatureData = signatureRef.current.toDataURL();
//       const link = document.createElement("a");
//       link.href = signatureData;
//       link.download = "signature.png";
//       link.click();
//     }
//   };

//   const handleReset = () => {
//     signatureRef.current.clear();
//     setIsSignatureEmpty(true);
//   };

//   return (
//     <div className="signable-form">
//       <SignatureCanvas
//         ref={signatureRef}
//         canvasProps={{ width: 400, height: 200, className: "signature-canvas" }}
//         onBegin={() => setIsSignatureEmpty(true)}
//       />
//       <div className="button-container">
//         <button className="sign-button" onClick={handleSign}>
//           Sign
//         </button>
//         <button
//           className="download-button"
//           onClick={handleDownload}
//           disabled={isSignatureEmpty}
//         >
//           Download
//         </button>
//         <button className="reset-button" onClick={handleReset}>
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignableForm;

// import React, { useRef, useState } from "react";
// import SignatureCanvas from "react-signature-canvas";

// const SignableForm = () => {
//   const signatureRef = useRef();
//   const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
//   const [userId, setUserId] = useState("");
//   const [savedSignature, setSavedSignature] = useState(null);

//   const handleSign = () => {
//     const signatureData = signatureRef.current.toDataURL();
//     // You can save or process the signature data here
//     console.log("Signature Data:", signatureData);
//     setIsSignatureEmpty(false);

//     // Assuming you have a user ID (you can generate or get it from user input)
//     setUserId("yourUserId");

//     // Save the signature
//     saveSignature({ userId, signatureData });
//   };

//   const handleDownload = () => {
//     // Download logic here
//   };

//   const handleReset = () => {
//     signatureRef.current.clear();
//     setIsSignatureEmpty(true);
//   };

//   const saveSignature = async (signature) => {
//     try {
//       const response = await fetch("http://localhost:4001/saveSignature", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(signature),
//       });

//       const savedSignature = await response.json();
//       console.log("Saved Signature:", savedSignature);
//       setSavedSignature(savedSignature);
//     } catch (error) {
//       console.error("Error saving signature:", error);
//     }
//   };

//   const fetchSignature = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/getSignature/${userId}`
//       );
//       const fetchedSignature = await response.json();
//       console.log("Fetched Signature:", fetchedSignature);

//       // Do something with the fetched signature, e.g., display it
//     } catch (error) {
//       console.error("Error fetching signature:", error);
//     }
//   };

//   return (
//     <div>
//       <SignatureCanvas
//         ref={signatureRef}
//         canvasProps={{ width: 400, height: 200, className: "signatureCanvas" }}
//         onBegin={() => setIsSignatureEmpty(true)}
//       />
//       <div>
//         <button onClick={handleSign}>Sign</button>
//         <button onClick={handleDownload} disabled={isSignatureEmpty}>
//           Download
//         </button>
//         <button onClick={handleReset}>Reset</button>
//         <button onClick={fetchSignature}>Fetch Signature</button>
//       </div>
//     </div>
//   );
// };

// export default SignableForm;

// import React, { useRef, useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./SignableForm.css";

// const SignableForm = () => {
//   const signatureRef = useRef();
//   const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
//   const [userId, setUserId] = useState("");
//   const [savedSignature, setSavedSignature] = useState(null);

//   const handleSign = () => {
//     const signatureData = signatureRef.current.toDataURL();
//     setIsSignatureEmpty(false);
//     setUserId("yourUserId");
//     saveSignature({ userId, signatureData });
//   };

//   const handleDownload = () => {
//     if (!isSignatureEmpty) {
//       const signatureData = signatureRef.current.toDataURL();
//       const link = document.createElement("a");
//       link.href = signatureData;
//       link.download = "signature.png";
//       link.click();
//     }
//   };

//   const handleReset = () => {
//     signatureRef.current.clear();
//     setIsSignatureEmpty(true);
//   };

//   const saveSignature = async (signature) => {
//     try {
//       const response = await fetch("http://localhost:4001/saveSignature", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(signature),
//       });

//       const savedSignature = await response.json();
//       setSavedSignature(savedSignature);
//     } catch (error) {
//       console.error("Error saving signature:", error);
//     }
//   };

//   const fetchSignature = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:4001/getSignature/${userId}`
//       );
//       const fetchedSignature = await response.json();
//       setSavedSignature(fetchedSignature);
//     } catch (error) {
//       console.error("Error fetching signature:", error);
//     }
//   };

//   return (
//     <div className="signable-form">
//       <SignatureCanvas
//         ref={signatureRef}
//         canvasProps={{ width: 400, height: 200, className: "signature-canvas" }}
//         onBegin={() => setIsSignatureEmpty(true)}
//       />
//       <div className="button-container">
//         <button className="sign-button" onClick={handleSign}>
//           Sign
//         </button>
//         <button
//           className="download-button"
//           onClick={handleDownload}
//           disabled={isSignatureEmpty}
//         >
//           Download
//         </button>
//         <button className="reset-button" onClick={handleReset}>
//           Reset
//         </button>
//         <input
//           type="text"
//           placeholder="Enter UserId"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <button className="fetch-button" onClick={fetchSignature}>
//           Fetch Signature
//         </button>
//       </div>
//       {savedSignature && (
//         <div className="fetched-signature">
//           <p>Fetched Signature:</p>
//           <img src={savedSignature.signatureData} alt="Fetched Signature" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignableForm;

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./SignableForm.css";

const SignableForm = () => {
  const signatureRef = useRef();
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const [userId, setUserId] = useState("");
  const [savedSignature, setSavedSignature] = useState(null);

  const handleSign = () => {
    const signatureData = signatureRef.current.toDataURL();
    setIsSignatureEmpty(false);
    setUserId("yourUserId");
    saveSignature({ userId, signatureData });
  };

  const handleDownload = () => {
    if (!isSignatureEmpty) {
      const signatureData = signatureRef.current.toDataURL();
      const link = document.createElement("a");
      link.href = signatureData;
      link.download = "signature.png";
      link.click();
    }
  };

  const handleReset = () => {
    signatureRef.current.clear();
    setIsSignatureEmpty(true);
  };

  const saveSignature = async (signature) => {
    try {
      const response = await fetch("http://localhost:4001/saveSignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signature),
      });

      const savedSignature = await response.json();
      setSavedSignature(savedSignature);
    } catch (error) {
      console.error("Error saving signature:", error);
    }
  };

  const fetchSignature = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/getSignature/${userId}`
      );
      const fetchedSignature = await response.json();
      setSavedSignature(fetchedSignature);
    } catch (error) {
      console.error("Error fetching signature:", error);
    }
  };

  const handleDownloadFetchedSignature = () => {
    if (savedSignature) {
      const link = document.createElement("a");
      link.href = savedSignature.signatureData;
      link.download = `fetched_${userId}_signature.png`;
      link.click();
    }
  };

  return (
    <div className="signable-form">
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 600, height: 400, className: "signature-canvas" }}
        onBegin={() => setIsSignatureEmpty(true)}
      />
      <div className="button-container">
        <button className="sign-button" onClick={handleSign}>
          Sign
        </button>
        <button
          className="download-button"
          onClick={handleDownload}
          disabled={isSignatureEmpty}
        >
          Download
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <input
          type="text"
          placeholder="Enter UserId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="fetch-button" onClick={fetchSignature}>
          Fetch Signature
        </button>
      </div>
      {savedSignature && (
        <div className="fetched-signature">
          <p>Fetched Signature:</p>
          <img src={savedSignature.signatureData} alt="Fetched Signature" />
          <button
            className="download-button"
            onClick={handleDownloadFetchedSignature}
          >
            Download Fetched Signature
          </button>
        </div>
      )}
    </div>
  );
};

export default SignableForm;
