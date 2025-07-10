import { React, useState, useEffect } from 'react';
import ForgotPasswordImg from '../assets/forgot-password-1.jpeg';
import ForgotPasswordImgDark from '../assets/forgot-password-1-dark.jpeg';
import { Header, PageHeadings, InputBox } from '../components';
import { ToastContainer, toast } from 'react-toastify';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: ''
  })

  const handleOnChangeValues = (e) => {
    const { name, type, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'email' ? value.toLowerCase() : value
    }));
    
    
    // console.log("checking the handleOnChangeValues", e.target.name, e.target.value, e.target.type);
  }
  useEffect(() => {
    // console.log("Updated formData", formData);
  }, [formData]);
  // console.log("checking the setFormData", formData);

  const forgotSubmitHandle = async (e) => {
    e.preventDefault();
    // toast.success("You are submitting the Forgot password form!");
    // console.log("You are submitting the Forgot password form!");
    try {
      const resp = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const formResp = await resp.json();
      
      // console.log("Response from server:", resp, formResp);
      toast.success(formResp.message)
    } catch (error) {
      console.error("Error while recovering the password :", error);
    }
  }

  return (
    <>
    {/* <Header /> */}
      {/* <PageHeadings pageHeading="Forgot Password Page" /> */}
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src={ForgotPasswordImg} alt="Office" />
              <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src={ForgotPasswordImgDark} alt="Office" />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl- text-4xl font-semibold text-gray-700 dark:text-gray-200">
                  Forgot password
                </h1>
                <form onSubmit={forgotSubmitHandle}>
                  {/* <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                    <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input border p-2 rounded-md" placeholder="Jane Doe" />
                  </label> */}
                  <InputBox label="Email" name="email" type='email' placeholder="user@example.com" onChange={handleOnChangeValues} />

                  {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                  <button type='submit' className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    Recover password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword