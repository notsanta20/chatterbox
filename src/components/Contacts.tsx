import AddContact from "./AddContact";
import AddGroup from "./AddGroup";

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
}: {
  contacts: Array<contacts>;
  messageBox: Function;
}) {
  function ContactsList() {
    return (
      <ul className="flex flex-col gap-2">
        {contacts.map((c) => (
          <li
            key={c.contact ? c.contact.id : c.group.id}
            className="flex gap-5 items-center p-2 rounded-2xl border-1 border-(--white-gray) cursor-pointer hover:bg-(--white-gray)"
            onClick={() => {
              messageBox(c.contact ? c.contact.id : "grp " + c.group.id);
            }}
          >
            <div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center">
              <h2 className="text-black font-bold text-2xl">
                {c.contact
                  ? c.contact.username[0].toUpperCase()
                  : c.group.name[0].toUpperCase()}
              </h2>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg">
                {c.contact ? c.contact.username : c.group.name}
              </h2>
              <p className="text-(--text-gray) line-clamp-1">
                {c.Messages.length > 0
                  ? c.Messages[c.Messages.length - 1].message
                  : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="flex flex-col bg-(--light-gray) rounded-2xl p-3">
      <div className="flex-1">
        <h1 className="font-semibold text-center">Contacts</h1>
        <ContactsList />
      </div>
      <div className="grid grid-cols-2 text-center cursor-pointer font-semibold">
        <AddContact />
        <AddGroup />
      </div>
    </section>
  );
}

export default Contacts;
