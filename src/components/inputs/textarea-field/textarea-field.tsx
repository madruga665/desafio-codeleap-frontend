import { cn } from "@/src/lib/utils";

interface TextareaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  className?: string;
}

export function TextareaField({ label, id, className, ...props }: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[16px] font-medium text-[#000000] mb-1">{label}</label>
      <textarea id={id} className={cn("w-full h-18.5 flex flex-start border border-[#777777] rounded-md px-3 py-2 focus:outline-none sm:text-sm",
        className
      )}
        {...props} />
    </div>
  )
}