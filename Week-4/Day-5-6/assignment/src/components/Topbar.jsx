import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function Topbar({ tags, onClear, onRemove }) {
  const [isWidth, setIsWidth] = useState(false);

  const checkWidth = () => {
    if (window.innerWidth < 640) {
      setIsWidth(true);
    } else {
      setIsWidth(false);
    }
  };

  useEffect(() => {
    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <header
      className="hero  flex justify-center items-center"
      style={{ marginBottom: isWidth && `${tags.length * 15}px` }}
    >
      {tags.length > 0 && (
        <div className="sm:w-4/5 w-[95%] mx-auto flex justify-between px-8 bg-white rounded-md  mt-28 py-6 shadow-lg items-center ">
          <div className="flex gap-4 flex-wrap">
            {tags.map((tag, index) => (
              <div key={index}>
                <button className="tag-btn px-2 py-1 rounded-s-md  transition-colors text-primary font-bold">
                  {tag}
                </button>
                <button
                  className="text-white bg-primary px-2 py-1 font-bold rounded-e-md hover:bg-secondary transition-all"
                  onClick={() => onRemove(tag)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="">
            <button
              className="text-primaryText hover:underline hover:text-primary transition-colors cursor-pointer"
              onClick={onClear}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
