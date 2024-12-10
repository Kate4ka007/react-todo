import clsx from "clsx";
import React from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ className, onClick, isActive = false, children, ...props }) => {
  return (
    <button className={clsx(styles.button, className, { [styles.active]: isActive })} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
