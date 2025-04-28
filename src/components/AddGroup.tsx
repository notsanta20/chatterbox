import { useState, useEffect, useRef } from "react";
import axios from "axios";

function AddGroup() {
  const [data, setData] = useState<Array<object> | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const groupDialogRef = useRef<HTMLDialogElement | null>(null);
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
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

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

  function joinGroup() {}

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

  function createGroup() {}

  return (
    <div>
      <button onClick={openModal} className="cursor-pointer">
        Join Group
      </button>
      <dialog
        ref={dialogRef}
        className="bg-(--mid-gray) text-white border-1 border-(--light-gray) rounded-2xl w-[30vw] h-[50vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="flex flex-col gap-3 items-center h-full p-3 font-normal">
          <button
            onClick={openGroupModal}
            className="cursor-pointer py-2 px-6 rounded-2xl bg-(--light-gray) border-1 border-(--white-gray) hover:bg-(--white-gray)"
          >
            Create Group
          </button>
          <ul className="w-full flex-1 flex flex-col gap-3"></ul>
          <button
            onClick={closeModal}
            className="cursor-pointer py-2 px-6 rounded-2xl bg-(--light-gray) border-1 border-(--white-gray) hover:bg-(--white-gray)"
          >
            Close
          </button>
        </div>
      </dialog>
      <dialog
        ref={groupDialogRef}
        className="bg-(--mid-gray) text-white border-1 border-(--light-gray) rounded-2xl w-[30vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="flex flex-col gap-3 items-center h-full p-3 font-normal">
          <form className="flex-1 flex flex-col gap-5">
            <div className="text-xl">Enter Group name</div>
            <input
              type="text"
              name="name"
              id="name"
              className="rounded-2xl py-2 px-4 outline-none border-2 border-(--light-gray)"
            />
            <button
              onClick={createGroup}
              className="cursor-pointer py-2 px-6 rounded-2xl bg-(--light-gray) border-1 border-(--white-gray) hover:bg-(--white-gray)"
            >
              Create Group
            </button>
          </form>
          <button
            onClick={closeGroupModal}
            className="cursor-pointer py-2 px-6 rounded-2xl bg-(--light-gray) border-1 border-(--white-gray) hover:bg-(--white-gray)"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default AddGroup;
