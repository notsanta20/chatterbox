function Message({
  messages,
  receiver,
}: {
  messages: Array<object> | null;
  receiver: string;
}) {
  function EmptyPage() {
    return <h2>Start chatting</h2>;
  }

  function Chat() {
    if (messages) {
      if (messages.length > 0) {
        return (
          <ul className="w-full">
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

  if (messages) {
    return (
      <section className="flex flex-col p-3">
        <div className="border-b-2 border-(--text-gray)">Profile Header</div>
        <div className="p-2 flex-1 flex justify-center items-center">
          {messages.length === 0 ? <EmptyPage /> : <Chat />}
        </div>
        <div className="message">
          <input
            type="text"
            name="message"
            id="message"
            className="rounded-4xl border-1 border-(--text-gray) w-full px-3 py-2 outline-none"
          />
        </div>
      </section>
    );
  }
}

export default Message;
