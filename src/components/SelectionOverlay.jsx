import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function SelectionOverlay({ visible, onHide, onSelect }) {
  const [count, setCount] = useState("");

  const handleSubmit = () => {
    const num = parseInt(count);

    if (!num || num <= 0) {
      alert("Enter valid number");
      return;
    }

    onSelect(num);
    setCount("");
  };

  return (
    <Dialog
      header="Custom Row Selection"
      visible={visible}
      onHide={onHide}
      style={{ width: "350px" }}
    >
      <div className="p-fluid">
        <InputText
          placeholder="Enter number of rows"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <Button
          label="Select"
          className="p-mt-3"
          onClick={handleSubmit}
        />
      </div>
    </Dialog>
  );
}

export default SelectionOverlay;