import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface users {
  id: string;
  username: string;
  profile: string | null;
}

function AddContact() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [data, setData] = useState<Array<users> | null>(null);
  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, header)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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

  function addContact(id: string) {
    closeModal();
    const data = {
      contactId: id,
    };
    axios
      .post(`${url}/contacts`, data, header)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div>
      <button onClick={openModal} className="cursor-pointer">
        Add Contacts
      </button>
      <dialog
        ref={dialogRef}
        className="bg-(--mid-gray) text-white border-1 border-(--light-gray) rounded-2xl w-[30vw] h-[50vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="flex flex-col gap-3 items-center h-full p-3 font-normal">
          <ul className="w-full flex-1 flex flex-col gap-3">
            {data &&
              data.map((m) => (
                <li
                  className="flex items-center gap-3 rounded-2xl bg-(--light-gray) border-1 border-(--white-gray)  hover:bg-(--white-gray) py-2 px-4 "
                  key={m.id}
                >
                  <div className="w-[35px] h-[35px]">
                    <img src="/assets/chat.svg" alt="profile picture" />
                  </div>
                  <h2 className="flex-1 text-left">{m.username}</h2>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      addContact(m.id);
                    }}
                  >
                    Add contact
                  </button>
                </li>
              ))}
          </ul>
          <button
            onClick={closeModal}
            className="cursor-pointer py-2 px-6 rounded-2xl bg-(--light-gray) border-1 border-(--white-gray) hover:bg-(--white-gray)"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default AddContact;
