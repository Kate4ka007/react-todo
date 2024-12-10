import clsx from "clsx";
import React from "react";

import { CloseIcon } from "../Close/CloseIcon.tsx";
import styles from "./DeleteButton.module.css";

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ className, onClick, ...props }) => {
  return (
    <button className={clsx(styles.deleteButton, className)} onClick={onClick} {...props}>
      <CloseIcon color="#ff0101" />
    </button>
  );
};
