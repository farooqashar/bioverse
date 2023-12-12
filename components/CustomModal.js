import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ ticket }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} size="small">
        View Ticket
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            User: {ticket.name}
          </Typography>
          <Typography id="modal-modal-title" variant="h9" component="h6">
            Ticket ID: {ticket._id}
          </Typography>
          <Typography id="modal-modal-title" variant="h7" component="h6">
            User Email: {ticket.email}
          </Typography>
          <Typography id="modal-modal-title" variant="h7" component="h6">
            Ticket Status: {ticket.status}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Problem Description: {ticket.problem}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
