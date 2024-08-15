import React, { useState } from "react";
import Item from "../Item/Item";
import "./ItemList.css";
import { SettingsOutline } from "@styled-icons/evaicons-outline/SettingsOutline";
import SettingsModal from "./components/modal";

const ItemList = ({ products, toggleStates, setToggleStates }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="settings" onClick={() => setIsOpen(true)}>
        <SettingsOutline size={32} />
        {isOpen && (
          <SettingsModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            toggleStates={toggleStates}
            setToggleStates={setToggleStates}
          />
        )}
      </div>
      <div className="ItemList">
        {products.map((prod) => (
          <Item key={prod.id} {...prod} toggleStates={toggleStates} />
        ))}
      </div>
    </>
  );
};

export default ItemList;
