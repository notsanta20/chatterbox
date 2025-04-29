import { Link } from "react-router";

function Profile() {
  return (
    <div className="h-screen">
      <header className="flex items-center gap-2 p-3 border-b-2 border-(--mid-gray)">
        <h1 className="flex-1 text-4xl font-[Gugi]">CHARTER BOX</h1>
        <div className="flex gap-5">
          <div className="cursor-pointer">
            <Link
              to={"/chatroom"}
              className="flex flex-col justify-center items-center"
            >
              <img
                src="/assets/user.svg"
                alt="logout"
                className="w-[30px] h-auto "
              />
              <div>Home</div>
            </Link>
          </div>
        </div>
      </header>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
