import React, { useState, useEffect } from "react";
// import "./video.css";
import { RecordRTCPromisesHandler } from "recordrtc";

import { animated, useSpring } from "react-spring";

import "video-react/dist/video-react.css";

import { saveAs } from "file-saver";
import { useDrag } from "react-use-gesture";

function VideoRecording() {
  const [toggle, setToggle] = useState(false);

  const [recorder, setRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [type, setType] = useState("video");
  const [stopCamera, setStopCamera] = useState(null);
  const [player, setPlayer] = useState(false);
  const logoPos = useSpring({ x: 0, y: 0 });
  const [checked, setChecked] = useState(false);
  const [thumbCheck, setThumbCheck] = useState(false);

  var screenWidth;
  var screenheight;
  // bind position
  const binglogPosition = useDrag((params) => {
    logoPos.x.set(params.offset[0]);
    logoPos.y.set(params.offset[1]);
  });

  const startVideo = () => {
    setPlayer(true);
    const stream = navigator.getUserMedia(
      {
        video: true,
        audio: true,
      },

      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        let video1 = document.getElementsByClassName("app__videoFeed2")[0];
        let video2 = document.getElementsByClassName("app__videoFeed3")[0];
        setStopCamera(stream);
        if (video) {
          video.srcObject = stream;
        }
        if (video1) {
          video1.srcObject = stream;
        }
        if (video2) {
          video2.srcObject = stream;
        }
      },
      (err) => console.log(err)
    );
  };

  const startRecording = async () => {
    const fullvideo = document.getElementById("full__video");
    fullvideo.style.display = "inline";
    startVideo();
    setChecked(true);
    setThumbCheck(false);
    const mediaDevices = navigator.mediaDevices;
    const stream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);

    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "video",
    });

    setRecorder(recorder);
    await recorder.startRecording();
  };

  const stopVideo = async () => {
    setPlayer(false);
    setThumbCheck(false);
    setChecked(false);

    stopCamera.getTracks().forEach((track) => {
      track.stop();
    });
    const fullvideo = document.getElementById("full__video");
    fullvideo.style.display = "none";
    const thumb = document.getElementById("thumbnail__video");
    thumb.style.display = "none";

    await recorder.stopRecording();
    const blob = await recorder.getBlob();
    setVideoBlob(blob);

    setStream(null);
    setRecorder(null);
    stream.stop();
    if (blob) {
      saveAs(blob, `Video-${Date.now()}.webm`);
      alert("download");
    }
  };

  const thumbnail = () => {
    const thumb = document.getElementById("thumbnail__video");
    thumb.style.display = "inline";
    const fullvideo = document.getElementById("full__video");
    fullvideo.style.display = "none";
    // setToggle(false);
  };

  const fullScreen = () => {
    const thumb = document.getElementById("thumbnail__video");
    thumb.style.display = "none";
  };

  useEffect(() => {
    fullScreen();
  }, []);

  const handleChange = (e) => {
    const full_checked = e.target.checked;
    setChecked(full_checked);
    if (full_checked === true) {
      const fullvideo = document.getElementById("full__video");
      fullvideo.style.display = "inline";
      const thumb = document.getElementById("thumbnail__video");
      thumb.style.display = "none";
      setThumbCheck(false);
    } else {
      const thumb = document.getElementById("thumbnail__video");
      thumb.style.display = "none";
      const fullvideo = document.getElementById("full__video");
      fullvideo.style.display = "none";
      setThumbCheck(false);
    }
  };
  const handleChangeThumb = (e) => {
    const thumbChecked = e.target.checked;
    setThumbCheck(thumbChecked);
    if (thumbChecked === true) {
      const fullvideo = document.getElementById("full__video");
      fullvideo.style.display = "none";
      const thumb = document.getElementById("thumbnail__video");
      thumb.style.display = "inline";
      setChecked(false);
    } else {
      const thumb = document.getElementById("thumbnail__video");
      thumb.style.display = "none";
      const fullvideo = document.getElementById("full__video");
      fullvideo.style.display = "inline";
      setChecked(true);
    }
  };
  return (
    <div className="mt-4 container">
      <div id="full__video">
        <video
          muted
          autoPlay
          style={{ width: "700px !important", height: "200px" }}
          className="app__videoFeed"
        ></video>
      </div>

      <div className="app__input">
        {player ? (
          <button className="btn btn-danger" onClick={stopVideo}>
            stop
          </button>
        ) : (
          <button className="btn btn-primary" onClick={startRecording}>
            start
          </button>
        )}
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={checked}
            onChange={handleChange}
          />{" "}
          <span>Full Screen</span>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={thumbCheck}
            onChange={handleChangeThumb}
          />{" "}
          <span>Thumbnail</span>
        </div>
        <div id="thumbnail__video">
          <animated.div
            {...binglogPosition()}
            style={{ x: logoPos.x, y: logoPos.y }}
          >
            <video
              height="200px"
              width="300px"
              muted
              autoPlay
              className="app__videoFeed2"
            ></video>
          </animated.div>
        </div>

        <div id="" className="float-right">
          <animated.div
            {...binglogPosition()}
            style={{ x: logoPos.x, y: logoPos.y }}
          >
            <video
              height="200px"
              width="300px"
              muted
              autoPlay
              className="app__videoFeed3"
            ></video>
          </animated.div>
        </div>
      </div>
    </div>
  );
}

export default VideoRecording;
