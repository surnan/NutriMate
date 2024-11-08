// frontend/src/components/WorkoutPageForm/ImageDisplay.jsx
import { useEffect, useState } from "react";

function ImageDisplay({ imgArr, downloadGIF, placeholderIMG, handleImgClick }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imgArr && imgArr.length > 0) {
      let loadedImages = 0;
      const totalImages = imgArr.length;

      imgArr.forEach((image) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          loadedImages += 1;
          if (loadedImages === totalImages) {
            setLoading(false); 
          }
        };
      });
    } else {
      setLoading(false); 
    }
  }, [imgArr]);

  return (
    <div>
      {loading ? (
        <div className="loadingGifDiv">
          <img src={downloadGIF} alt="Loading..." className="downloadGIF" />
        </div>
      ) : (
        <div>
          {imgArr && imgArr.length > 0 ? (
            imgArr.map((currentImg) => (
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
          ) : null} 
          
          {imgArr && imgArr.length === 0 && ( 
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

export default ImageDisplay;
