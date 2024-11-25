import image from "../assets/six faces 1.png";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section
      className="padding-horizontal flex max-lg:flex-col max-lg:gap-20 max-lg:text-center max-lg:items-center my-20 "
      id="home"
    >
      <div className="max-w-[560px] space-y-8">
        <p className="text-primaryText font-bold leading-8">Welcome to Yorfy</p>
        <h1 className="font-bold text-6xl  leading-[66px] max-sm:text-4xl">
          Now Available, Meet Yorfy NFT Collection ⭐️
        </h1>
        <p className="text-secondaryText leading-8 max-sm:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex items-center justify-start xs:gap-10 gap-4 max-lg:justify-center">
          <div>
            <h2 className="text-[40px] font-bold leading-[56px] max-sm:text-lg">
              546
            </h2>
            <p className="leading-8 max-xs:text-sm">NFT Items</p>
          </div>
          <div className="h-20 bg-white border" />
          <div>
            <h2 className="text-[40px] font-bold leading-[56px] max-sm:text-lg">
              42
            </h2>
            <p className="leading-8 max-xs:text-sm">Owners</p>
          </div>
          <div className="h-20 bg-white border" />
          <div>
            <h2 className="text-[40px] font-bold leading-[56px] max-sm:text-lg">
              378
            </h2>
            <p className="leading-8 max-xs:text-sm  ">Items Sold</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center ">
        <img
          src={image}
          alt="Image"
          className="w-[403px] h-[368px] max-sm:w-[300px] max-sm:h-[278px] max-xs:w-[150px] max-xs:h-[139px] rounded-lg relative z-10"
        />
        <div className="relative -z-10 bottom-20 max-sm:bottom-11 w-full">
          <div className="w-full">
            <div className="bg-[rgba(255,255,255,0.1)] w-[480px] h-[208px] max-sm:w-[360px] max-sm:h-[156px] max-xs:w-full max-xs:h-[150px] py-8 max-sm:py-2 z-0 rounded-lg border-2 border-secondaryText mx-auto flex items-end">
              <div className="flex w-full max-sm:px-4 max-sm:flex-col justify-center gap-8 max-sm:gap-2">
                <Button text="Buy on OpenSea" />
                <button className="border border-white w-full sm:max-w-[170px] py-2 rounded-lg">
                  Know More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
