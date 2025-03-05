import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

interface DeleteItemModalProps {
    open: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({ open, handleClose, handleDelete }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    color: "black",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: 400,
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>Delete Item</Typography>
                <Typography variant="body1">Are you sure you want to delete this item?</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "red",
                            borderWidth: 1.5,
                            color: "red",
                            fontWeight: "bold",
                            width: "fit-content",
                            "&:hover": {
                                backgroundColor: "red",
                                color: "white",
                            },
                        }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "gray",
                            borderWidth: 1.5,
                            color: "gray",
                            fontWeight: "bold",
                            width: "fit-content",
                            "&:hover": {
                                backgroundColor: "gray",
                                color: "white",
                            },
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Box>

            </Box>
        </Modal>
    );
};

export default DeleteItemModal;
