// WorkoutImageDisplay.jsx
import React, { useEffect, useState } from "react";

function WorkoutImageDisplay({ workoutImgArr, downloadGIF, placeholderIMG, handleImgClick }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workoutImgArr && workoutImgArr.length > 0) {
      let loadedImages = 0;
      
      // Preload each image and check when all are fully loaded
      workoutImgArr.forEach((image) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          loadedImages += 1;
          if (loadedImages === workoutImgArr.length) {
            setLoading(false); // Set loading to false only when all images are fully loaded
          }
        };
      });
    } else {
      setLoading(false); // Stop loading if there are no images
    }
  }, [workoutImgArr]);

  return (
    <div>
      {loading ? (
        <div className="loadingGifDiv">
          <img src={downloadGIF} alt="Loading..." className="downloadGIF" />
        </div>
      ) : (
        <div>
          {workoutImgArr && workoutImgArr.length > 0 ? (
            workoutImgArr.map((currentImg) => (
              <div key={currentImg.id}>
                <img
                  src={currentImg.url}
                  style={{ height: "300px", width: "300px" }}
                  alt="Workout Image"
                  onClick={() => handleImgClick(currentImg.id)}
                  className="clickable"
                />
              </div>
            ))
          ) : (
            <div>
              <br />
              <img
                src={placeholderIMG}
                style={{ height: "300px", width: "300px" }}
                alt="Workout Placeholder"
                className="clickable"
              />
              <br />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutImageDisplay;
