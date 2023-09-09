import React, { ChangeEvent } from "react";

interface PasswordInputProps {
  password: string;
  validationError: boolean;
  onChange: (value: string) => void;
}

const PasswordInput = (props: PasswordInputProps) => {
  const { password, validationError, onChange } = props;

  const baseStyle = "input focus:outline-none";

  const style = validationError ? baseStyle + " input-error" : baseStyle;

  console.log({ validationError, style });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label className="pl-1" htmlFor="password">
        Mot de Passe
      </label>
      <input
        className={style}
        required
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Mot de Passe"
      />
    </div>
  );
};

export default PasswordInput;
