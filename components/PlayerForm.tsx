// src/components/PlayerForm.tsx

import React, { useState } from "react";
import { usePlayerContext } from "../context/PlayerContext";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const PlayerForm: React.FC = () => {
  const { addPlayer } = usePlayerContext();
  const [eid, setEid] = useState("");
  const [project, setProject] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState<{
    eid?: string;
    project?: string;
    score?: string;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEid("");
    setProject("");
    setScore(0);
  };
  const handleShow = () => setShow(true);

  const validateForm = () => {
    const errors: { eid?: string; category?: string; score?: string } = {};
    if (!eid) errors.eid = "Enterprise ID is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addPlayer({ id: Date.now(), eid, project, score });
      toast.success("Player added successfully!");
      setEid("");
      setProject("");
      setScore(0);
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow} className="add-btn">
        New Player
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="eid"
              label="Enterprise Id"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="juan.delacruz"
                value={eid}
                onChange={(e) => setEid(e.target.value)}
              />
              {errors.eid && <div className="text-danger">{errors.eid}</div>}
            </FloatingLabel>

            <FloatingLabel
              controlId="project"
              label="Project Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="UHG"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
              {errors.project && (
                <div className="text-danger">{errors.project}</div>
              )}
            </FloatingLabel>

            <FloatingLabel controlId="score" label="Score" className="mb-3">
              <Form.Control
                type="number"
                className="form-control"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
              />
              {errors.score && (
                <div className="text-danger">{errors.score}</div>
              )}
            </FloatingLabel>
            <div className="add-action-btns">
              <Button
                onClick={handleClose}
                variant="secondary"
                className="add-close-btn"
              >
                Close
              </Button>
              <Button type="submit" variant="primary" className="add-save-btn">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </React.Fragment>
  );
};

export default PlayerForm;
