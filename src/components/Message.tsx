import TextInput from "../utils/TextInput";

interface message {
  id: string;
  senderId: string;
  message: string;
}

function Message({
  messages,
  receiver,
  setRefresh,
}: {
  messages: Array<message> | null;
  receiver: string;
  setRefresh: Function;
}) {
  function Chat() {
    if (messages) {
      if (messages.length > 0) {
        return (
          <ul className="flex-1 flex flex-col p-2">
            <div className="flex-1 flex flex-col gap-3">
              {messages.map((m: message) => (
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
            <TextInput receiver={receiver} setRefresh={setRefresh} />
          </ul>
        );
      } else {
        return (
          <section className="flex-1 flex flex-col justify-center p-2">
            <div className="flex-1 flex justify-center items-center">
              <h2 className="text-xl">No messages, say Hi.</h2>
            </div>
            <TextInput receiver={receiver} setRefresh={setRefresh} />
          </section>
        );
      }
    }
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
