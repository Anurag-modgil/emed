import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { otpVarify } from "../../../Redux/Auth/Action";
import axios from "axios";
import api, { API_BASE_URL } from "../../../config/api";
import notify from "../../../utils/notify";

const OTPModal = ({ isOpen, onClose, handleClose, timer }) => {
  const [otp, setOtp] = useState("");
  const [segments, setSegments] = React.useState(["", "", "", "", "", ""]);
  const [disAbleClick, setDisAbleClick] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { auth } = useSelector((store) => store);
  console.log("auth", auth);
  let deadline = auth?.timer;
  const dispatch = useDispatch();
  const emailId = sessionStorage.getItem("userEmail");
  const [counter, setCounter] = useState(deadline);

  // Timer countdown
  useEffect(() => {
    const timerId =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [counter]);
  useEffect(() => {
    if (counter === 0) {
      setButtonDisabled(false);
    }
  }, [counter]);

  // Handle OTP input changes
  useEffect(() => {
    setOtp(segments.join(""));
  }, [segments]);

  // OTP verification
  useEffect(() => {
    if (otp.length === 6) {
      setDisAbleClick(true);
      setButtonDisabled(true);
      (async () => {
        const data = {
          email: JSON.parse(emailId),
          otp,
        };
        const resp = await dispatch(otpVarify(data));
        if (resp.data.jwt) {
          localStorage.setItem("jwt", resp.data.jwt);
          localStorage.setItem("role", resp.data.role);
          handleClose();
        }
        setDisAbleClick(false);
        setButtonDisabled(false);
      })();
    }
  }, [otp]);

  const inputFocus = (index) => {
    document.getElementById(`digit-${index}`).focus();
  };

  const handleChange = (index) => (event) => {
    const { value } = event.target;
    if (/^[0-9]?$/.test(value)) {
      const newSegments = [...segments];
      newSegments[index] = value;
      setSegments(newSegments);

      if (value && index < 5) {
        inputFocus(index + 1);
      }
    }
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pasted)) {
      setSegments(pasted.split(""));
    } else {
      event.preventDefault();
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setDisAbleClick(true);
    setButtonDisabled(true);
    setOtp("");
    setSegments(["", "", "", "", "", ""]);
    const data = { email: JSON.parse(emailId) };
    try {
      const otpData = await axios.post(
        `${API_BASE_URL}/auth/signin/getotp`,
        data
      );
      if (otpData?.data?.msg === "OTP mail has been sent to your email.") {
        notify("success", "A new OTP has been sent to your email.");
        setCounter(59);
      } else {
        notify("error", "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error while resending OTP:", error);
      notify(
        "error",
        "An error occurred while resending OTP. Please try again."
      );
    } finally {
      setDisAbleClick(false);
    }
  };

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Enter OTP
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Please enter the One-Time-Password to verify your account
        </p>
        <p className="text-sm text-gray-500 mt-1">
          A One-Time-Password has been sent to your email
        </p>
        <div className="text-sm text-gray-500 mt-2">
          {counter === 0
            ? ""
            : counter === 1
            ? `You can resend One-Time-Password within ${counter} Second`
            : `You can resend One-Time-Password within ${counter} Seconds`}
        </div>
        <form
          className="mt-4 flex justify-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          {segments.map((s, key) => (
            <input
              type="text"
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
              id={`digit-${key}`}
              maxLength={1}
              key={key}
              onChange={handleChange(key)}
              value={s}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && s === "") {
                  if (key > 0) {
                    inputFocus(key - 1);
                  }
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "ArrowLeft" && key > 0) {
                  inputFocus(key - 1);
                } else if (e.key === "ArrowRight" && key < 5) {
                  inputFocus(key + 1);
                }
              }}
              autoFocus={key === 0}
            />
          ))}
        </form>
        <button
          type="button"
          className={`text-white px-4 py-2 mt-4 rounded ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleResendOtp}
          disabled={buttonDisabled}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
