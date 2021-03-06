import React, { useContext, useRef } from "react";
import Context from "@/presentation/contexts/form/form-context";
import Styles from "./input-styles.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();
  const error = state[`${props.name}Error`];

  const getTitle = (): string => {
    return error ? error : "Tudo certo!";
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const enableIput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? "invalid" : "valid"}
    >
      <input
        {...props}
        placeholder=" "
        ref={inputRef}
        title={error}
        onChange={handleChange}
        data-testid={props.name}
        readOnly
        onFocus={enableIput}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
