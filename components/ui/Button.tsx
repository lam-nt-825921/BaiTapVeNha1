import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed";
        
        const variants = {
            primary: "bg-[#3B82F6] text-white hover:bg-[#2563EB] active:bg-[#1D4ED8] shadow-sm hover:shadow-md transition-all duration-200",
            secondary: "bg-[#F8FAFC] text-[#1E293B] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1] dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 transition-all duration-200",
            outline: "border-2 border-[#E2E8F0] bg-transparent text-[#1E293B] hover:bg-[#F8FAFC] hover:border-[#3B82F6] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-blue-500 transition-all duration-200",
            ghost: "bg-transparent text-[#1E293B] hover:bg-[#F8FAFC] dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg 
                            className="mr-2 h-4 w-4 animate-spin" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            />
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;

