import { Link } from "react-router";

function Profile({ darkTheme }: { darkTheme: boolean }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center gap-2 p-3 border-b-2 border-(--light-gray) dark:border-(--dark-gray)">
        <h1 className="flex-1 text-4xl font-[Gugi]">CHARTER BOX</h1>
        <div className="flex gap-5">
          <div className="cursor-pointer">
            <Link
              to={"/chatroom"}
              className="flex flex-col justify-center items-center"
            >
              <img
                src={"/assets/" + (darkTheme ? "home.svg" : "home-dark.svg")}
                alt="logout"
                className="w-[30px] h-auto "
              />
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1 flex justify-center items-center">
        <div className="border-2 border-(--light-gray) dark:border-(--dark-gray) w-[50%] h-[50%] rounded-2xl"></div>
      </div>
    </div>
  );
}

export default Profile;
