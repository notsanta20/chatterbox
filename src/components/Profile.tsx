import { useRef } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface user {
  id: string;
  username: string;
  bio: string | null;
}

interface bio {
  bio: string;
}

const schema = z.object({
  bio: z
    .string()
    .max(40, { message: "Bio should not be more than 40 characters" }),
});

function Profile({
  darkTheme,
  data,
  setRefresh,
}: {
  darkTheme: boolean;
  data: user | null;
  setRefresh: Function;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  function openModal() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function closeModal() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function editBio(data: bio) {
    axios
      .post(`${url}/bio`, data, header)
      .then(() => {
        const num = Math.floor(Math.random() * 100);
        setRefresh(num);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        <div className="border-2 border-(--light-gray) dark:border-(--dark-gray) w-[500px] h-[250px] rounded-2xl flex items-center gap-10 p-10">
          <div className="flex justify-center items-center rounded-full bg-(--light-gray) dark:bg-(--dark-gray) w-[100px] h-[100px]">
            <h2 className="text-6xl font-bold">
              {data && data.username[0].toUpperCase()}
            </h2>
          </div>
          <div className="border-l-2 border-(--light-gray) dark:border-(--dark-gray) p-5 justify-self-start h-[150px] flex flex-1 flex-col justify-around text-xl">
            <h2>{data && data.username}</h2>
            <div className="flex w-full">
              <p className="flex-1 line-clamp-2">
                {data && (data.bio ? data.bio : "Add Bio")}
              </p>
              <div className="cursor-pointer" onClick={openModal}>
                <img
                  src={
                    "/assets/" + (darkTheme ? "pencil.svg" : "pencil-dark.svg")
                  }
                  alt="edit bio"
                  className="w-[30px] h-auto "
                />
              </div>
              <dialog
                ref={dialogRef}
                className="bg-white text-black dark:bg-black dark:text-white border-2 border-(--light-gray) dark:border-(--dark-gray) rounded-2xl w-[30vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                <div className="flex flex-col gap-3 items-center h-full p-3 font-normal">
                  <form
                    className="flex-1 flex flex-col gap-2 min-w-[300px]"
                    onSubmit={handleSubmit(editBio)}
                  >
                    <input
                      {...register("bio")}
                      type="text"
                      name="bio"
                      id="bio"
                      className="rounded-2xl py-2 px-4 outline-none border-2 border-(--light-gray) dark:border-(--dark-gray)"
                    />
                    <div className="text-red-700 text-sm h-[20px]">
                      {typeof errors.bio === "undefined"
                        ? " "
                        : errors.bio.message}
                    </div>
                    <button className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--white-gray) dark:hover:bg-(--dark-gray)">
                      Add bio
                    </button>
                  </form>
                  <button
                    onClick={closeModal}
                    className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--white-gray) dark:hover:bg-(--dark-gray)"
                  >
                    Close
                  </button>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
