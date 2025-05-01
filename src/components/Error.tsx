import { Link } from "react-router";

function Error() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="border-2 border-(--light-gray) dark:border-(--dark-gray) flex flex-col justify-center items-center gap-5 p-10 rounded-2xl">
        <h1 className="text-xl">Unauthorized Entry, Login to see chats.</h1>
        <Link to={"/login"}>
          <button className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--white-gray) dark:hover:bg-(--dark-gray)">
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Error;
