import { useState } from "react";
import { DndProvider,
  //  useDrag,
    useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SKU } from "../types";
import "./SKUsPage.css"; // Import custom CSS

const ItemType = "SKU";

const SKUsPage: React.FC = () => {
  const [skus, setSKUs] = useState<SKU[]>([]);
  const [sku, setSKU] = useState<SKU>({ id: 0, name: "", price: 0, cost: 0 });

  const addSKU = () => {
    if (sku.name.trim()) {
      setSKUs([...skus, { ...sku, id: Date.now() }]);
      setSKU({ id: 0, name: "", price: 0, cost: 0 });
    }
  };

  const updateSKU = (id: number, field: keyof SKU, value: string | number) => {
    setSKUs(skus.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeSKU = (id: number) => {
    setSKUs(skus.filter((item) => item.id !== id));
  };

  const moveSKU = (dragIndex: number, hoverIndex: number) => {
    const updatedSKUs = [...skus];
    const [draggedItem] = updatedSKUs.splice(dragIndex, 1);
    updatedSKUs.splice(hoverIndex, 0, draggedItem);
    setSKUs(updatedSKUs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="sku-container">
        <h2 className="sku-title">Manage SKUs</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="SKU Name"
            value={sku.name}
            onChange={(e) => setSKU({ ...sku, name: e.target.value })}
            className="sku-input"
          />
          <input
            type="number"
            placeholder="Price"
            value={sku.price}
            onChange={(e) => setSKU({ ...sku, price: +e.target.value })}
            className="sku-input"
          />
          <input
            type="number"
            placeholder="Cost"
            value={sku.cost}
            onChange={(e) => setSKU({ ...sku, cost: +e.target.value })}
            className="sku-input"
          />
          <button className="add-button" onClick={addSKU}>
            Add SKU
          </button>
        </div>

        <ul className="sku-list">
          {skus.map((sku, index) => (
            <DraggableSKU
              key={sku.id}
              sku={sku}
              index={index}
              moveSKU={moveSKU}
              updateSKU={updateSKU}
              removeSKU={removeSKU}
            />
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

// Draggable SKU Component
const DraggableSKU: React.FC<{
  sku: SKU;
  index: number;
  moveSKU: (dragIndex: number, hoverIndex: number) => void;
  updateSKU: (id: number, field: keyof SKU, value: string | number) => void;
  removeSKU: (id: number) => void;
}> = ({ sku, index, moveSKU, updateSKU, removeSKU }) => {
  // const ref = useDrag({
  //   type: ItemType,
  //   item: { index },
  // })[1];

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveSKU(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li  ref={(node) => {
      if (node) drop(node); // Ensure `node` exists before calling drop
    }} className="sku-item">
      <input
        type="text"
        value={sku.name}
        onChange={(e) => updateSKU(sku.id, "name", e.target.value)}
        className="sku-input"
      />
      <input
        type="number"
        value={sku.price}
        onChange={(e) => updateSKU(sku.id, "price", +e.target.value)}
        className="sku-input"
      />
      <input
        type="number"
        value={sku.cost}
        onChange={(e) => updateSKU(sku.id, "cost", +e.target.value)}
        className="sku-input"
      />
      <button className="remove-button" onClick={() => removeSKU(sku.id)}>
        ❌
      </button>
    </li>
  );
};

export default SKUsPage;
