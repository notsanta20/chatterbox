import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  groupName: z
    .string()
    .min(2, { message: "Group name must be at least 2 characters" }),
});

function AddGroup({ setRefresh }: { setRefresh: Function }) {
  const [data, setData] = useState<Array<object> | null>(null);
  const [refreshGrp, setRefreshGrp] = useState<number>(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const groupDialogRef = useRef<HTMLDialogElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    axios
      .get(`${url}/groups`, header)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [refreshGrp]);

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

  function joinGroup(id: string) {
    const data = {
      groupId: id,
    };
    axios
      .post(`${url}/join-grp`, data, header)
      .then(() => {
        const num = Math.floor(Math.random() * 100);
        setRefresh(num);
      })
      .catch((error) => {
        console.log(error.response);
      });
    closeModal();
  }

  function openGroupModal() {
    if (groupDialogRef.current) {
      groupDialogRef.current.showModal();
    }
  }

  function closeGroupModal() {
    if (groupDialogRef.current) {
      groupDialogRef.current.close();
    }
  }

  function onSubmit(data) {
    axios
      .post(`${url}/create-grp`, data, header)
      .then((res) => {
        const num = Math.floor(Math.random() * 100);
        setRefreshGrp(num);
        setRefresh(num);
        closeGroupModal();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="cursor-pointer w-full py-2 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--light-gray) dark:hover:bg-(--dark-gray)"
      >
        Join Group
      </button>
      <dialog
        ref={dialogRef}
        className="bg-white text-black dark:bg-black dark:text-white border-2 border-(--light-gray) dark:border-(--dark-gray) rounded-2xl w-[30vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="flex flex-col gap-3 items-center h-full p-3 font-normal">
          <button
            onClick={openGroupModal}
            className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--light-gray) dark:hover:bg-(--dark-gray)"
          >
            Create Group
          </button>
          <ul className="w-full flex-1 flex flex-col gap-3">
            {data &&
              data.map((d) => (
                <li
                  className="flex items-center gap-3 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--light-gray) dark:hover:bg-(--dark-gray) py-2 px-4 "
                  key={d.id}
                >
                  <div className="w-[45px] h-[45px] bg-(--light-gray) dark:bg-(--dark-gray) rounded-full flex justify-center items-center">
                    <h2 className=" font-bold text-lg">
                      {d.name[0].toUpperCase()}
                    </h2>
                  </div>
                  <h2 className="flex-1 text-left">{d.name}</h2>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      joinGroup(d.id);
                    }}
                  >
                    Join Group
                  </button>
                </li>
              ))}
          </ul>
          <button
            onClick={closeModal}
            className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--light-gray) dark:hover:bg-(--dark-gray)"
          >
            Close
          </button>
        </div>
      </dialog>
      <dialog
        ref={groupDialogRef}
        className="bg-white text-black dark:bg-black dark:text-white border-2 border-(--light-gray) dark:border-(--dark-gray) rounded-2xl w-[30vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="flex flex-col gap-3 items-center h-full p-3 font-normal">
          <form
            className="flex-1 flex flex-col gap-2 min-w-[300px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-md text-center">Enter Group name</div>
            <input
              {...register("groupName")}
              type="text"
              name="groupName"
              id="groupName"
              className="rounded-2xl py-2 px-4 outline-none border-2 border-(--light-gray) dark:border-(--dark-gray)"
            />
            <div className="text-red-700 text-sm h-[20px]">
              {typeof errors.groupName === "undefined"
                ? " "
                : errors.groupName.message}
            </div>
            <button className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--white-gray) dark:hover:bg-(--dark-gray)">
              Create Group
            </button>
          </form>
          <button
            onClick={closeGroupModal}
            className="cursor-pointer py-2 px-6 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) hover:bg-(--white-gray) dark:hover:bg-(--dark-gray)"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default AddGroup;
