import React, { useState } from "react";

const Timer = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [inerv, setInerv] = useState(null);

  var updateMs = time.ms;
  var updateS = time.s;
  var updateM = time.m;
  var updateH = time.h;
  const start = () => {
    run();
    setInerv(setInterval(run, 10));
  };
  const stop = () => {
    clearInterval(inerv);
  };
  const reset = () => {
    clearInterval(inerv);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const run = () => {
    if (updateM === 60) {
      updateH++;
      updateM = 0;
    }
    if (updateS === 60) {
      updateM++;
      updateS = 0;
    }
    if (updateMs === 100) {
      updateS++;
      updateMs = 0;
    }
    updateMs++;
    return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH });
  };

  const h = () => {
    if (time.h === 0) {
      return "";
    } else {
      <span>{time.h >= 10 ? time.h : "0" + time.h}</span>;
    }
  };

  return (
    <div>
      {h()}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>

      <span>{time.m >= 10 ? time.m : "0" + time.m}</span>
      <span>{time.s >= 10 ? time.s : "0" + time.s}</span>
      <span>{time.ms >= 10 ? time.ms : "0" + time.ms}</span>
    </div>
  );
};

export default Timer;
