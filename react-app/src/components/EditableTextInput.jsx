import React, { useState } from 'react';

// Mock function to simulate saving to a database
// const saveToDatabase = async (newText) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Saved to database:', newText);
//       resolve(true);
//     }, 1000);
//   });
// };

const EditableTextInput = ({ initialText, saveMethod  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [inputValue, setInputValue] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
    if (inputValue !== text) {
      setText(inputValue);
      await saveMethod(inputValue); // Replace with your actual API call
    }
  };

  const handleInputKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (inputValue !== text) {
        setText(inputValue);
        await saveMethod(inputValue); // Replace with your actual API call
      }
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick} className='d-inline'>
      {isEditing ? (
     
        <div className="input-group ">
        <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  autoFocus
                  className='form-control-sm form-control-inline'
                />
          <button className="btn btn-sm btn-secondary " type="button" onClick={()=>saveMethod(inputValue)} id="button-addon2">update</button>
        </div>


      ) : (
        <span>{initialText}
                   <sup style={{top:'-.9em'}}><small style={{fontSize:'8px'}}><i className="fas fa-edit"></i></small></sup>
                   </span>
      )}
    </div>
  );
};

export default EditableTextInput;