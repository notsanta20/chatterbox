import TextInput from "./TextInput";
import convertTime from "./convertTime";

interface data {
  data: Array<message>;
  userId: string;
}

interface message {
  id: string;
  senderId: string;
  message: string;
  time: string;
  sender: object | null;
}

function Message({
  messages,
  receiver,
  setRefresh,
  darkTheme,
}: {
  messages: data | null;
  receiver: string;
  setRefresh: Function;
  darkTheme: boolean;
}) {
  const filteredMessages: Array<message> | null = messages
    ? messages.data
    : null;

  function Chat() {
    if (filteredMessages && messages) {
      if (filteredMessages.length > 0) {
        return (
          <section className="flex flex-col p-3 h-full overflow-auto">
            <ul className="flex-1 flex flex-col gap-3 pb-3">
              {filteredMessages.map((m: message) => (
                <li key={m.id} className="flex flex-col">
                  {m.senderId === messages.userId && (
                    <div className="self-end flex flex-col items-end gap-2">
                      <span className="p-4 rounded-2xl text-lg bg-(--light-gray) dark:bg-(--dark-gray)">
                        {m.message}
                        <span className="text-xs font-medium pl-2">
                          {convertTime(m.time)}
                        </span>
                      </span>
                    </div>
                  )}
                  {m.senderId !== messages.userId && (
                    <div className="self-start flex flex-col items-start gap-2">
                      {m.sender && (
                        <div className="pl-2"> {m.sender.username}</div>
                      )}
                      <p className="p-4 rounded-2xl text-lg bg-(--light-yellow) dark:bg-(--dark-yellow)">
                        <span className="text-xs font-medium pr-2">
                          {convertTime(m.time)}
                        </span>
                        {m.message}
                      </p>
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

  if (filteredMessages) {
    return <Chat />;
  } else {
    return (
      <section className="flex justify-center items-center p-3">
        <h2 className="text-lg">Start chatting</h2>
      </section>
    );
  }
}

export default Message;
