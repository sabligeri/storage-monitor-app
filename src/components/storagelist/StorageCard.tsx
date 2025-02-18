import { Link, useNavigate } from "react-router-dom";
import "./StorageCard.css"

interface Storage {
    id: number,
    name: string
}

const StorageCard = ({ storage, onDelete }: { storage: Storage, onDelete: (storageId: number) => void }) => {
    const navigate = useNavigate();
    
    return (
    <div className="storage-card" >
        <div className="storage-name">
            {storage.name}
        </div>
        <div className="storage-actions">
            <button className="btn update-btn" onClick={() => navigate(`/storage/${storage.id}`)}>
                    <i className="bi bi-folder2-open"></i> Open
            </button>
            <button
                className="btn delete-btn"
                onClick={() => onDelete(storage.id)}
            >
                <i className="bi bi-trash3"></i> Delete
            </button>
        </div>
    </div>
)
}
export default StorageCard;
