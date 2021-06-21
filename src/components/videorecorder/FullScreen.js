import React, { useState } from "react";

const FullScreen = () => {
  const [player, setPlayer] = useState(false);

  // const startVideo = () => {
  //   setPlayer(true);
  //   const stream = navigator.getUserMedia(
  //     {
  //       video: true,
  //       audio: true,
  //     },

  //     (stream) => {
  //       let video = document.getElementsByClassName("app__videoFeed")[0];
  //       if (video) {
  //         video.srcObject = stream;
  //       }
  //     },
  //     (err) => console.log(err)
  //   );
  // };
  return (
    <>
      {" "}
      <div className="">
        <video muted autoPlay className="app__videoFeeds"></video>
      </div>
      <div className="app__input">
        {player ? (
          <button className="btn btn-danger">stop</button>
        ) : (
          <button className="btn btn-primary">start</button>
        )}
      </div>
    </>
  );
};

export default FullScreen;
