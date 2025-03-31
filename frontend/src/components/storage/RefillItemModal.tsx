import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

interface RefillItemModalProps {
    open: boolean;
    handleClose: () => void;
    handleRefill: (quantity: number) => void;
}

const RefillItemModal: React.FC<RefillItemModalProps> = ({ open, handleClose, handleRefill }) => {
    const [quantity, setQuantity] = useState<number>(0);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    color: "#2d4739",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: 400,
                    bgcolor: "#f3faf5",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>Refill Item</Typography>
                <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            width: "fit-content",
                            borderColor: "green",
                            color: "green",
                            "&:hover": {
                                backgroundColor: "green",
                                color: "white",
                            },
                        }}
                        onClick={() => handleRefill(quantity)}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            width: "fit-content",
                            borderColor: "red",
                            color: "red",
                            "&:hover": {
                                backgroundColor: "red",
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

export default RefillItemModal;
