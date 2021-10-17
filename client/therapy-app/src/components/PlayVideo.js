import React from 'react';

function PlayVideo(props) {
  return (
    <div class="ratio ratio-16x9 text-center mb-3">

      <video src={props.url} controls>
      </video>

    </div>

  );
}

export default PlayVideo;
