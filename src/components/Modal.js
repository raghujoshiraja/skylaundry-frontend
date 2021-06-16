import React from "react";
import Modal from "react-modal";

const ModalComponent = ({ setModalIsOpen, modalIsOpen, children }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={() => setModalIsOpen(true)}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Example Modal"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "400px",
          width: "100%",
          maxHeight: "400px",
          height: "100%",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "scroll",
          padding: 10,
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
