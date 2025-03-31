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
                    color: "#283618",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: 400,
                    bgcolor: "#F0EFEB",
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
                            borderColor: "#283618",
                            color: "#283618",
                            "&:hover": {
                                backgroundColor: "#283618",
                                color: "#F0EFEB",
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
                            borderColor: "#B7B7A4",
                            color: "#283618",
                            "&:hover": {
                                backgroundColor: "#B7B7A4",
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
