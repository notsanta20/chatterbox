import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  message: z.string().min(1),
});

function Message({
  messages,
  receiver,
  setRefresh,
}: {
  messages: Array<object> | null;
  receiver: string;
  setRefresh: Function;
}) {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  function TextInput() {
    return (
      <form className="message relative" onSubmit={handleSubmit(sendMessage)}>
        <input
          {...register("message")}
          type="text"
          name="message"
          id="message"
          className="rounded-4xl border-1 border-(--text-gray) w-full px-3 py-2 outline-none"
        />
        <button className="w-[30px] h-[30px] absolute top-[5px] right-[5px] cursor-pointer">
          <img src="/assets/send.svg" alt="send" />
        </button>
      </form>
    );
  }

  function Chat() {
    if (messages) {
      if (messages.length > 0) {
        return (
          <ul className="flex-1 flex flex-col p-3">
            <div className="flex-1 flex flex-col gap-3">
              {messages.map((m) => (
                <li key={m.id} className="flex flex-col">
                  {m.senderId !== receiver && (
                    <p className="self-end p-4 rounded-3xl bg-(--light-gray) text-(--text-gray)">
                      {m.message}
                    </p>
                  )}
                  {m.senderId === receiver && (
                    <p className="self-start p-4 rounded-3xl bg-(--dark-Yellow) text-(--text-gray)">
                      {m.message}
                    </p>
                  )}
                </li>
              ))}
            </div>
            <TextInput />
          </ul>
        );
      } else {
        return (
          <section className="flex-1 flex flex-col justify-center">
            <div className="flex-1 flex justify-center items-center">
              <h2 className="text-xl">No messages, say Hi.</h2>
            </div>
            <TextInput />
          </section>
        );
      }
    }
  }

  function sendMessage(data: object) {
    const newData = {
      message: data.message,
      receiverId: receiver,
    };
    axios
      .post(`${url}/message`, newData, header)
      .then((res) => {
        const num = Math.floor(Math.random() * 100);
        setRefresh(num);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  if (messages) {
    return (
      <section className="flex flex-col p-3 w-full">
        <div className="border-b-2 border-(--text-gray)">Profile Header</div>
        <Chat />
      </section>
    );
  } else {
    return (
      <section className="flex justify-center items-center">
        <h2 className="text-xl">Start chatting</h2>
      </section>
    );
  }
}

export default Message;
