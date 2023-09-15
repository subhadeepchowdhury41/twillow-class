interface TextInputProps {
  placeholder?: string;
  value?: string;
  noborder?: boolean;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, noborder, value, type = "text", onChange, disabled, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className={`
          w-full
          p-4 
          text-lg 
          bg-black 
          ${noborder ? '' : 'border-2 focus:border-2'}
          border-neutral-800 
          rounded-md
          outline-none
          text-white
          focus:border-sky-500
          
          transition
          disabled:bg-neutral-900
          disabled:opacity-70
          disabled:cursor-not-allowed
        `}
      />
    </div>
   );
}
 
export default TextInput;