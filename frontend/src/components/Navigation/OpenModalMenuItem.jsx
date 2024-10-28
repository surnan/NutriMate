import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setmodal_window_all, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setmodal_window_all(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <div onClick={onClick}>{itemText}</div>
  );
}

export default OpenModalMenuItem;
