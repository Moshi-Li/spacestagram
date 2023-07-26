import { useState } from "react";

const DescriptionSection = ({ description }: { description: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="description--section">
      <p className={open ? "description--open" : ""}>{description}</p>
      {!open && <span onClick={() => setOpen(true)}>more</span>}
    </div>
  );
};

export default DescriptionSection;
