import { useState } from 'react';
import './table.css';

const Table = () => {
  const [columns, setColumns] = useState([...Array(15).keys()]);

  const handleDragStart = (event, columnIndex) => {
    event.dataTransfer.setData('text/plain', columnIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      const updatedColumns = [...columns];
      const [draggedColumn] = updatedColumns.splice(sourceIndex, 1);
      updatedColumns.splice(targetIndex, 0, draggedColumn);
      setColumns(updatedColumns);
    }
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column}
                draggable="true"
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
              >
                Column {column + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
