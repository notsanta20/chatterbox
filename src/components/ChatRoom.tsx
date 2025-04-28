import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Contacts from "./Contacts";
import Message from "./Message";

function ChatRoom() {
  const navigate = useNavigate();
  const [data, setData] = useState<object | null>(null);
  const [refresh, setRefresh] = useState<number>(0);
  const [receiver, setReceiver] = useState<string>("Initial");
  const [messages, setMessages] = useState<Array<object> | null>(null);

  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    axios
      .get(`${url}/contacts`, header)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData(error.data);
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${url}/message/${receiver}`, header)
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [receiver, refresh]);

  function messageBox(id: string) {
    setReceiver(id);
  }

  if (data === null) {
    return <h1>Loading</h1>;
  } else if (typeof data === "undefined") {
    navigate("/login", { replace: true });
  } else {
    return (
      <main className="flex flex-col bg-(--gray) text-white h-screen">
        <Header setRender={setRefresh} />
        <section className="flex-1 grid grid-cols-[minmax(100px,300px)_1fr]">
          <Contacts contacts={data.data} messageBox={messageBox} />
          <Message
            messages={messages}
            receiver={receiver}
            setRefresh={setRefresh}
          />
        </section>
      </main>
    );
  }
}

export default ChatRoom;
