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
        <div className="border-2 border-(--light-gray) dark:border-(--dark-gray) w-[20%] h-[30%] rounded-2xl flex items-center gap-10 p-10">
          <div className="flex justify-center items-center rounded-full bg-(--light-gray) dark:bg-(--dark-gray) w-[100px] h-[100px]">
            <h2 className="text-6xl font-bold">U</h2>
          </div>
          <div className="border-l-2 border-(--light-gray) dark:border-(--dark-gray) p-5 justify-self-start h-[150px] flex flex-col justify-around">
            <h2>username</h2>
            <p>Bio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
