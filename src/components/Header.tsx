import { Link } from "react-router";

function Header() {
  function logout() {}

  return (
    <header className="flex items-center gap-2 bg-black text-white p-3">
      <h1 className="flex-1 text-4xl font-[Gugi]">CHARTER BOX</h1>
      <div className="flex gap-5">
        <div className="cursor-pointer">
          <Link
            to={"/profile"}
            className="flex flex-col justify-center items-center"
          >
            <img
              src="/assets/user.svg"
              alt="logout"
              className="w-[30px] h-auto "
            />
            <div>Profile</div>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <img
            src="/assets/logout.svg"
            alt="logout"
            onClick={logout}
            className="w-[30px] h-auto "
          />
          <div>Log out</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
