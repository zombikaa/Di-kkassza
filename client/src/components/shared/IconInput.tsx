import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { useState } from "react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  password: boolean;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ icon, password, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            className={`peer ps-9 ${password && "pe-9"}`}
            {...props}
            type={password ? (isVisible ? "text" : "password") : props.type}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {icon}
          </div>
          {password && (
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-controls="password"
            >
              {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

IconInput.displayName = "IconInput";
