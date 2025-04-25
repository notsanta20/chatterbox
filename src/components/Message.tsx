function Message({ messages }: { messages: Array<object> | null }) {
  function NoMessage() {
    return <h2>No messages, say Hi.</h2>;
  }

  function Chat() {
    if (messages) {
      if (messages.length > 0) {
        return <div></div>;
      }
    }
  }

  if (messages) {
    return (
      <section className="flex flex-col p-3">
        <div className="border-b-2 border-(--text-gray)">Profile Header</div>
        <div className="p-2 flex-1">
          {messages.length === 0 ? <NoMessage /> : <Chat />}
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
