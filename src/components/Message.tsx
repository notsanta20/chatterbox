import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  message: z.string().min(1),
});

function Message({
  messages,
  receiver,
}: {
  messages: Array<object> | null;
  receiver: string;
}) {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  function EmptyPage() {
    return <h2>Start chatting</h2>;
  }

  function Chat() {
    if (messages) {
      if (messages.length > 0) {
        return (
          <ul className="w-full h-full flex flex-col p-3">
            {messages.map((m) => (
              <li key={m.id} className="flex flex-col">
                {m.senderId !== receiver && (
                  <p className="self-end p-4 rounded-4xl bg-(--light-gray) text-(--text-gray)">
                    {m.message}
                  </p>
                )}
                {m.senderId === receiver && (
                  <p className="self-start p-4 rounded-4xl bg-(--light-gray) text-(--text-gray)">
                    {m.message}
                  </p>
                )}
              </li>
            ))}
          </ul>
        );
      } else {
        return <h2>No messages, say Hi.</h2>;
      }
    }
  }

  function sendMessage(data: object) {
    console.log(data);
  }

  if (messages) {
    return (
      <section className="flex flex-col p-3">
        <div className="border-b-2 border-(--text-gray)">Profile Header</div>
        <div className="p-2 flex-1 flex justify-center items-center">
          {messages.length === 0 ? <EmptyPage /> : <Chat />}
        </div>
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
      </section>
    );
  }
}

export default Message;
