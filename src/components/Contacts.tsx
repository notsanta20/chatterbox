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

interface contacts {
  id: string;
  userId: string;
  contactId: string;
  Messages: Array<message>;
  contact: contact;
}

function Contacts({
  contacts,
  messageBox,
}: {
  contacts: Array<contacts>;
  messageBox: Function;
}) {
  return (
    <section className="flex flex-col bg-(--light-gray) rounded-2xl p-3">
      <div className="flex-1">
        <h1 className="font-semibold text-center">Contacts</h1>
        <ul>
          {contacts.map((c) => (
            <li
              key={c.contact.id}
              className="flex gap-5 items-center py-2 border-b-1 border-(--text-gray) cursor-pointer"
              onClick={() => {
                messageBox(c.contact.id);
              }}
            >
              <div className="w-[50px] h-[50px] bg-white rounded-full">
                <img src="/assets/chat-dark.svg" alt="" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg">{c.contact.username}</h2>
                <p className="text-(--text-gray) line-clamp-1">
                  {c.Messages.length > 0
                    ? c.Messages[c.Messages.length - 1].message
                    : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 text-center cursor-pointer font-semibold">
        <AddContact />
        <AddGroup />
      </div>
    </section>
  );
}

export default Contacts;
