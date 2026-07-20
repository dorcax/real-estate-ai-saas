import React from "react";

interface ForgotPasswordEmailProps {
  name: string;
  code: string;
  year: number;
}

export const ForgotPasswordEmail = ({
  name,
  code,
  year,
}: ForgotPasswordEmailProps) => (
  <div className="bg-gray-100 min-h-screen py-8 px-4">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">Password Reset Request</h1>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 mb-4">
          Hello <span className="font-semibold">{name}</span>,
        </p>

        <p className="text-gray-700 mb-4">
          We received a request to reset the password for your Real Estate
          account.
        </p>

        <p className="text-gray-700 mb-6">
          Use the One-Time Password (OTP) below to continue with resetting your
          password. This code is valid for{" "}
          <span className="font-semibold text-red-600">10 minutes</span>.
        </p>

        {/* OTP */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center mb-6">
          <p className="text-gray-500 text-sm mb-2">Your Reset Code</p>

          <h2 className="text-4xl font-bold tracking-[10px] text-blue-600">
            {code}
          </h2>
        </div>

        <p className="text-gray-700 mb-4">
          If you did not request a password reset, you can safely ignore this
          email. Your account will remain secure.
        </p>

        <p className="text-gray-700">
          For your security, never share this code with anyone.
        </p>
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-6 py-4 text-center">
        <p className="text-xs text-gray-500">
          © {year} Real Estate Platform. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);