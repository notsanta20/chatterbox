import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Contacts from "./Contacts";
import Message from "../utils/Message";
import Error from "./Error";

interface data {
  data: Array<message>;
  userId: string;
  profileName: string;
}

interface sender {
  username: string;
}

interface message {
  id: string;
  senderId: string;
  message: string;
  time: string;
  sender: sender | null;
}

interface contactsData {
  data: Array<contacts>;
}

interface contacts {
  id: string;
  userId: string;
  contactId: string;
  Messages: Array<message>;
  contact: contact | null;
  group: group;
}

interface contact {
  id: string;
  username: string;
  bio: string | null;
  profile: string | null;
}

interface group {
  id: string;
  name: string;
  profile: string | null;
}

function ChatRoom({
  darkTheme,
  setDarkTheme,
}: {
  darkTheme: boolean;
  setDarkTheme: Function;
}) {
  const [contacts, setContacts] = useState<contactsData | null>(null);
  const [refresh, setRefresh] = useState<number>(0);
  const [receiverId, setReceiverId] = useState<string>("Initial");
  const [messages, setMessages] = useState<data | null>(null);
  const [hide, setHide] = useState<boolean>(false);

  const url = "https://chatterbox-api-dbb8.onrender.com";
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
        setContacts(res.data);
      })
      .catch((error) => {
        setContacts(error.data);
        console.error("Unable to fetch contacts");
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${newURL}/${newId}`, header)
      .then((res) => {
        setMessages(res.data);
      })
      .catch(() => {
        console.error("Unable to fetch messages");
      });
  }, [receiverId, refresh]);

  function messageBox(id: string) {
    setReceiverId(id);
    setHide(true);
  }

  if (contacts === null) {
    return (
      <h1 className="h-screen flex justify-center items-center text-2xl">
        Loading. . .
      </h1>
    );
  } else if (typeof contacts === "undefined") {
    return <Error />;
  } else {
    return (
      <main className="flex flex-col h-screen w-screen overflow-auto">
        <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} hide={hide} />
        <section className="flex-1 flex">
          <Contacts
            contacts={contacts.data}
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
