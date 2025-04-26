import { useState, useEffect, useRef } from "react";
import axios from "axios";

function AddContact() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [data, setData] = useState<Array<object> | null>(null);
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
    dialogRef.current.showModal();
  }

  function closeModal() {
    dialogRef.current.close();
  }

  function addContact() {
    closeModal();
  }

  return (
    <div>
      <button onClick={openModal} className="cursor-pointer">
        Add Contacts
      </button>
      <dialog
        ref={dialogRef}
        className="bg-(--light-gray) text-white rounded-2xl p-3  "
      >
        <div className="flex flex-col gap-3 items-center w-[30vw] h-[50vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <ul className="w-full flex-1 flex flex-col gap-3">
            {data &&
              data.map((m) => (
                <li className="flex items-center gap-3" key={m.id}>
                  <div className="w-[50px] h-[50px]">
                    <img src="/assets/chat.svg" alt="profile picture" />
                  </div>
                  <h2 className="flex-1 text-left">{m.username}</h2>
                  <button className="cursor-pointer" onClick={addContact}>
                    Add contact
                  </button>
                </li>
              ))}
          </ul>
          <button onClick={closeModal}>Close</button>
        </div>
      </dialog>
    </div>
  );
}

export default AddContact;
