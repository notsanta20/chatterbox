import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface formData {
  username: string;
  password: string;
  confirmPass: string;
}

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be 3 or more characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
    confirmPass: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords are not matching",
    path: ["confirmPass"],
  });

function Signup() {
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
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    const header = {
      headers: { Authorization },
    };
    const url = "http://localhost:3000";

    axios
      .post(`${url}/signup`, data, header)
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        const message = err.response.data.error;

        if (message === `username already exists`) {
          setError("username", { message: message });
        } else {
          setError("password", { message: "Internal server error, try again" });
        }
      });
  }

  return (
    <main className="bg-black text-white flex flex-col items-center justify-evenly h-screen ">
      <h1 className="text-4xl font-[Gugi] text-center">CHARTER BOX</h1>
      <form
        className="flex flex-col gap-4 w-[380px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center font-semibold text-2xl">SIGN UP</h2>
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="Username" className="px-4">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="Username"
            name="Username"
            className={
              "border-2 rounded-4xl py-2 px-4 outline-none " +
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
            type="text"
            id="password"
            name="password"
            className={
              "border-2 rounded-4xl py-2 px-4 outline-none " +
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
        <div className="flex flex-col gap-3 text-lg">
          <label htmlFor="confirmPass" className="px-4">
            Confirm Password
          </label>
          <input
            {...register("confirmPass")}
            type="text"
            id="confirmPass"
            name="confirmPass"
            className={
              "border-2 rounded-4xl py-2 px-4 outline-none " +
              (typeof errors.confirmPass === "undefined"
                ? "border-white"
                : "border-red-700")
            }
          />
          <div className="h-5 text-red-700">
            {typeof errors.confirmPass === "undefined"
              ? " "
              : errors.confirmPass.message}
          </div>
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
