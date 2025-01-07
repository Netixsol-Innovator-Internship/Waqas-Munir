"use client";

import { useState } from "react";
import axios from "axios";
import { showError } from "@/utils/errorHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth, User } from "@/context/AuthContext";

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [emailSent, setEmailSent] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }

    if (e.key === "Enter" && index === 5) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter 6 digit code");
      return;
    }

    try {
      const response = await axios.post(
        "https://blog-backend-cyan-xi.vercel.app/user/verify-email",
        { email: user?.email, otp: Number(otpString) }
      );
      toast.success(response.data);
      router.push("/auth/signin");
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(
        "https://blog-backend-cyan-xi.vercel.app/user/resend-otp",
        { email: user?.email }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 min-h-screen dark:bg-darkSecondary">
      {emailSent && (
        <div className="text-center text-gray-700 dark:text-white">
          <p className="text-xl font-semibold">
            An email with a 6-digit OTP has been sent to{" "}
            <a
              className="text-primary italic"
              href={`https://www.gmail.com`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.email}
            </a>
            .
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Please check your inbox (and spam folder) for the OTP to proceed.
          </p>
        </div>
      )}

      <div className="flex justify-center items-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="xs:w-12 xs:h-12 w-8 h-8 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkBg"
          />
        ))}
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleResend}
          className="xs:px-6 px-3 xs:py-2 py-1 bg-transparent text-primary border-2 border-primary rounded-lg hover:border-blue-600 transition-all hover:text-blue-600"
        >
          Resend OTP
        </button>
        <button
          onClick={handleSubmit}
          className="xs:px-6 px-3 xs:py-2 py-1 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpInput;
