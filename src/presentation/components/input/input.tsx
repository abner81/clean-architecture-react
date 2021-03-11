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

  const getStatus = (): string => {
    return error ? "🔴" : "🟢";
  };
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
    <div className={Styles.inputWrap}>
      <input
        {...props}
        placeholder=" "
        ref={inputRef}
        onChange={handleChange}
        data-testid={props.name}
        readOnly
        onFocus={enableIput}
      />
      <label onClick={() => inputRef.current.focus()}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
