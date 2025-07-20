import { React, useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputBox({ label, type = "text", passwordtoggle, ...props }) {
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  }

  return (
    <label className="block text-sm mt-4 relative">
      <span className="text-gray-700 dark:text-gray-400">{label}</span>
      <input type={showPassword ? 'text' : type} {...props} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input border p-2 rounded-md" />
      {/* {passwordtoggle === true && type === 'password' ? (showPassword ? <FaEyeSlash /> : <FaEye />) : null} */}
      {passwordtoggle === true && type === 'password' ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-2/3 transform -translate-y-2/3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      ) : null}
    </label>
  )
}

export default InputBox