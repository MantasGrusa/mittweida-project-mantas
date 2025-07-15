// components/InputField.tsx
import React from "react";
import "./Input.css";
interface InputFieldProps {
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, type = "text", value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-full  text-white placeholder-white/70 focus:outline-none mb-4"
        />
    );
};

export default InputField;
