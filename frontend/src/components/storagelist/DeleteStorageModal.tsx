import "./DeleteStorageModal.css"

const DeleteStorageModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <p>Are you sure you want to delete this storage?</p>
                    <button className="btn confirm-btn" onClick={onConfirm}>Yes</button>
                    <button className="btn cancel-btn" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteStorageModal;