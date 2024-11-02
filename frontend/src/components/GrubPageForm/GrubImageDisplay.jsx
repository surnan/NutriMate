// frontend/src/components/GrubPageFormGrubImageDisplay.jsx
import { useEffect, useState } from "react";

function GrubImageDisplay({ grubImgArr, downloadGIF, placeholderIMG, handleImgClick }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (grubImgArr && grubImgArr.length > 0) {
      let loadedImages = 0;
      
      grubImgArr.forEach((image) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          loadedImages += 1;
          if (loadedImages === grubImgArr.length) {
            setLoading(false); 
          }
        };
      });
    } else {
      setLoading(false); 
    }
  }, [grubImgArr]);

  return (
    <div>
      {loading ? (
        <div className="loadingGifDiv">
          <img src={downloadGIF} alt="Loading..." className="downloadGIF" />
        </div>
      ) : (
        <div>
          {grubImgArr && grubImgArr.length > 0 ? (
            grubImgArr.map((currentImg) => (
              <div key={currentImg.id}>
                <img
                  src={currentImg.url}
                  style={{ height: "300px", width: "300px" }}
                  alt="Grub Image"
                  onClick={() => handleImgClick(currentImg.id)}
                  className="clickable round"
                />
              </div>
            ))
          ) : (
            <div>
              <br />
              <img
                src={placeholderIMG}
                style={{ height: "300px", width: "300px" }}
                alt="Grub Placeholder"
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

export default GrubImageDisplay;
