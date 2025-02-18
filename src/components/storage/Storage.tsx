import { useParams } from "react-router-dom";

const Storage = () => {
    const {storageId} = useParams<{storageId: string}>()
    return (
        <div>
            Welcom On Storage with id: {storageId} Page <i className="bi bi-building-fill-check"></i>
        </div>
    )
}

export default Storage;