import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import duplicate from "./components/duplicate1";
import videopa from "./components/VideoPlayer1";

function App() {
  return (
    <div className="App">
      <h1>Video Player</h1>

      <VideoPlayer videoUrl="http://localhost:3000/vd/9ac419121bee456ca6664fba33ef6fa7/output.m3u8" />
      <h1>Video Player</h1>
      {/* <videopa /> */}
      <duplicate />
    </div>
  );
}

export default App;
