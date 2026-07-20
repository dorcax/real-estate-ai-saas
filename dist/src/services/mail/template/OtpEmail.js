"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const OtpEmail = ({ name, code, year }) => ((0, jsx_runtime_1.jsx)("div", { className: "bg-gray-100 min-h-screen py-8 px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-md mx-auto bg-white rounded-lg shadow p-6", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-blue-600 text-2xl font-bold mb-4", children: "Verify Your Email Address" }), (0, jsx_runtime_1.jsxs)("p", { className: "mb-2", children: ["Hello ", name, ","] }), (0, jsx_runtime_1.jsxs)("p", { className: "mb-4", children: ["Welcome to our Real Estate Platform! We're excited to have you join our community of property buyers, sellers, landlords, tenants, and agents. Please use the verification code below to confirm your email address. This code will expire in ", (0, jsx_runtime_1.jsx)("strong", { children: "10 minutes" }), "."] }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600 bg-blue-50 p-4 rounded text-center tracking-widest mb-4", children: code }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 text-sm mb-4", children: "Verifying your email helps keep your account secure and enables you to list properties, contact clients, receive inquiries, and manage your real estate activities with confidence." }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 text-sm", children: "If you didn't create an account on our platform, you can safely ignore this email." }), (0, jsx_runtime_1.jsxs)("div", { className: "text-gray-500 text-xs text-center mt-6", children: ["\u00A9 ", year, " Real Estate Platform. All rights reserved."] })] }) }));
exports.OtpEmail = OtpEmail;
//# sourceMappingURL=OtpEmail.js.map