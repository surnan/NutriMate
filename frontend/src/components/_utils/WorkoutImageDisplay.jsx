// frontend/src/components/WorkoutPageForm/WorkoutImageDisplay.jsx
import { useEffect, useState } from "react";

function WorkoutImageDisplay({ workoutImgArr, downloadGIF, placeholderIMG, handleImgClick }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workoutImgArr && workoutImgArr.length > 0) {
      let loadedImages = 0;
      const totalImages = workoutImgArr.length;

      workoutImgArr.forEach((image) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          loadedImages += 1;
          if (loadedImages === totalImages) {
            setLoading(false); 
          }
        };
        img.onerror = () => {
          loadedImages += 1; 
          if (loadedImages === totalImages) {
            setLoading(false); 
          }
        };
      });
    } else {
      setLoading(false); 
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
                  className="clickable round"
                />
              </div>
            ))
          ) : null} 
          
          {workoutImgArr && workoutImgArr.length === 0 && ( 
              <div key="666666">
              <img
                src={placeholderIMG}
                style={{ height: "300px", width: "300px" }}
                alt="Workout Image"
                onClick={() => handleImgClick()}
                className="clickable round"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutImageDisplay;