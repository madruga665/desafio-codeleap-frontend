interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
}


export function InputField({ label, id, type = 'text', ...props }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[16px] font-medium text-[#000000] mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="mt-1 block w-full px-3 py-2 border border-[#777777] rounded-md focus:outline-none sm:text-sm"
        {...props}
      />
    </div>
  );
};