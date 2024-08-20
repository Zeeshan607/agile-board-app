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

const EditableTextTextareaForSubTasks = ({ task, saveMethod, styles=[]  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.description);
  const [inputValue, setInputValue] = useState(task);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue({...inputValue, 'description':e.target.value});
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
    if (inputValue !== text) {
      setText(inputValue);
       saveMethod(inputValue); // Replace with your actual API call
    }
  };

  const handleInputKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (inputValue !== text) {
        setText(inputValue);
          saveMethod(inputValue); // Replace with your actual API call
      }
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick} className='editable-textarea-wrapper d-inline w-100'>
      {isEditing ? (
     
        <div className="form-group d-inline">
        <textarea
                  defaultValue={inputValue.description}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  autoFocus
                  className='form-control'
                />
          <button className="btn btn-sm btn-primary mt-2" type="button" onClick={()=>saveMethod(inputValue)} id="button-addon2">Update</button>
        </div>









      ) : (
        <span className={styles.join(' ')}>{task.description}</span>
      )}
    </div>
  );
};

export default EditableTextTextareaForSubTasks;