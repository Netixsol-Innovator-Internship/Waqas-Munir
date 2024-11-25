import image from "../assets/six faces single.png";
import logo from "../assets/Logo.png";
import Button from "./ui/Button";

export default function Highlight() {
  return (
    <div
      id="nft"
      className="flex flex-col w-full   padding-horizontal justify-center items-center mt-24 gap-10"
    >
      <div className="w-full max-w-[752px] text-center flex flex-col gap-4">
        <p className="text-primaryText font-bold leading-8">Featured</p>
        <h2 className="font-bold text-[56px]  leading-[66px] max-sm:text-4xl">
          Hot Trending On This Week from Yorfy
        </h2>
        <p className="text-secondaryText leading-8 max-sm:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="w-full flex bg-[#081956] py-10 lg:px-6 max-lg:flex-col rounded-2xl gap-8 justify-center items-center">
        <div className="max-w-[272px] w-full flex flex-col justify-center items-center text-center gap-4">
          <img src={logo} className="w-20 h-20" alt="" />
          <p className="font-bold text-[40px] leading-[56px] max-sm:text-xl">
            YorEyes #234
          </p>
          <p className="leading-8 max-sm:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <img
            src={image}
            className="w-[400px] h-[400px] max-sm:w-[300px] max-sm:h-[300px] max-xs:w-[150px] max-xs:h-[150px]"
            alt=""
          />
        </div>
        <div className="max-w-[272px] w-full flex flex-col justify-center items-center text-center gap-4">
          <p className="font-bold text-[40px] leading-[56px] max-sm:text-xl">
            Interesting with This Item?
          </p>
          <p className="leading-8 max-sm:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button text="Buy on OpenSea" />
        </div>
      </div>
    </div>
  );
}
