import React from "react";

type Props = {
  handleClick: () => void;
  type: string | React.ReactNode;
  className: string;
};

const Action = ({ handleClick, type, className }: Props) => {
  return (
    <div className={className} onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;
