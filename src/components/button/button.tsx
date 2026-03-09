import { cn } from "@/src/lib/utils";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  isLoading?: boolean;
}

export function Button({ variant, isLoading, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-30 h-8 py-2 px-4 rounded-lg font-bold text-[16px] transition-colors cursor-pointer disabled:bg-gray-400",
        variant === 'primary' && "bg-primary text-white",
        variant === 'danger' && "bg-red-600 text-white hover:bg-red-700",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}