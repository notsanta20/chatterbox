import AddContact from "./AddContact";
import AddGroup from "./AddGroup";
import ContactList from "../utils/ContactList";

interface message {
  id: string;
  message: string;
  imageURL: string;
  time: Date;
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

interface contacts {
  id: string;
  userId: string;
  contactId: string;
  Messages: Array<message>;
  contact: contact | null;
  group: group;
}

function Contacts({
  contacts,
  messageBox,
  setRefresh,
}: {
  contacts: Array<contacts>;
  messageBox: Function;
  setRefresh: Function;
}) {
  return (
    <section className="flex flex-col gap-2 border-r-2 border-(--light-gray) dark:border-(--dark-gray) p-3">
      <div className="flex-1">
        <ContactList contacts={contacts} messageBox={messageBox} />
      </div>
      <div className="grid grid-cols-2 gap-2 cursor-pointer font-regular">
        <AddContact setRefresh={setRefresh} />
        <AddGroup setRefresh={setRefresh} />
      </div>
    </section>
  );
}

export default Contacts;
