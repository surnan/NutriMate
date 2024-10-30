// frontend/src/components/GrubImageDisplay/GrubImageDisplay.jsx
import React from 'react';

function GrubImageDisplay({ grubImgArr, downloadGIF, placeholderIMG, handleImgClick, isImageLoading }) {
    return (
        <div className="grub-image-display">
            {isImageLoading ? (
                <img src={loadingGif} alt="Loading..." className="loading-animation" />
            ) : (
                grubImgArr && grubImgArr.length > 0 ? (
                    grubImgArr.map((img, index) => (
                        <img
                            key={index}
                            src={img.url || placeholderIMG}
                            alt="Grub Image"
                            onClick={() => handleImgClick(img.id)}
                            className="grub-image"
                        />
                    ))
                ) : (
                    <img src={placeholderIMG} alt="Placeholder" className="grub-placeholder-image" />
                )
            )}
        </div>
    );
}

export default GrubImageDisplay;
