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

const VideoPlayer = () => {
  useEffect(() => {
    // Replace the video source URL with your backend endpoint
    const videoUrl =
      "http://localhost:3000/vd/9ac419121bee456ca6664fba33ef6fa7/output.m3u8";

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
