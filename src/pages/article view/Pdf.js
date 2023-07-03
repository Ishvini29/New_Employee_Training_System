import React from "react";

function Pdf(props) {
  return props.url.map((article) => (
    <div style={{ textAlign: "center" }}>
      <embed
        title="myframe"
        style={{ height: "900px", width: "1200px" }}
        src={article.articleUrl}
        onContextMenu={(event) => event.preventDefault()}
        width="500"
        height="375"
      />
    </div>
  ));
}

export default Pdf;
