import TextInput from "./TextInput";

interface message {
  id: string;
  senderId: string;
  message: string;
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
            <ul className="flex-1 flex flex-col gap-3 pb-3 h-[500px] overflow-scroll">
              {messages.map((m: message) => (
                <li key={m.id} className="flex flex-col">
                  {m.senderId !== receiver && (
                    <p className="self-end p-4 rounded-3xl bg-(--light-gray) dark:bg-(--dark-gray) ">
                      {m.message}
                    </p>
                  )}
                  {m.senderId === receiver && (
                    <p className="self-start p-4 rounded-3xl bg-(--light-yellow) dark:bg-(--dark-yellow)">
                      {m.message}
                    </p>
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
