/* eslint-disable react/prop-types */
export default function Job({ data, onAdd }) {
  const {
    company,
    logo,
    new: isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = data;

  const tags = [role, level, ...languages, ...tools];

  return (
    <div
      className={`max-sm:mb-8 bg-white rounded-md shadow-xl px-6 flex max-md:flex-col md:items-center py-8 gap-4 border-s-4 ${
        isNew && featured ? "border-primary" : "border-white"
      }`}
    >
      <div className="flex gap-4 lg:w-1/2 md:w-[65%] max-sm:flex-col max-sm:-mt-12 ">
        <img src={logo} alt="" className="sm:w-24 sm:h-24 w-12 h-12" />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg text-primary flex gap-3 flex-wrap ">
            <span>{company}</span>
            {isNew && (
              <button className="text-xs text-white bg-primary rounded-full px-3 py-1">
                NEW!
              </button>
            )}
            {featured && (
              <button className="text-xs text-white bg-secondary rounded-full px-3 py-1">
                FEATURED
              </button>
            )}
          </p>
          <p className="text-2xl text-secondary font-bold hover:text-primary transition-colors cursor-pointer max-xs:text-lg">
            {position}
          </p>
          <p className="text-primaryText font-bold flex gap-4 max-xs:gap-1 max-xs:text-xs">
            <span>{postedAt}</span>
            <span>.</span>
            <span>{contract}</span>
            <span>.</span>
            <span>{location}</span>
          </p>
        </div>
      </div>
      <div className="block sm:hidden border border-primaryText" />
      <div className="flex lg:w-1/2 md:w-[35%]  items-center md:justify-end   gap-4 flex-wrap">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="tag-btn px-2 py-1 rounded-md hover:bg-primary hover:text-white transition-colors text-primary font-bold"
            onClick={() => onAdd(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
