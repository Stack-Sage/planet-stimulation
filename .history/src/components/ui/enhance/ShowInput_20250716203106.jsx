import React, { useState, useEffect } from 'react';
import Input from './Input';
import Input2 from './Input2';
import StarButton from '../StarButton';

const OneTimeNameInput = ({ onNameEntered }) => {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [hasEnteredName, setHasEnteredName] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setName(savedName);
      setHasEnteredName(true);
      if (onNameEntered) onNameEntered(savedName);
    }
  }, [onNameEntered]);

  const handleClick = () => {
    if (!hasEnteredName) {
      setShowInput(true);
    }
  };

  const handleSubmit = () => {
    if (name.trim() !== '') {
      localStorage.setItem('user_name', name);
      setHasEnteredName(true);
      setShowInput(false);
      if (onNameEntered) onNameEntered(name);
    }
  };

  return (
    <div className=" ">
      
      {!hasEnteredName && (
        <StarButton
          onClick={handleClick}
          className="bg-blue-600 w-full  -hue-rotate-180 invert text-white px-4 py-2 rounded"
        >
          Click to Enter Name
        </StarButton>
      )}

      {showInput && !hasEnteredName && (
        <div className="mt-3 flex items-center invert hue-rotate-180 gap-2">
          <StarButton
          
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"

            
            className="border  mt-4  text-center  px-4 py-4 rounded text-white scale"
          >
            </StarButton>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Submit
          </button>
        </div>
      )}

      {hasEnteredName && (
        <p className="mt-4 text-lg font-semibold text-green-700">
          Welcome, {name}!
        </p>
      )}
    </div>
  );
};

export default OneTimeNameInput;
