import { Link } from "react-router";

function Signup() {
  return (
    <main className="bg-black text-white flex flex-col items-center justify-evenly h-screen">
      <h1 className="text-4xl font-[Gugi] text-center top-(50%) left-(50%)">
        CHARTER BOX
      </h1>
      <form className="flex flex-col gap-4">
        <h2 className="text-center font-semibold text-2xl">SIGN UP</h2>
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="Username" className="px-4">
            Username
          </label>
          <input
            type="text"
            id="Username"
            name="Username"
            className="border-2 border-white rounded-4xl py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="password" className="px-4">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="border-2 border-white rounded-4xl py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="confirmPass" className="px-4">
            Confirm Password
          </label>
          <input
            type="text"
            id="confirmPass"
            name="confirmPass"
            className="border-2 border-white rounded-4xl py-2 px-4"
          />
        </div>
        <button className="border-2 border-white rounded-4xl py-2 px-4 my-3 cursor-pointer font-semibold">
          Sign Up
        </button>
        <h3 className="text-center">
          Already have an account ?{" "}
          <Link to={"/login"} className="italic underline">
            Login
          </Link>
        </h3>
      </form>
    </main>
  );
}

export default Signup;
