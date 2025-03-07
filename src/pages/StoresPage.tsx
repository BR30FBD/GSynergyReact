import { useState } from "react";
import { Store } from "../types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./StoresPage.css"; // Import custom CSS

const StoresPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [storeName, setStoreName] = useState("");

  // Add Store
  const addStore = () => {
    if (storeName.trim()) {
      setStores([...stores, { id: Date.now(), name: storeName }]);
      setStoreName("");
    }
  };

  // Remove Store
  const removeStore = (id: number) => {
    setStores(stores.filter((store) => store.id !== id));
  };

  // Update Store Name
  const updateStore = (id: number, newName: string) => {
    setStores(
      stores.map((store) =>
        store.id === id ? { ...store, name: newName } : store
      )
    );
  };

  // Reorder Store (Drag & Drop)
  const moveStore = (dragIndex: number, hoverIndex: number) => {
    const updatedStores = [...stores];
    const [draggedStore] = updatedStores.splice(dragIndex, 1);
    updatedStores.splice(hoverIndex, 0, draggedStore);
    setStores(updatedStores);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="store-container">
        <h2 className="store-title">🏪 Manage Stores</h2>
        <div className="input-group">
          <input
            className="store-input"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter Store Name"
          />
          <button className="add-button" onClick={addStore}>
            ➕ Add Store
          </button>
        </div>

        <ul className="store-list">
          {stores.map((store, index) => (
            <StoreItem
              key={store.id}
              store={store}
              index={index}
              moveStore={moveStore}
              updateStore={updateStore}
              removeStore={removeStore}
            />
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

interface StoreItemProps {
  store: Store;
  index: number;
  moveStore: (dragIndex: number, hoverIndex: number) => void;
  updateStore: (id: number, newName: string) => void;
  removeStore: (id: number) => void;
}

const StoreItem: React.FC<StoreItemProps> = ({
  store,
  index,
  moveStore,
  updateStore,
  removeStore,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "STORE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "STORE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveStore(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
    ref={(node) => {
      if (node) {
        drag(drop(node)); // Ensure it executes without returning a value
      }
    }}
    
      className={`store-item ${isDragging ? "dragging" : ""}`}
    >
      <input
        className="store-name-input"
        type="text"
        value={store.name}
        onChange={(e) => updateStore(store.id, e.target.value)}
      />
      <button className="remove-button" onClick={() => removeStore(store.id)}>
        ❌
      </button>
      <span className="drag-handle">☰</span>
    </li>
  );
};

export default StoresPage;
