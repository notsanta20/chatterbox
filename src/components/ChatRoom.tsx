import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
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
  const [hide, setHide] = useState<boolean>(false);

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
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [receiverId, refresh]);

  function messageBox(id: string) {
    setReceiverId(id);
    setHide(true);
  }

  if (data === null) {
    return <h1>Loading</h1>;
  } else if (typeof data === "undefined") {
    navigate("/login", { replace: true });
  } else {
    return (
      <main className="flex flex-col h-screen w-screen overflow-auto">
        <Header
          setRender={setRefresh}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          hide={hide}
        />
        <section className="flex-1 flex">
          <Contacts
            contacts={data.data}
            messageBox={messageBox}
            setRefresh={setRefresh}
            hide={hide}
          />
          <Message
            messages={messages}
            receiver={receiverId}
            setRefresh={setRefresh}
            darkTheme={darkTheme}
            hide={hide}
            setHide={setHide}
          />
        </section>
        <Footer
          setRender={setRefresh}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          hide={hide}
        />
      </main>
    );
  }
}

export default ChatRoom;
