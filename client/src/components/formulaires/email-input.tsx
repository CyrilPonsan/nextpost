import React, { ChangeEvent } from "react";

interface EmailInputProps {
  email: string;
  validationError: boolean;
  onChange: (value: string) => void;
}

const EmailInput = (props: EmailInputProps) => {
  const { email, validationError, onChange } = props;

  const baseStyle = "input focus:outline-none";

  const style = validationError ? baseStyle + " input-error" : baseStyle;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label className="pl-1" htmlFor="email">
        Adresse Email
      </label>
      <input
        className={style}
        required
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Adresse Email"
      />
    </div>
  );
};

export default EmailInput;
