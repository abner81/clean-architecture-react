import React, { useContext } from "react";
import Context from "@/presentation/contexts/form/form-context";
import Styles from "./input-styles.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];

  const getStatus = (): string => {
    return "🔴";
  };
  const getTitle = (): string => {
    return error;
  };

  const enableIput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={Styles.inputWrap}>
      <input readOnly onFocus={enableIput} {...props} />
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
