import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import Header from "./header";

function Todolist() {
  const [taskText, setTaskText] = useState("");
  const [displayedTexts, setDisplayedTexts] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleButtonClick = () => {
    if (taskText.trim() !== "") {
      setDisplayedTexts([...displayedTexts, taskText]);
      setCheckedItems({ ...checkedItems, [displayedTexts.length]: false });
      setTaskText("");
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems({
      ...checkedItems,
      [index]: !checkedItems[index],
    });
  };

  const handleDelete = (index) => {
    const updatedTasks = [...displayedTexts];
    updatedTasks.splice(index, 1);
    const updatedCheckedItems = { ...checkedItems };
    delete updatedCheckedItems[index];
    setDisplayedTexts(updatedTasks);
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, skyblue,  aqua)",

        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          backgroundColor: "white",

          height: "50%",
          width: "50%",
          borderRadius: "30px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontStyle: "unset",
            fontWeight: "bold",
          }}
        >
          Todolist
        </div>
        <div style={{ alignSelf: "center" }}>
          <input
            style={{
              height: "30px",
              width: "600px",
              border: "2px solid #555",
              borderRadius: "5px",
              padding: "2px 4px",
            }}
            type="text"
            placeholder="Enter your todo"
            value={taskText}
            onChange={handleInputChange}
          />
          <button onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faPlus} flip={true} />
          </button>
        </div>

        <div>
          {displayedTexts.map((text, index) => (
            <div
              key={index}
              className={checkedItems[index] ? "completed-task" : ""} // Apply the completed-task class based on checked status
            >
              {index + 1}.{text}
              <input
                type="checkbox"
                checked={checkedItems[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
              <button onClick={() => handleDelete(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todolist;
