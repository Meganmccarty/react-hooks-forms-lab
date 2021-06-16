import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items, onItemFormSubmit }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemCategory, setItemCategory] = useState("Produce");

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    function handleItemName(event) {
        setItemName(event.target.value)
    }

    function handleItemCategory(event) {
        setItemCategory(event.target.value)
    }

    function handleItemFormSubmit(event) {
        event.preventDefault();
        const newItem = {
            id: uuid(), // the `uuid` library can be used to generate a unique id
            name: itemName,
            category: itemCategory,
        };
        onItemFormSubmit(newItem);
    }

    console.log(itemName);
    console.log(itemCategory);

    const itemsToDisplay = items
        .filter(item => {
            if (selectedCategory === "All") return true;
            return item.category === selectedCategory;
        })
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="ShoppingList">
            <ItemForm
                itemName={itemName}
                setItemName={handleItemName}
                itemCategory={itemCategory}
                setItemCategory={handleItemCategory}
                onItemFormSubmit={onItemFormSubmit}
            />
            <Filter
                search={search}
                selectedCategory={selectedCategory}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
            />
            <ul className="Items">
                {itemsToDisplay.map((item) => (
                    <Item key={item.id} name={item.name} category={item.category} />
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
