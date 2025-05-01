import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface inputData {
  message: string;
}

const schema = z.object({
  message: z.string().min(1),
});

function TextInput({
  receiver,
  setRefresh,
  darkTheme,
}: {
  receiver: string;
  setRefresh: Function;
  darkTheme: boolean;
}) {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
  const url = "https://chatterbox-api-dbb8.onrender.com";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  function sendMessage(data: inputData) {
    const split = receiver.split(" ");
    let newData = {};
    let newURL = url;

    if (split.length === 1) {
      newData = {
        message: data.message,
        receiverId: receiver,
      };
      newURL = url + "/message";
    } else {
      newData = {
        message: data.message,
        receiverId: split[1],
      };
      newURL = url + "/grp-msg";
    }

    axios
      .post(newURL, newData, header)
      .then((res) => {
        const num = Math.floor(Math.random() * 100);
        setRefresh(num);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <form className="message relative p-3" onSubmit={handleSubmit(sendMessage)}>
      <input
        {...register("message")}
        type="text"
        name="message"
        id="message"
        className="rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) w-full px-3 py-2 outline-none"
      />
      <button className="w-[30px] h-[30px] absolute top-[18px] right-[20px] cursor-pointer">
        <img
          src={"/assets/" + (darkTheme ? "send.svg" : "send-dark.svg")}
          alt="send"
        />
      </button>
    </form>
  );
}

export default TextInput;
