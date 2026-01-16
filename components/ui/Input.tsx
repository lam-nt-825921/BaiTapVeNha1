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
                        className="block text-sm font-medium text-[#1E293B] dark:text-slate-300 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
                        block w-full rounded-lg border px-4 h-11 text-[#1E293B]
                        bg-white placeholder:text-slate-400
                        focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
                        transition-all duration-200
                        disabled:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:text-slate-500
                        dark:bg-slate-800 dark:text-white dark:border-slate-700
                        dark:placeholder:text-slate-500 dark:focus:ring-blue-400
                        ${error 
                            ? "border-red-400 focus:ring-red-500 dark:border-red-600" 
                            : "border-[#E2E8F0] dark:border-slate-700"
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

