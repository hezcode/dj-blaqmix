"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactElement } from "react";

interface BtnProps {
  text: string;
  Icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  action?: string;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
}

const CustomButton = ({
  text,
  Icon,
  onClick,
  action,
  className,
  type = "button",
  disabled = false,
}: BtnProps) => {
  const router = useRouter();

  const handleBtnClick = () => {
    if (action === "book") {
      router.push("/make-booking");
    }
    if (action === "make_enquiry") {
      router.push("/contact-us");
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "flex items-center gap-x-3 px-4 py-4 font-body-inter max-sm:px-3",
        disabled ? "cursor-not-allowed opacity-60" : "hover:cursor-pointer",
        className,
      )}
      onClick={onClick || handleBtnClick}
    >
      {Icon}
      <p>{text}</p>
    </button>
  );
};

export default CustomButton;
