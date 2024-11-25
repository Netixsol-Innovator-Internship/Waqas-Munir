import Button from "./ui/Button";
import Users from "./Users";

export default function Community() {
  return (
    <section
      id="community"
      className="padding-horizontal flex max-md:flex-col max-md:gap-2 max-md:text-center max-md:items-center my-20 "
    >
      <div className="lg:w-[656px] max-w-[550px] space-y-8">
        <p className="text-primaryText font-bold leading-8">Community</p>
        <h1 className="font-bold lg:text-[56px] md:text-[32px]  lg:leading-[72px] md:leading-[40px] max-sm:text-3xl">
          Join Our Community and Get Many Benefits
        </h1>
        <p className="text-secondaryText leading-8 max-sm:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button text="Join Our Discord" />
      </div>

      <Users />
    </section>
  );
}
