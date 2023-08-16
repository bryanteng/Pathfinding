import React, { useState, useEffect } from "react";

const Cell = ({
  node,
  onClick,
  onMouseDown,
  onMouseUp,
  value
}) => {

  const getCellClass = () => {
    let className;
    switch (value) {
      case "O":
        className = "path";
        break;
      case "x":
        className = "closed";
        break;
      case "W":
        className = "bar";
        break;
      case "S":
      case "E":
        className = "node";
        break;
      default:
        className = "";
    }
    return className;
  };

  const { pos } = node
  const [cellClass, setCellClass] = useState(getCellClass())

  useEffect(() => {
    console.log("cell", value)
    setCellClass(getCellClass())
  }, [value]);


  const nodeId = pos

  const isStartOrEnd = ( value === "S" || value === "E" )

  return (
    <td
      className={cellClass}
      id={nodeId}
      onClick={onClick}
      draggable={isStartOrEnd ? true : false}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {value}
    </td>
  );
};

export default Cell;
