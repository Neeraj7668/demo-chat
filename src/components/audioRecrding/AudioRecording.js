import useRecorder from "./useRecorder";

function AudioRecording() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  return (
    <div className="App">
      <audio src={audioURL} controls />
      {/* <button onClick={startRecording} disabled={isRecording}>
        start recording
      </button> */}

      <button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          checked={isRecording}
          onClick={startRecording}
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">
          Default switch checkbox input
        </label>
      </div>
    </div>
  );
}

export default AudioRecording;
