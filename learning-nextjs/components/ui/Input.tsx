import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, helperText, id, ...props }, ref) => {
        const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

        return (
            <div className="w-full">
                {label && (
                    <label 
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
                        block w-full rounded-lg border px-4 py-2.5 text-gray-900
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-colors
                        disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
                        dark:bg-gray-800 dark:text-white dark:border-gray-700
                        dark:placeholder:text-gray-500 dark:focus:ring-blue-400
                        ${error 
                            ? "border-red-300 focus:ring-red-500 dark:border-red-700" 
                            : "border-gray-300 dark:border-gray-700"
                        }
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;

