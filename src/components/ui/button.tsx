// 📁 src/components/ui/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";


const buttonVariants = cva(
"inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
{
variants: {
variant: {
default: "bg-primary text-primary-foreground hover:opacity-90",
secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
ghost: "hover:bg-accent hover:text-accent-foreground",
link: "text-primary underline-offset-4 hover:underline",
},
size: {
default: "h-10 px-4 py-2",
sm: "h-9 rounded-xl px-3",
lg: "h-11 rounded-3xl px-6",
icon: "h-10 w-10",
},
},
defaultVariants: { variant: "default", size: "default" },
}
);


export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant, size, ...props }, ref) => (
<button
ref={ref}
className={cn(buttonVariants({ variant, size }), className)}
{...props}
/>
)
);
Button.displayName = "Button";