// import React from "react";
// import VideoPlayer from "./components/VideoPlayer";
// import duplicate from "./components/duplicate1";
// import videopa from "./components/VideoPlayer1";

// function App() {
//   return (
//     <div className="App">
//       <h1>Video Player</h1>

//       {/* <VideoPlayer videoUrl="http://localhost:3000/vd/3231d3679eb84fafbcd000f6bfede136/output.m3u8" />
//       <VideoPlayer videoUrl="http://localhost:3000/vd/55001e7adfdc4239ad76acc0d36bb0e5/output.m3u8" />
//       <VideoPlayer videoUrl="http://localhost:3000/vd/3231d3679eb84fafbcd000f6bfede136/output.m3u8" />
//       <VideoPlayer videoUrl="http://localhost:3000/vd/3231d3679eb84fafbcd000f6bfede136/output.m3u8" /> */}

//       <h1>Video Player</h1>
//       {/* <videopa /> */}
//       <duplicate />
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { useState } from "react";
// import axios from "axios"; // or use your preferred HTTP library

// function GoogleAuthComponent() {
//   const [accessToken, setAccessToken] = useState(null);

//   const handleGoogleAuth = async () => {
//     // Google's OAuth 2.0 endpoint for requesting an access token
//     var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

//     // Create <form> element to submit parameters to OAuth 2.0 endpoint.
//     var form = document.createElement("form");
//     form.setAttribute("method", "GET"); // Send as a GET request.
//     form.setAttribute("action", oauth2Endpoint);

//     // Parameters to pass to OAuth 2.0 endpoint.
//     var params = {
//       client_id:
//         "700290340955-0lrlegc2bca690kruris95ehvbfr5feg.apps.googleusercontent.com",
//       redirect_uri: "http://localhost:3000/dvsonrt/src",
//       response_type: "token",
//       scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
//       include_granted_scopes: "true",
//       state: "pass-through value",
//     };

//     // Add form parameters as hidden input values.
//     for (var p in params) {
//       var input = document.createElement("input");
//       input.setAttribute("type", "hidden");
//       input.setAttribute("name", p);
//       input.setAttribute("value", params[p]);
//       form.appendChild(input);
//     }

//     // Add form to page and submit it to open the OAuth 2.0 endpoint.
//     document.body.appendChild(form);
//     form.submit();
//   };

//   return (
//     <div>
//       {accessToken ? (
//         "Logged in" // This is a valid string
//       ) : (
//         <button onClick={handleGoogleAuth}>Sign in with Google</button>
//       )}
//     </div>
//   );
// }

// export default GoogleAuthComponent;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function GoogleAuthComponent() {
//   const [accessToken, setAccessToken] = useState(null);

//   useEffect(() => {
//     // Check if the access token exists in localStorage when the component mounts
//     const storedAccessToken = localStorage.getItem("access_token");
//     if (storedAccessToken) {
//       setAccessToken(storedAccessToken);
//     }
//   }, []);

//   const handleGoogleAuth = async () => {
//     // Replace these with your Google OAuth 2.0 configuration
//     const clientId =
//       "700290340955-0lrlegc2bca690kruris95ehvbfr5feg.apps.googleusercontent.com";
//     const redirectUri = "http://localhost:3000/dvsonrt/src";
//     const scopes = "https://www.googleapis.com/auth/drive.metadata.readonly";

//     // Construct the authorization URL
//     const authUrl =
//       `https://accounts.google.com/o/oauth2/v2/auth?` +
//       `client_id=${clientId}&` +
//       `redirect_uri=${redirectUri}&` +
//       `scope=${scopes}&` +
//       `response_type=token`;

//     // Redirect the user to Google's authentication URL
//     window.location.href = authUrl;
//   };

//   const handleLogout = () => {
//     // Remove the access token from localStorage and state
//     localStorage.removeItem("access_token");
//     setAccessToken(null);
//   };

//   const makeAuthorizedRequest = () => {
//     // Make an authorized request using the access token
//     axios
//       .get("https://example.com/api/resource", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         // Handle the response from the API
//       })
//       .catch((error) => {
//         // Handle errors
//       });
//   };

//   return (
//     <div>
//       {accessToken ? (
//         <div>
//           <p>Logged in</p>
//           <button onClick={handleLogout}>Logout</button>
//           <button onClick={makeAuthorizedRequest}>
//             Make Authorized Request
//           </button>
//         </div>
//       ) : (
//         <button onClick={handleGoogleAuth}>Sign in with Google</button>
//       )}
//     </div>
//   );
// }

// export default GoogleAuthComponent;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function GoogleAuthComponent() {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const storedAccessToken = localStorage.getItem("access_token");
//     if (storedAccessToken) {
//       setAccessToken(storedAccessToken);
//       fetchUserData(storedAccessToken);
//     }
//   }, []);

//   const handleGoogleAuth = async () => {
//     const clientId =
//       "700290340955-0lrlegc2bca690kruris95ehvbfr5feg.apps.googleusercontent.com";
//     const redirectUri = "http://localhost:3002";
//     const scopes = "email profile openid";

//     const authUrl =
//       `https://accounts.google.com/o/oauth2/v2/auth?` +
//       `client_id=${clientId}&` +
//       `redirect_uri=${redirectUri}&` +
//       `scope=${scopes}&` +
//       `response_type=token`;

//     window.location.href = authUrl;
//   };

//   const fetchUserData = (accessToken) => {
//     axios
//       .get(
//         "https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         const email = response.data.emailAddresses[0].value;
//         const name = response.data.names[0].displayName;
//         setUserData({ email, name });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     setAccessToken(null);
//     setUserData(null);
//   };

//   return (
//     <div>
//       {accessToken ? (
//         <div>
//           <p>Logged in as {userData ? userData.name : "loading..."}</p>
//           <p>Email: {userData ? userData.email : "loading..."}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <button onClick={handleGoogleAuth}>Sign in with Google</button>
//       )}
//     </div>
//   );
// }

// export default GoogleAuthComponent;

// import React, { useState } from "react";
// import axios from "axios";
// <script src="https://accounts.google.com/gsi/client" async></script>;

// const OAuth2TokenFetcher = () => {
//   const [accessToken, setAccessToken] = useState("");
//   const clientId =
//     "700290340955-i3ml75f84kvgs8m0ubv7k5ho32035s05.apps.googleusercontent.com";
//   const clientSecret = "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";
//   const scope = "https://www.googleapis.com/auth/calendar"; // Adjust the scope as needed

//   const fetchAccessToken = () => {
//     const authUrl = "https://accounts.google.com/o/oauth2/auth";
//     const tokenUrl = "https://oauth2.googleapis.com/token";

//     // Step 1: Redirect the user to the Google OAuth 2.0 authorization URL
//     const redirectUri = "http://localhost:3002"; // Replace with your actual redirect URI
//     const authParams = new URLSearchParams({
//       client_id: clientId,
//       scope: scope,
//       redirect_uri: redirectUri,
//       response_type: "code",
//     });
//     window.location.href = `${authUrl}?${authParams}`;

//     // Step 2: Receive the authorization code and exchange it for an access token
//     const urlParams = new URLSearchParams(window.location.search);
//     const authorizationCode = urlParams.get("code");

//     if (authorizationCode) {
//       const tokenData = new URLSearchParams();
//       tokenData.append("code", authorizationCode);
//       tokenData.append("client_id", clientId);
//       tokenData.append("client_secret", clientSecret);
//       tokenData.append("redirect_uri", redirectUri);
//       tokenData.append("grant_type", "authorization_code");

//       axios
//         .post(tokenUrl, tokenData)
//         .then((response) => {
//           const tokenInfo = response.data;
//           const access_token = tokenInfo.access_token;
//           setAccessToken(access_token);
//         })
//         .catch((error) => {
//           console.error("Failed to fetch access token:", error);
//         });
//     }
//   };

//   const google = window.google;
//   const client = google.accounts.oauth2.initTokenClient({
//     client_id:
//       "700290340955-i3ml75f84kvgs8m0ubv7k5ho32035s05.apps.googleusercontent.com",
//     scope: "https://www.googleapis.com/auth/documents.readonly",
//     callback: (response) => {
//       logInfo(response.access_token);
//       console.log(response.access_token);
//     },
//   });

//   return (
//     // <div>
//     //   <button onClick={fetchAccessToken}>Fetch Access Token</button>
//     //   {accessToken && <p>Access Token: {accessToken}</p>}
//     // </div>
//     <button onClick={() => client.requestAccessToken()}>Authorize me</button>
//   );
// };

// export default OAuth2TokenFetcher;

// import React from "react";

// const OAuth2TokenFetcher = () => {
//   const google = window.google;

//   const initGoogleOAuth2 = () => {
//     const client = google.accounts.oauth2.initTokenClient({
//       client_id:
//         "700290340955-i3ml75f84kvgs8m0ubv7k5ho32035s05.apps.googleusercontent.com",
//       scope: "https://www.googleapis.com/auth/documents.readonly",
//       callback: (response) => {
//         logInfo(response.access_token);
//         console.log(response.access_token);
//       },
//     });

//     // Trigger the Google OAuth2 authentication process
//     client.requestAccessToken();
//   };

//   const logInfo = (accessToken) => {
//     // You can implement your logic for handling the access token here
//     console.log("Access Token:", accessToken);
//     // You may also perform further actions with the token here
//   };

//   return (
//     <div>
//       <button onClick={initGoogleOAuth2}>Authorize me</button>
//     </div>
//   );
// };

// export default OAuth2TokenFetcher;

// FingerprintComponent.js

// import React, { useEffect } from "react";
// import Fingerprint2 from "fingerprintjs2";

// const FingerprintComponent = () => {
//   useEffect(() => {
//     Fingerprint2.get((components) => {
//       const fingerprint = components
//         .map((component) => component.value)
//         .join("");
//       console.log("Fingerprint:", fingerprint);

//       // Send the fingerprint to your backend API if needed
//       fetch("http://localhost:4001/info", {
//         method: "GET", // or "GET" based on your API
//         headers: {
//           "Content-Type": "application/json",
//           fingerprint: fingerprint,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Response from backend:", data);
//         })
//         .catch((error) => {
//           console.error("Error sending fingerprint to backend:", error);
//         });
//     });
//   }, []);

//   return (
//     <div>
//       <p>Fingerprint will be logged in the console.</p>
//     </div>
//   );
// };

// export default FingerprintComponent;

// import React, { useEffect, useState } from "react";
// import Fingerprint2 from "fingerprintjs2";

// const FingerprintComponent = () => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     Fingerprint2.get((components) => {
//       const fingerprint = components
//         .map((component) => component.value)
//         .join("");

//       // Simulate login (replace with actual login logic)
//       fetch("http://localhost:4001/login1", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ fingerprint }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setToken(data.token);
//         })
//         .catch((error) => {
//           console.error("Error logging in:", error);
//         });
//     });
//   }, []);

//   const fetchData = () => {
//     fetch("http://localhost:4001/info1", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token ? `Bearer ${token}` : "",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Response from backend:", data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   return (
//     <div>
//       <p>Token: {token}</p>
//       <button onClick={fetchData}>Fetch Data</button>
//     </div>
//   );
// };

// export default FingerprintComponent;

// import React, { useEffect } from "react";
// import Fingerprint2 from "fingerprintjs2";

// const FingerprintComponent = () => {
//   useEffect(() => {
//     Fingerprint2.get((components) => {
//       const fingerprint = components
//         .map((component) => component.value)
//         .join("");
//       // const truncatedFingerprint = fingerprint.substring(0, 100); // Adjust the length as needed // Adjust the length as needed // Adjust the length as needed
//       const truncatedFingerprint = fingerprint;
//       console.log("Fingerprint:", truncatedFingerprint);

//       // Send the fingerprint to your backend API in the request body
//       fetch("http://localhost:4001/info", {
//         method: "POST", // or "POST" based on your API
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ fingerprint: truncatedFingerprint }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Response from backend:", data);
//         })
//         .catch((error) => {
//           console.error("Error sending fingerprint to backend:", error);
//         });
//     });
//   }, []);

//   return (
//     <div>
//       <p>Fingerprint will be logged in the console.</p>
//     </div>
//   );
// };

// export default FingerprintComponent;

///////////////////////////////////// Auth info  //////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Fingerprint2 from "fingerprintjs2";

// const API_URL = "http://192.168.68.110:8001"; // Replace with your backend API URL

// // Function to set a cookie
// const setCookie = (name, value) => {
//   document.cookie = `${name}=${value}; path=/`;
// };

// // Function to get a cookie by name
// const getCookie = (name) => {
//   const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
//   return cookieValue ? cookieValue.pop() : null;
// };

// // Function to get a fingerprint
// const getFingerprint = async () => {
//   return new Promise((resolve) => {
//     Fingerprint2.get((components) => {
//       const fingerprint = components
//         .map((component) => component.value)
//         .join("");
//       resolve(fingerprint);
//     });
//   });
// };

// const AuthForm = ({ onSubmit, buttonText, initialData }) => {
//   const [formData, setFormData] = useState(initialData || {});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Include fingerprint in the form data
//     // const fingerprint = await getFingerprint();
//     // console.log(fingerprint);
//     // onSubmit({ ...formData, fingerprint });
//     onSubmit({ ...formData });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="phone"
//         name="phone"
//         placeholder="phone"
//         value={formData.phone || ""}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="type"
//         placeholder="type"
//         value={formData.type || ""}
//         onChange={handleChange}
//       />
//       <input
//         type="username"
//         name="username"
//         placeholder="username"
//         value={formData.username || ""}
//         onChange={handleChange}
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email || ""}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password || ""}
//         onChange={handleChange}
//       />
//       <button type="submit">{buttonText}</button>
//     </form>
//   );
// };

// const FingerprintComponent = ({ onFetchInfo }) => {
//   return (
//     <div>
//       <button onClick={onFetchInfo}>Fetch Info</button>
//     </div>
//   );
// };

// const App = () => {
//   const [fetchedInfo, setFetchedInfo] = useState(null);
//   const handleRegistration = async (formData) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/reg`, formData);
//       console.log(response);

//       setCookie("token", response.data.data.token);
//       console.log("Registration successful:", response.data.data.token);
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   const handleLogin = async (formData) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/lgin`, formData);
//       setCookie("token", response.data.data);
//       console.log("Login successful:", response.data.data);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   const handleFetchInfo = async () => {
//     try {
//       const token = getCookie("token");
//       const fingerprint = await getFingerprint();
//       const response = await axios.post(`${API_URL}/auth/profile`, {
//         headers: {
//           Authorization: token,
//           // fingerprint: fingerprint,
//         },
//       });
//       console.log("Info fetched successfully:", response);
//       setFetchedInfo(response);
//     } catch (error) {
//       console.error("Error fetching info:", error);
//       setFetchedInfo(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Authentication Example</h1>
//       <AuthForm onSubmit={handleRegistration} buttonText="Register" />
//       <>Only give email and pass while logging in</>
//       <AuthForm onSubmit={handleLogin} buttonText="Login" />
//       <FingerprintComponent onFetchInfo={handleFetchInfo} />
//       {fetchedInfo && (
//         <div>
//           <h2>Fetched Info</h2>
//           <pre>{JSON.stringify(fetchedInfo, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

///////////////////////////////////// Auth info  //////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { PDFDocument } from "pdf-lib";

// const App = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const listPdfFormFields = async () => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file");
//         return;
//       }

//       const pdfBytes = await selectedFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const form = pdfDoc.getForm();
//       const fieldNames = form.getFields().map((field) => field.getName());
//       console.log("PDF Form Fields:", fieldNames);
//     } catch (error) {
//       console.error("Error listing PDF form fields:", error);
//     }
//   };

//   // const fillPdfForm = async (pdfDoc, formData) => {
//   //   const form = pdfDoc.getForm();

//   //   // Log field names
//   //   const fieldNames = form.getFields().map((field) => field.getName());
//   //   console.log("Field Names:", fieldNames);

//   //   // Fill form fields with data
//   //   form
//   //     .getTextField("Doctor Phone Number Doctor")
//   //     .setText(formData.DoctorPhoneNumberDoctor);
//   //   form.getTextField("Doctors Name").setText(formData.DoctorsName);
//   //   form.getTextField("Patient Name").setText(formData.PatientName);
//   //   form.getTextField("Dob_af_date").setText(formData.Dob_af_date);
//   //   form.getTextField("Phone Number").setText(formData.PhoneNumber);

//   //   // Add more lines for other form fields

//   //   return pdfDoc;
//   // };
//   const fillPdfForm = async (pdfDoc, formData) => {
//     const form = pdfDoc.getForm();

//     // Log field names
//     const fieldNames = form.getFields().map((field) => field.getName());
//     console.log("Field Names:", fieldNames);

//     // Fill form fields with data
//     const textField = form.getTextField("Doctor Phone Number Doctor");
//     if (textField) {
//       textField.setText(formData.DoctorPhoneNumberDoctor);
//     } else {
//       console.error("Text field not found:", "Doctor Phone Number Doctor");
//     }

//     // Repeat similar checks for other fields

//     return pdfDoc;
//   };

//   const handleFillPdf = async () => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file");
//         return;
//       }

//       const pdfBytes = await selectedFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const formData = {
//         DoctorPhoneNumberDoctor: "1234567890",
//         DoctorsName: "Dr. Foysal Ahamed Nirob",
//         PatientName: "Mr. X",
//         Dob_af_date: "12/12/2020",
//         PhoneNumber: "1234567890",
//       };

//       const filledPdfDoc = await fillPdfForm(pdfDoc, formData);

//       // Save the filled PDF
//       const filledPdfBytes = await filledPdfDoc.save();
//       const filledPdfBlob = new Blob([filledPdfBytes], {
//         type: "application/pdf",
//       });

//       // Create a download link and trigger click
//       const downloadLink = document.createElement("a");
//       downloadLink.href = URL.createObjectURL(filledPdfBlob);
//       downloadLink.download = "filledForm.pdf";
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     } catch (error) {
//       console.error("Error filling PDF:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={listPdfFormFields}>List Form Fields</button>
//       <button onClick={handleFillPdf}>Fill PDF</button>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup } from "pdf-lib";

// const App = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const listPdfFormFields = async () => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file");
//         return;
//       }

//       const pdfBytes = await selectedFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const form = pdfDoc.getForm();
//       const fieldNames = form.getFields().map((field) => field.getName());
//       console.log("PDF Form Fields:", fieldNames);
//     } catch (error) {
//       console.error("Error listing PDF form fields:", error);
//     }
//   };

// const fillPdfForm = async (pdfDoc, formData) => {
//   try {
//     console.log("Filling PDF form...");
//     const form = pdfDoc.getForm();
//     const fields = form.getFields();
//     console.log("Filling PDF form... 2");

//     fields.forEach((field) => {
//       console.log(
//         `Field: ${field.getName()}, Type: ${field.constructor.name}`
//       );
//     });

//     Object.keys(formData).forEach((fieldName) => {
//       const field = fields.find((f) => f.getName() === fieldName);

//       if (field) {
//         const fieldValue = formData[fieldName];

//         if (field instanceof PDFTextField) {
//           console.log(
//             `Filling text field: ${fieldName}, Value: ${fieldValue}`
//           );
//           field.setText(fieldValue);
//         } else if (field instanceof PDFCheckBox) {
//           console.log(`Checking checkbox: ${fieldName}`);
//           // For checkboxes, use the check method
//           field.check();
//         } else if (field instanceof PDFRadioGroup) {
//           console.log(
//             `Selecting radio button: ${fieldName}, Value: ${fieldValue}`
//           );
//           field.select(fieldValue);
//         }
//       }
//     });

//     return pdfDoc;
//   } catch (error) {
//     console.error("Error filling PDF form:", error);
//     throw error;
//   }
// };

// const fillPdfForm = async (pdfDoc, formData) => {
//   try {
//     console.log("Filling PDF form...");
//     const form = pdfDoc.getForm();
//     const fields = form.getFields();

//     // Log the existing field values for debugging
//     fields.forEach((field) => {
//       console.log(
//         `Existing value for ${field.getName()}: ${field.getValue()}`
//       );
//     });

//     Object.keys(formData).forEach((fieldName) => {
//       const field = fields.find((f) => f.getName() === fieldName);

//       if (field) {
//         const fieldValue = formData[fieldName];

//         console.log(
//           `Processing field: ${fieldName}, Type: ${field.constructor.name}, Value: ${fieldValue}`
//         );

//         if (field instanceof PDFTextField) {
//           console.log(
//             `Filling text field: ${fieldName}, Value: ${fieldValue}`
//           );
//           field.setText(fieldValue);
//         } else if (field instanceof PDFCheckBox) {
//           console.log(`Checking checkbox: ${fieldName}`);
//           field.check();
//         } else if (field instanceof PDFRadioGroup) {
//           console.log(
//             `Selecting radio button: ${fieldName}, Value: ${fieldValue}`
//           );
//           field.select(fieldValue);
//         }
//       }
//     });

//     // Log the modified field values for debugging
//     fields.forEach((field) => {
//       console.log(
//         `Modified value for ${field.getName()}: ${field.getValue()}`
//       );
//     });

//     return pdfDoc;
//   } catch (error) {
//     console.error("Error filling PDF form:", error);
//     throw error;
//   }
// };

//   const fillPdfForm = async (pdfDoc, formData) => {
//     try {
//       console.log("Filling PDF form...");
//       const form = pdfDoc.getForm();
//       const fields = form.getFields();

//       // Log the existing field values for debugging
//       fields.forEach((field) => {
//         if (field.getValue) {
//           console.log(
//             `Existing value for ${field.getName()}: ${field.getValue()}`
//           );
//         } else {
//           console.log(
//             `Field ${field.getName()} does not have a getValue method.`
//           );
//         }
//       });

//       Object.keys(formData).forEach((fieldName) => {
//         const field = fields.find((f) => f.getName() === fieldName);

//         if (field) {
//           const fieldValue = formData[fieldName];

//           console.log(
//             `Processing field: ${fieldName}, Type: ${field.constructor.name}, Value: ${fieldValue}`
//           );

//           if (field instanceof PDFTextField) {
//             console.log(
//               `Filling text field: ${fieldName}, Value: ${fieldValue}`
//             );
//             field.setText(fieldValue);
//           } else if (field instanceof PDFCheckBox) {
//             console.log(`Checking checkbox: ${fieldName}`);
//             field.check();
//           } else if (field instanceof PDFRadioGroup) {
//             console.log(
//               `Selecting radio button: ${fieldName}, Value: ${fieldValue}`
//             );
//             field.select(fieldValue);
//           }
//         }
//       });

//       // Log the modified field values for debugging
//       fields.forEach((field) => {
//         if (field.getValue) {
//           console.log(
//             `Modified value for ${field.getName()}: ${field.getValue()}`
//           );
//         } else {
//           console.log(
//             `Field ${field.getName()} does not have a getValue method.`
//           );
//         }
//       });
//       console.log("pdfDoc", pdfDoc);

//       return pdfDoc;
//     } catch (error) {
//       console.error("Error filling PDF form:", error);
//       throw error;
//     }
//   };

//   // const handleFillPdf = async () => {
//   //   try {
//   //     if (!selectedFile) {
//   //       alert("Please select a PDF file");
//   //       return;
//   //     }

//   //     const pdfBytes = await selectedFile.arrayBuffer();
//   //     const pdfDoc = await PDFDocument.load(pdfBytes);

//   //     const formData = {
//   //       // "Doctor Phone Number Doctor": "1234567890",
//   //       // "Fax Number": "faaxsdfsf",
//   //       // "Address 1": "address 1",
//   //       // "Address 2": "address 2",
//   //       // "Doctors Name": "Dr. Foysal Ahamed Nirob",
//   //       "Patient Name": "Mr. X",
//   //       Dob_af_date: "12/12/2020",
//   //       "Current Address": "wejffweojf",
//   //       "Phone Number": "1234567890",
//   //     };

//   //     // Create a new PDF document
//   //     const filledPdfDoc = await PDFDocument.create();

//   //     // Copy pages from the original document to the new document
//   //     const pages = await filledPdfDoc.copyPages(
//   //       pdfDoc,
//   //       pdfDoc.getPageIndices()
//   //     );
//   //     pages.forEach((page) => filledPdfDoc.addPage(page));

//   //     // Call the fillPdfForm function with the writable PDF document
//   //     await fillPdfForm(filledPdfDoc, formData);

//   //     // Save the filled PDF
//   //     const filledPdfBytes = await filledPdfDoc.save();

//   //     // Create a Blob from the PDF data
//   //     const filledPdfBlob = new Blob([filledPdfBytes], {
//   //       type: "application/pdf",
//   //     });

//   //     // Create a download link and trigger click
//   //     const downloadLink = document.createElement("a");
//   //     downloadLink.href = URL.createObjectURL(filledPdfBlob);
//   //     downloadLink.download = "filledForm.pdf";
//   //     document.body.appendChild(downloadLink);
//   //     downloadLink.click();
//   //     document.body.removeChild(downloadLink);
//   //   } catch (error) {
//   //     console.error("Error filling PDF:", error);
//   //   }
//   // };
//   const handleFillPdf = async () => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file");
//         return;
//       }

//       const pdfBytes = await selectedFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);
//       console.log("pdfDoc", pdfDoc);

//       const formData = {
//         // "Doctor Phone Number Doctor": "1234567890",
//         // "Fax Number": "faaxsdfsf",
//         // "Address 1": "address 1",
//         // "Address 2": "address 2",
//         // "Doctors Name": "Dr. Foysal Ahamed Nirob",
//         "Patient Name": "Mr. X",
//         //   Dob_af_date: "12/12/2020",
//         //   "Current Address": "",
//         //   "Phone Number": "1234567890",
//       };

//       // Modify the existing PDF document directly
//       const data = await fillPdfForm(pdfDoc, formData);
//       console.log(data);

//       // // Save the modified PDF
//       // const filledPdfBytes = await pdfDoc.save();

//       // // Create a Blob from the PDF data
//       // const filledPdfBlob = new Blob([filledPdfBytes], {
//       //   type: "application/pdf",
//       // });

//       // // Create a download link and trigger click
//       // const downloadLink = document.createElement("a");
//       // downloadLink.href = URL.createObjectURL(filledPdfBlob);
//       // downloadLink.download = "filledForm.pdf";
//       // document.body.appendChild(downloadLink);
//       // downloadLink.click();
//       // document.body.removeChild(downloadLink);
//     } catch (error) {
//       console.error("Error filling PDF:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={listPdfFormFields}>List Form Fields</button>
//       <button onClick={handleFillPdf}>Fill PDF</button>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { PDFDocument } from "pdf-lib";

// const App = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const listPdfFormFields = async () => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file");
//         return;
//       }

//       const pdfBytes = await selectedFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const form = pdfDoc.getForm();
//       const fieldNames = form.getFields().map((field) => field.getName());
//       console.log("PDF Form Fields:", fieldNames);
//     } catch (error) {
//       console.error("Error listing PDF form fields:", error);
//     }
//   };

//   const fillPdfForm = async (formData) => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file");
//         return;
//       }

//       const pdfBytes = await selectedFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const form = pdfDoc.getForm();
//       const fields = form.getFields();

//       Object.keys(formData).forEach((fieldName) => {
//         const field = fields.find((f) => f.getName() === fieldName);

//         if (field) {
//           const fieldValue = formData[fieldName];

//           if (field.getText) {
//             console.log(
//               `Filling text field: ${fieldName}, Value: ${fieldValue}`
//             );
//             field.setText(fieldValue);
//           } else if (field.check) {
//             console.log(`Checking checkbox: ${fieldName}`);
//             field.check();
//           } else if (field.select) {
//             console.log(
//               `Selecting radio button: ${fieldName}, Value: ${fieldValue}`
//             );
//             field.select(fieldValue);
//           }
//         }
//       });

//       // Save the filled PDF
//       const filledPdfBytes = await pdfDoc.save();

//       // Create a Blob from the PDF data
//       const filledPdfBlob = new Blob([filledPdfBytes], {
//         type: "application/pdf",
//       });

//       // Create a download link and trigger click
//       const downloadLink = document.createElement("a");
//       downloadLink.href = URL.createObjectURL(filledPdfBlob);
//       downloadLink.download = "filledForm.pdf";
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     } catch (error) {
//       console.error("Error filling PDF form:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={listPdfFormFields}>List Form Fields</button>
//       <button
//         onClick={() =>
//           fillPdfForm({
//             "Doctor Phone Number Doctor": "1234567890",
//             "Fax Number": "faaxsdfsf",
//             "Address 1": "address 1",
//             "Address 2": "address 2",
//             "Doctors Name": "Dr. Foysal Ahamed Nirob",
//             "Patient Name": "Mr. X",
//             Dob_af_date: "12/12/2020",
//             "Current Address": "",
//             "Phone Number": "1234567890",
//           })
//         }
//       >
//         Fill PDF
//       </button>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import { PDFDocument } from "@pdf-lib/core";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDownloadLink(null);
  };

  const modifyPDF = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a PDF file.");
        return;
      }

      const pdfBytes = await readFileAsync(selectedFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Modify form fields (replace 'FieldName' with the actual field name)
      const textField = pdfDoc.getForm().getTextField("FieldName");
      if (textField) {
        textField.setText("New Data");
      } else {
        console.error("Field not found");
        return;
      }

      const modifiedPdfBytes = await pdfDoc.save();

      // Create a Blob from the modified PDF data
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(modifiedPdfBlob);
      link.download = "modified_form.pdf";

      // Trigger a click on the link to start the download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
      setDownloadLink(link);
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={modifyPDF}>Fill PDF Form</button>
      {downloadLink && (
        <p>
          <a href={downloadLink.href} download={downloadLink.download}>
            Download Modified PDF
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
