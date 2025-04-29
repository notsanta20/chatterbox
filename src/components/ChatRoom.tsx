import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Contacts from "./Contacts";
import Message from "../utils/Message";

function ChatRoom({
  darkTheme,
  setDarkTheme,
}: {
  darkTheme: boolean;
  setDarkTheme: Function;
}) {
  const navigate = useNavigate();
  const [data, setData] = useState<object | null>(null);
  const [refresh, setRefresh] = useState<number>(0);
  const [receiverId, setReceiverId] = useState<string>("Initial");
  const [messages, setMessages] = useState<Array<object> | null>(null);

  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  const split = receiverId.split(" ");
  let newURL = url + "/message";
  let newId = receiverId;
  if (split.length > 1) {
    newURL = url + "/grp-msg";
    newId = split[1];
  }

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
      .get(`${newURL}/${newId}`, header)
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [receiverId, refresh]);

  function messageBox(id: string) {
    setReceiverId(id);
  }

  if (data === null) {
    return <h1>Loading</h1>;
  } else if (typeof data === "undefined") {
    navigate("/login", { replace: true });
  } else {
    return (
      <main className="flex flex-col h-screen">
        <Header
          setRender={setRefresh}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
        />
        <section className="flex-1 grid grid-cols-[minmax(100px,300px)_1fr]">
          <Contacts contacts={data.data} messageBox={messageBox} />
          <Message
            messages={messages}
            receiver={receiverId}
            setRefresh={setRefresh}
            darkTheme={darkTheme}
          />
        </section>
      </main>
    );
  }
}

export default ChatRoom;
