import React from 'react';

interface OtpEmailProps {
  name: string;
  code: string;
  year: number;
}

export const OtpEmail = ({ name, code, year }: OtpEmailProps) => (
  <div className="bg-gray-100 min-h-screen py-8 px-4">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-blue-600 text-2xl font-bold mb-4">
        Verify Your Email Address
      </h2>

      <p className="mb-2">Hello {name},</p>

      <p className="mb-4">
        Welcome to our Real Estate Platform! We're excited to have you join our
        community of property buyers, sellers, landlords, tenants, and agents.
        Please use the verification code below to confirm your email address.
        This code will expire in <strong>10 minutes</strong>.
      </p>

      <div className="text-2xl font-bold text-blue-600 bg-blue-50 p-4 rounded text-center tracking-widest mb-4">
        {code}
      </div>

      <p className="text-gray-700 text-sm mb-4">
        Verifying your email helps keep your account secure and enables you to
        list properties, contact clients, receive inquiries, and manage your
        real estate activities with confidence.
      </p>

      <p className="text-gray-700 text-sm">
        If you didn't create an account on our platform, you can safely ignore
        this email.
      </p>

      <div className="text-gray-500 text-xs text-center mt-6">
        &copy; {year} Real Estate Platform. All rights reserved.
      </div>
    </div>
  </div>
);