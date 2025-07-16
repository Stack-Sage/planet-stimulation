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
          className=" min-w-52  min-h-20 scale-90  -hue-rotate-180 invert text-white px-2 py-1 rounded"
        >
         <h2>

          Name Your Planet...
         </h2>
        </StarButton>
      )}

      {showInput && !hasEnteredName && (
        <div className="mt-3 flex items-center  pb-4 w-fit gap-2">
          <input
          
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Not Earth (lame)"

            
            className="  mt-4 brightness-125 invert hue-rotate-90  bg-gradient-to-tr from-blue-300 via-indigo-300 to-blue-200 text-center w-fit outline-white border-white border-2 outline-2 ring-2 ring-blue-500  rounded text-white scale "
          >
            
            </input>
          <StarButton
            onClick={handleSubmit}
            className=" contrast-75 brightness-110  invert hue-rotate-180 text-white font-bold  rounded scale-75"
          >
           Submit
          </StarButton>
        </div>
      )}

      {hasEnteredName && (
        <p className="mt-4 text-lg font-semibold text-green-700">
           {name}!
        </p>
      )}
    </div>
  );
};

export default OneTimeNameInput;
