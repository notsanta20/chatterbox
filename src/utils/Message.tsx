import TextInput from "./TextInput";
import convertTime from "./convertTime";

interface data {
  data: Array<message>;
  userId: string;
  profileName: string;
}

interface message {
  id: string;
  senderId: string;
  message: string;
  time: string;
  sender: sender | null;
}

interface sender {
  username: string;
}

function Message({
  messages,
  receiver,
  setRefresh,
  darkTheme,
  hide,
  setHide,
}: {
  messages: data | null;
  receiver: string;
  setRefresh: Function;
  darkTheme: boolean;
  hide: boolean;
  setHide: Function;
}) {
  const filteredMessages: Array<message> | null = messages
    ? messages.data
    : null;

  function handleHide() {
    setHide(false);
  }

  function Chat() {
    if (filteredMessages && messages) {
      if (filteredMessages.length > 0) {
        return (
          <section
            className={
              (hide ? "flex" : "hidden") +
              " flex-1 md:flex flex-col gap-3 h-full"
            }
          >
            <div className="flex items-center gap-4 border-b-2 border-(--light-gray) dark:border-(--dark-gray) py-2 px-3">
              <div onClick={handleHide}>
                <img
                  src={"/assets/" + (darkTheme ? "back.svg" : "back-dark.svg")}
                  alt="back"
                  className="w-[30px] h-auto "
                />
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-[50px] h-[50px] bg-(--light-gray) dark:bg-(--dark-gray) rounded-full flex justify-center items-center">
                  <h2 className=" font-semibold text-lg">
                    {messages.profileName[0].toUpperCase()}
                  </h2>
                </div>
                <div className="text-xl">{messages.profileName}</div>
              </div>
            </div>
            <ul className="flex-1 flex flex-col overflow-auto p-3">
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
          <section
            className={
              (hide ? "flex" : "hidden") +
              " flex-1 md:flex flex-col justify-center h-full"
            }
          >
            <div className="flex items-center gap-4 border-b-2 border-(--light-gray) dark:border-(--dark-gray) py-2 px-3">
              <div onClick={handleHide}>
                <img
                  src={"/assets/" + (darkTheme ? "back.svg" : "back-dark.svg")}
                  alt="back"
                  className="w-[30px] h-auto "
                />
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-[50px] h-[50px] bg-(--light-gray) dark:bg-(--dark-gray) rounded-full flex justify-center items-center">
                  <h2 className=" font-semibold text-lg">
                    {messages.profileName[0].toUpperCase()}
                  </h2>
                </div>
                <div className="text-xl">{messages.profileName}</div>
              </div>
            </div>
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
      <section
        className={
          (hide ? "flex" : "hidden") +
          " md:flex flex-1 justify-center items-center p-3"
        }
      >
        <h2 className="text-lg">Start chatting</h2>
      </section>
    );
  }
}

export default Message;
