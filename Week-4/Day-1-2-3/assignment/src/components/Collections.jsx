import image1 from "../assets/Collectionimage1.png";
import image2 from "../assets/Collectionimage2.png";
import image3 from "../assets/Collectionimage3.png";
import logo from "../assets/Logo.png";

const DATA = [
  { id: 1, img: image1, text: "YorNoose #432" },
  { id: 2, img: image2, text: "YorHayr #332" },
  { id: 3, img: image3, text: "YorMwoth #765" },
];

export default function Collections() {
  return (
    <div
      id="roadmap"
      className="flex flex-col w-full  padding-horizontal justify-center items-center mt-24 gap-10"
    >
      <div className="w-full max-w-[752px] text-center flex flex-col gap-4">
        <p className="text-primaryText font-bold leading-8">Collections</p>
        <h2 className="font-bold text-[56px]  leading-[66px] max-sm:text-4xl">
          Yorfy NFT Collections
        </h2>
        <p className="text-secondaryText leading-8 max-sm:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="w-full grid md:grid-cols-3 rounded-2xl gap-6 justify-center items-center">
        {DATA.map((d) => (
          <div
            key={d.id}
            className="max-w-[368px]  rounded-lg border border-primary lg:p-6 p-3 w-full flex flex-col justify-center items-center text-center gap-4"
          >
            <img
              src={d.img}
              alt=""
              className="rounded-lg max-w-80 max-h-80 w-full h-full"
            />
            <div className="w-full xs:px-2 px-1 mt-2 flex xs:gap-2 gap-2 items-center">
              <img src={logo} className="lg:w-10 lg:h-10 w-5 h-5" alt="" />
              <p className="xs:text-lg lg:text-2xl text-base font-bold">
                {d.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="border border-white py-2 max-w-[222px] w-full rounded-lg">
        View on OpenSea
      </button>
    </div>
  );
}
