import logo1 from "../assets/Logo 1.png";
import logo2 from "../assets/Logo 2.png";
import logo3 from "../assets/Logo 3.png";
import logo4 from "../assets/Logo 4.png";

export default function Partners() {
  return (
    <div
      id="collab"
      className="flex flex-col w-full  padding-horizontal justify-center items-center mt-24 gap-10"
    >
      <div className="w-full max-w-[752px] text-center flex flex-col gap-4">
        <p className="text-primaryText font-bold leading-8">Collaboration</p>
        <h2 className="font-bold text-[56px]  leading-[66px] max-sm:text-4xl">
          Our Partners
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-start  gap-14  max-md:gap-6">
        <div>
          <img src={logo1} className="max-lg:w-[280px]" alt="" />
        </div>
        <div>
          <img src={logo2} className="max-lg:w-[280px]" alt="" />
        </div>
        <div>
          <img src={logo3} className="max-lg:w-[280px]" alt="" />
        </div>
        <div>
          <img src={logo4} className="max-lg:w-[280px]" alt="" />
        </div>
      </div>
    </div>
  );
}
