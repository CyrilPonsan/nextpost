import React from "react";

interface SubmitButtonProps {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const baseStyle =
    "btn btn-primary border-none focus:outline-none active:outline-none";

  const style = props.isLoading ? baseStyle + "  flex pl-8" : baseStyle;

  return (
    <>
      {props.isLoading ? (
        <button className={style} disabled={props.isLoading}>
          <span className="loading loading-spinner"></span>
          <p className="flex-1">{props.loadingLabel}</p>
        </button>
      ) : (
        <button className={style} type="submit">
          {props.label}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
