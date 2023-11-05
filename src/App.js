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

import React from "react";

const OAuth2TokenFetcher = () => {
  const google = window.google;

  const initGoogleOAuth2 = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "700290340955-i3ml75f84kvgs8m0ubv7k5ho32035s05.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/documents.readonly",
      callback: (response) => {
        logInfo(response.access_token);
        console.log(response.access_token);
      },
    });

    // Trigger the Google OAuth2 authentication process
    client.requestAccessToken();
  };

  const logInfo = (accessToken) => {
    // You can implement your logic for handling the access token here
    console.log("Access Token:", accessToken);
    // You may also perform further actions with the token here
  };

  return (
    <div>
      <button onClick={initGoogleOAuth2}>Authorize me</button>
    </div>
  );
};

export default OAuth2TokenFetcher;
