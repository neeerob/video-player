// import React, { useEffect, useState, useRef } from "react";
// import videojs from "video.js";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const [m3u8Data, setM3u8Data] = useState(null);
//   const [segmentUrls, setSegmentUrls] = useState([]);
//   const [segmentDuration, setSegmentDuration] = useState(0);

//   useEffect(() => {
//     const videoId = "ccaf2f3acbd84031b511c6d35c1e82ab";

//     // Fetch the .m3u8 file from your backend
//     fetch(`http://localhost:3000/vd/${videoId}`)
//       .then((response) => response.text())
//       .then((data) => {
//         setM3u8Data(data);

//         // Parse .m3u8 to get segment URLs and duration
//         const lines = data.split("\n");
//         const urls = lines
//           .filter((line) => line.trim().length > 0 && !line.startsWith("#"))
//           .map((line) => {
//             // Assuming relative URLs, you may need to adjust this logic if your .m3u8 file contains absolute URLs
//             return `http://localhost:3000/vd/${videoId}/${line}`;
//           });
//         setSegmentUrls(urls);

//         // Extract segment duration from the first segment's info
//         if (urls.length > 0) {
//           const firstSegmentInfo = lines.find((line) =>
//             line.includes("#EXTINF:")
//           );
//           if (firstSegmentInfo) {
//             const duration = parseFloat(
//               firstSegmentInfo.split(":")[1].split(",")[0]
//             );
//             setSegmentDuration(duration);
//           }
//         }
//       })
//       .catch((error) => console.error("Error fetching .m3u8 file:", error));
//   }, []);

//   useEffect(() => {
//     if (segmentUrls.length > 0) {
//       const videoOptions = {
//         controls: true,
//         autoplay: true, // Enable autoplay to play the video immediately
//         sources: [
//           {
//             src: segmentUrls[0],
//             type: "application/vnd.apple.mpegurl",
//           },
//         ],
//       };

//       const player = videojs(
//         videoRef.current,
//         videoOptions,
//         function onPlayerReady() {
//           console.log("Player is ready");
//         }
//       );

//       let segmentIndex = 1;
//       player.on("timeupdate", () => {
//         if (segmentIndex < segmentUrls.length) {
//           const currentTime = player.currentTime();
//           const nextSegmentTime = segmentIndex * segmentDuration;

//           if (currentTime >= nextSegmentTime) {
//             // Load the next segment
//             player.src({
//               src: segmentUrls[segmentIndex],
//               type: "application/x-mpegURL",
//             });
//             segmentIndex++;
//           }
//         }
//       });

//       player.on("ended", () => {
//         console.log("Video has ended");
//       });

//       return () => {
//         if (player) {
//           player.dispose();
//         }
//       };
//     }
//   }, [segmentUrls, segmentDuration]);

//   return (
//     <div data-vjs-player>
//       <video ref={videoRef} className="video-js vjs-default-skin" />
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useEffect } from "react";

const VideoPlayer = ({ videoUrl }) => {
  useEffect(() => {
    // Replace the video source URL with your backend endpoint

    // Get a reference to the video element
    const videoElement = document.getElementById("videoPlayer");

    // Set the video source
    videoElement.src = videoUrl;

    // Load and play the video
    videoElement.load();
    videoElement.play();
  }, []);

  return (
    <div>
      <video id="videoPlayer" controls autoPlay>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

// import React, { useEffect, useRef, useState } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const [tsFiles, setTsFiles] = useState([]);
//   const [currentSegment, setCurrentSegment] = useState(0);
//   const maxSegments = 3; // Maximum number of segments to load at a time

//   useEffect(() => {
//     const videoUrl =
//       "http://localhost:3000/vd/9ac419121bee456ca6664fba33ef6fa7/";
//     const tsURL = "http://localhost:3000/vd/9ac419121bee456ca6664fba33ef6fa7/";
//     const videoElement = videoRef.current;

//     const fetchM3U8 = async () => {
//       try {
//         const response = await fetch(videoUrl);
//         if (response.ok) {
//           const m3u8Text = await response.text();
//           const lines = m3u8Text.split("\n");
//           const tsFiles = [];

//           for (let i = 0; i < lines.length; i++) {
//             if (lines[i].startsWith("#EXTINF:")) {
//               tsFiles.push(lines[i + 1]);
//             }
//           }

//           setTsFiles(tsFiles);
//         } else {
//           console.error(`Failed to fetch M3U8: ${videoUrl}`);
//         }
//       } catch (error) {
//         console.error("Error while fetching M3U8:", error);
//       }
//     };

//     const loadNextSegment = () => {
//       if (currentSegment >= tsFiles.length) {
//         // All segments have been played
//         return;
//       }

//       if (currentSegment >= maxSegments) {
//         // Remove previous segments
//         const sourceList = videoElement.getElementsByTagName("source");
//         for (let i = 0; i < maxSegments; i++) {
//           videoElement.removeChild(sourceList[0]);
//         }
//       }

//       const source = document.createElement("source");
//       source.src = `${videoUrl}/${tsFiles[currentSegment]}`;
//       source.type = "video/mp4";
//       videoElement.appendChild(source);

//       videoElement.load();
//       videoElement.play();

//       setCurrentSegment(currentSegment + 1);
//     };

//     videoElement.addEventListener("ended", loadNextSegment);

//     fetchM3U8();

//     return () => {
//       videoElement.removeEventListener("ended", loadNextSegment);
//     };
//   }, [currentSegment, tsFiles]);

//   return (
//     <div>
//       <video ref={videoRef} controls autoPlay>
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;

// import React, { useEffect, useRef } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const videoUrl =
//       "http://localhost:3000/vd/9ac419121bee456ca6664fba33ef6fa7/output.m3u8";
//     const tsUrl = "http://localhost:3000/vd/9ac419121bee456ca6664fba33ef6fa7";
//     const videoElement = videoRef.current;

//     let currentSegment = 0;
//     let maxSegments = 3; // Set the maximum number of segments to load and play

//     const loadNextSegment = () => {
//       if (currentSegment >= maxSegments) {
//         // Only keep the last 3 segments
//         const sourceList = videoElement.getElementsByTagName("source");
//         if (sourceList.length > maxSegments - 1) {
//           videoElement.removeChild(sourceList[0]);
//         }
//         currentSegment--;
//       }

//       const source = document.createElement("source");
//       source.src = `${tsUrl}/output${currentSegment}.ts`;
//       source.type = "video/mp4";
//       videoElement.appendChild(source);

//       currentSegment++;
//       videoElement.load();
//       videoElement.play();
//     };

//     // Listen to the "ended" event to load the next segment
//     videoElement.addEventListener("ended", loadNextSegment);

//     loadNextSegment();

//     return () => {
//       videoElement.removeEventListener("ended", loadNextSegment);
//     };
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} controls autoPlay>
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;

// import React, { useEffect, useState, useRef } from "react";
// import videojs from "video.js";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const [m3u8Data, setM3u8Data] = useState(null);
//   const [segmentUrls, setSegmentUrls] = useState([]);
//   const [segmentDuration, setSegmentDuration] = useState(0);
//   const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

//   useEffect(() => {
//     const videoId = "ccaf2f3acbd84031b511c6d35c1e82ab";

//     // Fetch the .m3u8 file from your backend
//     fetch(`http://localhost:3000/vd/${videoId}`)
//       .then((response) => response.text())
//       .then((data) => {
//         setM3u8Data(data);

//         // Parse .m3u8 to get segment URLs and duration
//         const lines = data.split("\n");
//         const urls = lines
//           .filter((line) => line.trim().length > 0 && !line.startsWith("#"))
//           .map((line) => {
//             return `http://localhost:3000/vd/${videoId}/${line}`;
//           });
//         setSegmentUrls(urls);

//         // Extract segment duration from the first segment's info
//         if (urls.length > 0) {
//           const firstSegmentInfo = lines.find((line) =>
//             line.includes("#EXTINF:")
//           );
//           if (firstSegmentInfo) {
//             const duration = parseFloat(
//               firstSegmentInfo.split(":")[1].split(",")[0]
//             );
//             setSegmentDuration(duration);
//           }
//         }
//       })
//       .catch((error) => console.error("Error fetching .m3u8 file:", error));
//   }, []);

//   useEffect(() => {
//     if (segmentUrls.length > 0) {
//       const videoOptions = {
//         controls: true,
//         autoplay: false, // Disable autoplay, let the player handle it
//         sources: [
//           {
//             src: segmentUrls[currentSegmentIndex],
//             type: "application/x-mpegURL",
//           },
//         ],
//       };

//       const player = videojs(
//         videoRef.current,
//         videoOptions,
//         function onPlayerReady() {
//           console.log("Player is ready");
//         }
//       );

//       player.on("timeupdate", () => {
//         const currentTime = player.currentTime();
//         const nextSegmentTime = (currentSegmentIndex + 1) * segmentDuration;

//         if (currentTime >= nextSegmentTime) {
//           // Load the next segment
//           if (currentSegmentIndex > 0) {
//             // Delete the previous segment if not the first one
//             deletePreviousSegment(segmentUrls[currentSegmentIndex - 1]);
//           }
//           player.src({
//             src: segmentUrls[currentSegmentIndex + 1],
//             type: "application/x-mpegURL",
//           });
//           setCurrentSegmentIndex(currentSegmentIndex + 1);
//         }
//       });

//       player.on("ended", () => {
//         console.log("Video has ended");
//         // Optionally, delete all segments once the video is finished
//         deleteAllSegments();
//       });

//       return () => {
//         if (player) {
//           player.dispose();
//         }
//       };
//     }
//   }, [segmentUrls, segmentDuration, currentSegmentIndex]);

//   const deletePreviousSegment = (segmentUrl) => {
//     // Implement your logic to delete the previous segment on your server
//     // You may use a DELETE request to the segment URL
//   };

//   const deleteAllSegments = () => {
//     // Implement your logic to delete all segments once the video is finished
//   };

//   return (
//     <div data-vjs-player>
//       <video ref={videoRef} className="video-js vjs-default-skin" />
//     </div>
//   );
// };

// export default VideoPlayer;
