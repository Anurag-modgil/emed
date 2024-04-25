import React, { useState } from 'react';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseLeave={closeDropdown}
      style={{
        display: 'inline-block', // Add this line to make the dropdown inline
      }}
    >
      <button
        className="cursor-pointer"
        onMouseOver={toggleDropdown}
        style={{
          backgroundColor: '#f0f0f0',
          padding: '8px 12px',
          borderRadius: '4px',
        }}
      >
        Hover me
      </button>
      {isOpen && (
        <div
          className="absolute bg-white shadow-md mt-2 py-2 rounded-md transition-all duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
          }}
        >
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Option 1
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Option 2
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Option 3
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;