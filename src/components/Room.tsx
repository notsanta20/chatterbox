import Contacts from "./Contacts";
import Message from "./Message";
import { useState } from "react";

function Room() {
  const [data, setData] = useState<Array<object> | null>(null);

  return (
    <main className="flex-1 bg-(--mid-gray) rounded-2xl grid grid-cols-[minmax(150px,350px)_1fr]">
      <Contacts Setdata={setData} />
      <Message />
    </main>
  );
}

export default Room;
