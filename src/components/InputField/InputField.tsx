import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Theme context import

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  type?: "text" | "password";
}

export function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant,
  size = "md",
  clearable,
  type = "text",
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const { theme } = useTheme();

  // Theme-based classes
  const bgColor =
    variant === "filled"
      ? theme === "dark"
        ? "bg-gray-700"
        : "bg-gray-100"
      : "bg-transparent";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const placeholderColor = theme === "dark" ? "placeholder-gray-300" : "placeholder-gray-500";

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className={`font-medium ${textColor}`}>{label}</label>}
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`border px-3 py-2 rounded w-full ${bgColor} ${textColor} ${placeholderColor} ${
            invalid ? "border-red-500" : "border-gray-300"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange?.({ target: { value: "" } } as any)}
            className="absolute right-8 top-2 text-gray-500"
          >
            ❌
          </button>
        )}
      </div>
      {helperText && <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>{helperText}</span>}
      {invalid && errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  );
}
