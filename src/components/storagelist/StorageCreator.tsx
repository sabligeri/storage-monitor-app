import "./StorageCreator.css"

const StorageCreator = ({ newStorageName, setNewStorageName, handleStorageCreate }: {
    newStorageName: string;
    setNewStorageName: (name: string) => void;
    handleStorageCreate: () => void;
}) => (
    <div id="storage-creator-container">
        <label htmlFor="create-storage-input">
            Create Storage
        </label>
        <input
            id="create-storage-input"
            type="text"
            value={newStorageName}
            onChange={(e) => setNewStorageName(e.target.value)}
            placeholder="Enter storage name"
        />

        <button id="create-storage-button" onClick={() => handleStorageCreate()}>
            <i className="bi bi-plus-lg"></i> Create Storage
        </button>
    </div>
)

export default StorageCreator;