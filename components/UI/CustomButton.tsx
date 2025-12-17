import clsx from "clsx";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

interface BtnProps {
  text: string;
  Icon?: ReactElement;
  onClick?: () => void;
  action?: string;
  className?: string;
}

const CustomButton = ({ text, Icon, onClick, action, className }: BtnProps) => {
  const handleBtnClick = () => {
    if (action === "book") {
      redirect("/make-booking");
    }
    if (action === "make_enquiry") {
      redirect("/contact-us");
    }
  };
  return (
    <button
      className={clsx(
        `flex items-center gap-x-3  py-4 px-4 max-sm:px-3 hover:cursor-pointer font-body-inter  `,
        className
      )}
      onClick={onClick || handleBtnClick}
    >
      {Icon}
      <p> {text} </p>
    </button>
  );
};

export default CustomButton;
