// OTPModal.js
 
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { otpVarify } from '../../../Redux/Auth/Action';
import api, { API_BASE_URL } from "../../../config/api";
import axios from 'axios';
const OTPModal = ({ isOpen, onClose,handleClose, timer }) => {
  const [otp, setOtp] = useState("");
  const [segments, setSegments] = React.useState(["", "", "", "", "", ""]);
  const [keyItem, setKeyItem] = useState(false);
  const [disAbleClick, setDisAbleClick] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const {auth}=useSelector(store=>store);
  // console.log('auth',auth)
  const deadline = auth.timer;
  const dispatch = useDispatch();
  
  // time calculate start
  const [counter, setCounter] = useState(timer);
 
  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
 
    return () => {
      clearInterval(timer);
    };
  }, [counter]);
  const emailId = sessionStorage.getItem("userEmail");
  const inputfocus = (elmnt) => {
    const { maxLength, value, name, id } = elmnt.target;
    if (disAbleClick) {
      elmnt.preventDefault();
    } else {
      if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
        const indexItem = id.split("-")[1];
        let fieldIntIndex = parseInt(indexItem, 10);
        const next = fieldIntIndex - 1;
        if (next > -1) {
          elmnt.target.form.elements[next].focus();
        }
      } else {
        if (value.length >= maxLength) {
          const indexItem = id.split("-")[1];
          let fieldIntIndex = parseInt(indexItem, 10);
          const next = fieldIntIndex + 1;
 
          if (next < 6) {
            elmnt.target.form.elements[next].focus();
          }
        }
      }
    }
  };
 
  function onPaste(event) {
    const pasted = event.clipboardData.getData("text/plain").trim();
    const pastIn = parseInt(pasted, 10);
    if (pastIn && pasted.length === 6) {
      setSegments(pasted.split("").slice(0, segments.length));
    } else {
      event.preventDefault();
    }
  }
  function update(index) {
    return (event) => {
      setSegments([
        ...segments.slice(0, index),
        event.target.value,
        ...segments.slice(index + 1),
      ]);
    };
  }
 
  useEffect(() => {
    const strainge = segments.toString();
    let str1 = strainge;
    str1.replace(/\,/g, "");
    let str2 = str1.replace(/\,/g, "");
    setOtp(str2);
  }, [segments]);
 
  // Otp varification Api
  useEffect(() => {
    // const OTP = ${otp.otpOne}${otp.otpTwo}${otp.otpThree}${otp.otpFour}${otp.otpFive}${otp.otpSix};
    if (otp != "" && otp.length === 6) {
      setDisAbleClick(true);
      setButtonDisable(true);
      (async()=>{
        const data = {
          email: JSON.parse(emailId),
          otp: otp,
        };
        const resp = await dispatch(otpVarify(data))
        if(resp.data.jwt){
          setDisAbleClick(false);
          setButtonDisable(false);
          localStorage.setItem("jwt",resp.data.jwt)
          localStorage.setItem("role",resp.data.role)
          handleClose()
        }
      })()
    }
  }, [otp]);
 
  const handleKeyClick = (e) => {
    if (disAbleClick) {
      e.preventDefault();
    } else {
      let regex = /^[0-9]$/;
      let key = e.key;
      let goNext = false;
      if (e.ctrlKey && key === "Control") {
        setKeyItem(true);
      }
      if (e.key === "Meta" && e.keyCode === 91) {
        setKeyItem(true);
      }
      if (keyItem && e.keyCode === 86) {
        goNext = true;
      }
      if (e.keyCode === 8 || regex.test(key)) {
        goNext = true;
      }
      if (goNext) {
        setTimeout(() => {
          setKeyItem(false);
          goNext = false;
        }, 200);
        return e;
      } else {
        goNext = false;
        e.preventDefault();
      }
    }
  };
 
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle OTP verification here
  //   console.log("Verifying OTP:", otp.join(''));
  //   // Clear OTP input
  //   setOTP(['', '', '', '']);
  //   // Close modal
  //   onClose();
  // };
  const handleResendOtp = async () => {
    setDisAbleClick(true);
    setButtonDisable(true);
    setOtp("");
    setSegments(["", "", "", "", "", ""]);
    const data = {
      email: JSON.parse(emailId)
    };
    const otpData = await axios.post(`${API_BASE_URL}/auth/signin/getotp`, data )
    console.log('otpDataotpData>>', otpData)
    setDisAbleClick(false);
    setButtonDisable(false);
    if(otpData?.data?.msg ===
      "OTP mail has been sent to your email."){
        setCounter(59);
      }
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // Only close the modal if clicked on the overlay itself (not on its children)
      onClose();
    }
  };
  if (!isOpen) return null;
  function onPaste(event) {
    const pasted = event.clipboardData.getData("text/plain").trim();
    const pastIn = parseInt(pasted, 10);
    if (pastIn && pasted.length === 6) {
      setSegments(pasted.split("").slice(0, segments.length));
    } else {
      event.preventDefault();
    }
  }
  function update(index) {
    return (event) => {
      setSegments([
        ...segments.slice(0, index),
        event.target.value,
        ...segments.slice(index + 1),
      ]);
    };
  }
// console.log('counter>>>>>>', counter)
  return (
     <div className="bg-white">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Enter OTP</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Please enter the One-Time-Password to verify your account</p>
                  <p className="text-sm text-gray-500">A One-Time-Password has been sent to your email</p>
                  <div className="text-sm text-gray-500"> {counter === 0
                    ? ""
                    : counter === 1
                    ? `You can resend One-Time-Password within  ${counter} Second`
                    : `You can resend One-Time-Password within ${counter} Seconds`}</div>
                  <form className="mt-4 flex justify-center flex-col gap-5" onSubmit={handleResendOtp}>
                  <div className='mx-auto'>
                  {segments.map((s, key) => (
                    <input
                    type="text"
                    className="mx-1 text-center w-12 h-12 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    id={`digit-${key}`}
                    data-next={`digit-${key + 1}`}
                    maxLength={1}
                    key={key}
                    onInput={update(key)}
                    name={`otp${key}`}
                    value={s}
                    // onPasteCapture={onPasteCaptureHandler}
                    onPaste={onPaste}
                    onKeyUp={(e) => inputfocus(e)}
                    onKeyDown={(e) => handleKeyClick(e)}
                    autoFocus={key == 0 && true}
                    />
                  ))}
                  </div>
                  <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={counter > 0 || buttonDisable }
                  // onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
                  </form>
                                      
 
                </div>
              </div>
            </div>
            
          </div>
  );
};
 
export default OTPModal;