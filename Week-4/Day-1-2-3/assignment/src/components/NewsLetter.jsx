import { useRef } from "react";
import Button from "./ui/Button";
import toast from "react-hot-toast";

export default function NewsLetter() {
  const emailRef = useRef();

  const handleClick = () => {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const email = emailRef.current.value;
    if (!email.match(pattern)) {
      toast.error("Invalid Email");
      return;
    }
    toast.success("Newsletter Subscribed");
    emailRef.current.value = null;
  };

  return (
    <div id="newsletter" className="padding-horizontal mt-24">
      <div className="flex flex-col w-full bg-[#081956] p-12 max-sm:px-4 rounded-2xl justify-center items-center  gap-10">
        <div className="w-full max-w-[752px] text-center flex flex-col gap-4 items-center">
          <p className="text-primaryText font-bold leading-8">Newsletter</p>
          <h2 className="font-bold text-[40px]  leading-[56px] max-sm:text-2xl">
            You Do Not Want to Miss Out on this!
          </h2>
          <p className="text-secondaryText leading-8 max-sm:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="w-full max-w-[635px] flex justify-center items-center max-sm:flex-col">
            <input
              ref={emailRef}
              type="email"
              placeholder="Your Email"
              className="max-w-[480px] w-full focus:outline-none rounded-lg border border-white bg-transparent py-2 px-4"
            />
            <Button
              onClick={handleClick}
              text="Submit"
              className="sm:ms-4 w-[139px]  max-sm:mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
