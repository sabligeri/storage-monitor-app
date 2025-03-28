import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;


interface Storage {
    id: number;
    name: string;
}

interface StorageCardProps {
    storage: Storage;
    onDelete: (storageId: number) => void;
}

const StorageCard: React.FC<StorageCardProps> = ({ storage, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: `2px solid #595f39`,
                backgroundColor: "#C4C5BA", // sophisticated sage
                color: "#1B1B1B", // timeless noir
                px: 3,
                py: 2,
                mb: 2,
                borderRadius: 2,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                '&:hover': {
                    transform: "scale(1.015)",
                    boxShadow: 4,
                },
                animation: `${fadeIn} 0.4s ease-in-out`,
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="#1B1B1B">
                    {storage.name}
                </Typography>
            </CardContent>

            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                pr: 2,
                justifyContent: "flex-end",
            }}>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/storage/${storage.id}`)}
                    sx={{
                        backgroundColor: "#595f39",
                        color: "#E4E4DE",
                        '&:hover': {
                            backgroundColor: "#1B1B1B",
                            color: "#E4E4DE"
                        }
                    }}
                    startIcon={<FolderOpenIcon />}
                >
                    Open
                </Button>

                <Button
                    variant="contained"
                    onClick={() => onDelete(storage.id)}
                    sx={{
                        backgroundColor: "#1B1B1B",
                        color: "#E4E4DE",
                        '&:hover': {
                            backgroundColor: "#b30116",
                            color: "#fff"
                        }
                    }}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </Box>
        </Card>
    );
};

export default StorageCard;
