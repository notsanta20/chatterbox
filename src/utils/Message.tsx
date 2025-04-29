import TextInput from "./TextInput";
import convertTime from "./convertTime";

interface message {
  id: string;
  senderId: string;
  message: string;
  time: string;
}

function Message({
  messages,
  receiver,
  setRefresh,
  darkTheme,
}: {
  messages: Array<message> | null;
  receiver: string;
  setRefresh: Function;
  darkTheme: boolean;
}) {
  function Chat() {
    if (messages) {
      if (messages.length > 0) {
        return (
          <section className="flex flex-col p-3 h-full">
            <ul className="flex-1 flex flex-col gap-3 pb-3 overflow-y-scroll min-h-0">
              {messages.map((m: message) => (
                <li key={m.id} className="flex flex-col">
                  {m.senderId !== receiver && (
                    <div className="self-end flex flex-col items-end gap-2">
                      <span className="p-4 rounded-2xl bg-(--light-gray) dark:bg-(--dark-gray)">
                        {m.message}
                      </span>
                      <span className="text-xs font-medium pr-2">
                        {convertTime(m.time)}
                      </span>
                    </div>
                  )}
                  {m.senderId === receiver && (
                    <div className="self-start flex flex-col items-start gap-2">
                      <p className="p-4 rounded-2xl bg-(--light-yellow) dark:bg-(--dark-yellow)">
                        {m.message}
                      </p>
                      <span className="text-xs font-medium pl-2">
                        {convertTime(m.time)}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <TextInput
              receiver={receiver}
              setRefresh={setRefresh}
              darkTheme={darkTheme}
            />
          </section>
        );
      } else {
        return (
          <section className="flex flex-col justify-center p-3 h-full">
            <div className="flex-1 flex justify-center items-center">
              <h2 className="">No messages, say Hi.</h2>
            </div>
            <TextInput
              receiver={receiver}
              setRefresh={setRefresh}
              darkTheme={darkTheme}
            />
          </section>
        );
      }
    }
  }

  if (messages) {
    return <Chat />;
  } else {
    return (
      <section className="flex justify-center items-center p-3">
        <h2 className="text-xl">Start chatting</h2>
      </section>
    );
  }
}

export default Message;
