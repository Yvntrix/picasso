import { ChangeEvent, FC } from "react";

interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const FormField: FC<FormFieldProps> = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-emerald-300 hover:bg-emerald-400 py-1 px-2 rounded-md text-white"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className="bg-eme border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500  outline-none block w-full p-3"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;
