import React, { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

// IMPORT UTILITIES
import { axiosWithAuth } from "../utilities/axiosWithAuth";

// IMPORT CONTEXTS
import LoggedContext from "../contexts/LoggedContext";
import ColorContext from "../contexts/ColorContext";

const ColorList = ({ colors, updateColors }) => {

  const { logged, setLogged, } = useContext(LoggedContext)
  const { colorList, setColorList, colorItem } = useContext(ColorContext);

  // const { id } = useParams();

  console.log(colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(colorItem);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorList.id}`, colorToEdit)
      .then(response => {
        console.log("Updated? ", response);

        setColorList([
          ...colorList.filter(item => item.id !== colorToEdit.id),
          colorToEdit
        ]);
        setColorToEdit(colorItem);
        setEditing(false);
      })
      .catch(error => {
        console.log("That's an ERROR! ", error);
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(response => {
        console.log(response);
        axiosWithAuth()
          .get("/colors")
          .then(response => {
            console.log(response);
            setColorList(response.data);
          })
      })
      .catch (error => console.log(error))
  };

  return (
    <div className="colors-wrap">
      <h2>colors</h2>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
          </label>
          <input
            type="text"
            name="color-title"
            id="color-title"
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
          <label>
            hex code:
          </label>
          <input
            type="color"
            name="color-picker"
            id="color-picker"
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/*<div className="spacer" />*/}
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
