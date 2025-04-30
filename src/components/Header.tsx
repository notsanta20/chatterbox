import { Link } from "react-router";

function Header({
  setRender,
  darkTheme,
  setDarkTheme,
}: {
  setRender: Function;
  darkTheme: boolean;
  setDarkTheme: Function;
}) {
  const htmlElement: HTMLHtmlElement | null = document.querySelector(`html`);

  if (htmlElement) {
    if (darkTheme) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }

  function logout() {
    localStorage.setItem("authToken", " ");
    const num = Math.floor(Math.random() * 100);
    setRender(num);
  }

  function handleTheme() {
    if (darkTheme) {
      setDarkTheme(false);
      localStorage.setItem("theme", "light");
    } else {
      setDarkTheme(true);
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <header className="flex items-center gap-2 p-3 border-b-2 border-(--light-gray) dark:border-(--dark-gray)">
      <h1 className="flex-1 text-2xl md:text-4xl text-center md:text-left font-[Gugi]">
        CHARTER BOX
      </h1>
      <div className="hidden md:flex items-center gap-5">
        <div className="cursor-pointer" onClick={handleTheme}>
          <img
            src={"/assets/" + (darkTheme ? "sun.svg" : "moon.svg")}
            alt="logout"
            className="w-[30px] h-auto"
          />
        </div>
        <div className="cursor-pointer">
          <Link
            to={"/profile"}
            className="flex flex-col justify-center items-center"
          >
            <img
              src={"/assets/" + (darkTheme ? "user.svg" : "user-dark.svg")}
              alt="logout"
              className="w-[30px] h-auto "
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <img
            src={"/assets/" + (darkTheme ? "logout.svg" : "logout-dark.svg")}
            alt="logout"
            onClick={logout}
            className="w-[30px] h-auto "
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
