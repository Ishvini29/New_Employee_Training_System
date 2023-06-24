import React from "react";

function KT(props) {
  return props.url.map((kt) => (
    <div style={{ textAlign: "center" }}>
      <video
        controls="controls"
        controlsList="nodownload"
        onContextMenu={(event) => event.preventDefault()}
        width="640"
        height="360"
      >
        <source src={kt.sessionUrl} type="video/mp4" />
      </video>
    </div>
  ));
}

export default KT;
