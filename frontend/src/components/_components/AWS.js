// frontend/src/components/_components/AWS.js

import { useDispatch } from 'react-redux';

export const updatedImgFromPC = async (e, setPreviewUrl, setImgUrl, setShowUpload) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => setPreviewUrl(reader.result)
  setImgUrl(file);
  setShowUpload(false);
};

export const uploadProfileImage = async (imgUrl, userId, dispatch, thunk) => {
  const form = { img_url: imgUrl };
  await dispatch(thunk(userId, form));
  resetImageStates()
};