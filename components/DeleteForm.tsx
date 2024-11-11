import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { usePlayerContext } from "../context/PlayerContext";

interface DeleteFormProps {
  id: number;
  show: boolean;
  handleClose: () => void;
}
const DeleteForm: React.FC<DeleteFormProps> = ({ id, show, handleClose }) => {
  const { deletePlayer } = usePlayerContext();

  const handleDelete = (id: number) => {
    deletePlayer(id);
    toast.success("Player deleted successfully!");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Player</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        Are you sure you want to delete this player?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={() => handleDelete(id)} className="delete-btn">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteForm;
