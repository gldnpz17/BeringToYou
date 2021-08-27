const setActiveModal = (setOpenModal) => (modalName) => (openModal) => {
  if (openModal) {
    setOpenModal(modalName);
  } else {
    setOpenModal(null)
  }
};

export default setActiveModal;