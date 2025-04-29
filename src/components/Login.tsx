import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface formData {
  username: string;
  password: string;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be 3 or more characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: formData) {
    const url = "http://localhost:3000";

    axios
      .post(`${url}/login`, data)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        navigate("/chatroom", { replace: true });
      })
      .catch((err) => {
        const message = err.response.data.error;

        if (message === `Username does not exists`) {
          setError("username", { message: message });
        } else if (message === `password is not matching`) {
          setError("password", { message: message });
        }
      });
  }

  return (
    <main className="bg-black text-white flex flex-col items-center h-screen">
      <h1 className="text-4xl font-[Gugi] flex justify-center items-center h-[30%]">
        CHARTER BOX
      </h1>
      <form
        className="flex flex-col gap-4 w-[380px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center font-semibold text-2xl">LOG IN</h2>
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="username" className="px-4">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            className={
              "border-2 dark:border-(--dark-gray) rounded-2xl py-2 px-4 outline-none " +
              (typeof errors.username === "undefined"
                ? "border-white"
                : "border-red-700")
            }
          />
          <div className="h-5 text-red-700">
            {typeof errors.username === "undefined"
              ? " "
              : errors.username.message}
          </div>
        </div>
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="password" className="px-4">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            className={
              "border-2 dark:border-(--dark-gray) rounded-2xl py-2 px-4 outline-none " +
              (typeof errors.password === "undefined"
                ? "border-white"
                : "border-red-700")
            }
          />
          <div className="h-5 text-red-700">
            {typeof errors.password === "undefined"
              ? " "
              : errors.password.message}
          </div>
        </div>
        <button className="border-2 dark:border-(--dark-gray) rounded-2xl py-2 px-4 my-3 cursor-pointer font-semibold hover:bg(--light-gray) dark:hover:bg-(--dark-gray)">
          Log In
        </button>
        <h3 className="text-center">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="italic underline">
            Sign Up
          </Link>
        </h3>
      </form>
    </main>
  );
}

export default Login;
