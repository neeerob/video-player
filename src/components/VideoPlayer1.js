import React, { useEffect, useState, useRef } from "react";
import videojs from "video.js";

const VideoPlayer1 = () => {
  const videoRef = useRef(null);
  const [m3u8Data, setM3u8Data] = useState(null);
  const [segmentUrls, setSegmentUrls] = useState([]);
  const [segmentDuration, setSegmentDuration] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  useEffect(() => {
    const videoId = "ccaf2f3acbd84031b511c6d35c1e82ab";

    // Fetch the .m3u8 file from your backend
    fetch(`http://localhost:3000/vd/${videoId}`)
      .then((response) => response.text())
      .then((data) => {
        setM3u8Data(data);

        // Parse .m3u8 to get segment URLs and duration
        const lines = data.split("\n");
        const urls = lines
          .filter((line) => line.trim().length > 0 && !line.startsWith("#"))
          .map((line) => {
            return `http://localhost:3000/vd/${videoId}/${line}`;
          });
        setSegmentUrls(urls);

        // Extract segment duration from the first segment's info
        if (urls.length > 0) {
          const firstSegmentInfo = lines.find((line) =>
            line.includes("#EXTINF:")
          );
          if (firstSegmentInfo) {
            const duration = parseFloat(
              firstSegmentInfo.split(":")[1].split(",")[0]
            );
            setSegmentDuration(duration);
          }
        }
      })
      .catch((error) => console.error("Error fetching .m3u8 file:", error));
  }, []);

  useEffect(() => {
    if (segmentUrls.length > 0) {
      const videoOptions = {
        controls: true,
        autoplay: false, // Disable autoplay, let the player handle it
        sources: [
          {
            src: segmentUrls[currentSegmentIndex],
            type: "application/x-mpegURL",
          },
        ],
      };

      const player = videojs(
        videoRef.current,
        videoOptions,
        function onPlayerReady() {
          console.log("Player is ready");
        }
      );

      player.on("timeupdate", () => {
        const currentTime = player.currentTime();
        const nextSegmentTime = (currentSegmentIndex + 1) * segmentDuration;

        if (currentTime >= nextSegmentTime) {
          // Load the next segment
          if (currentSegmentIndex > 0) {
            // Delete the previous segment if not the first one
            deletePreviousSegment(segmentUrls[currentSegmentIndex - 1]);
          }
          player.src({
            src: segmentUrls[currentSegmentIndex + 1],
            type: "application/x-mpegURL",
          });
          setCurrentSegmentIndex(currentSegmentIndex + 1);
        }
      });

      player.on("ended", () => {
        console.log("Video has ended");
        // Optionally, delete all segments once the video is finished
        deleteAllSegments();
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [segmentUrls, segmentDuration, currentSegmentIndex]);

  const deletePreviousSegment = (segmentUrl) => {
    // Implement your logic to delete the previous segment on your server
    // You may use a DELETE request to the segment URL
  };

  const deleteAllSegments = () => {
    // Implement your logic to delete all segments once the video is finished
  };

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer1;
