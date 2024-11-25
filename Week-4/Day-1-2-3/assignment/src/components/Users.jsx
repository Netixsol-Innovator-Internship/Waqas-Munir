export default function Users() {
  const users = [
    { name: "ShooPharDhie", lastOnline: "Last Online 2 Hour Ago" },
    { name: "ShooPharDhie", lastOnline: "Last Online 2 Hour Ago" },
    { name: "ShooPharDhie", lastOnline: "Last Online 2 Hour Ago" },
  ];

  return (
    <div className="relative p-6 max-w-[400px] w-full flex flex-col space-y-4 max-sm:hidden md:ms-auto">
      {users.map((user, index) => (
        <div
          key={index}
          className={`flex items-center justify-between bg-primaryBg max-w-[300px] card-shadows  text-white p-4 rounded-lg `}
          style={{
            transform: `translateX(${index * 15}px)`,
            opacity: 1 - index * 0.25,
          }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
            <div className="text-start">
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-300">{user.lastOnline}</p>
            </div>
          </div>

          <div>
            <button className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
