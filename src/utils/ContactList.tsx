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

function ContactList({
  contacts,
  messageBox,
}: {
  contacts: Array<contacts>;
  messageBox: Function;
}) {
  return (
    <ul className="flex flex-col gap-2 ">
      {contacts.map((c) => (
        <li
          key={c.contact ? c.contact.id : c.group.id}
          className="flex gap-5 items-center p-2 rounded-2xl border-2 border-(--light-gray) dark:border-(--dark-gray) cursor-pointer hover:bg-(--light-gray) dark:hover:bg-(--dark-gray)"
          onClick={() => {
            messageBox(c.contact ? c.contact.id : "grp " + c.group.id);
          }}
        >
          <div className="w-[50px] h-[50px] bg-(--light-gray) dark:bg-(--dark-gray) rounded-full flex justify-center items-center">
            <h2 className=" font-bold text-2xl">
              {c.contact
                ? c.contact.username[0].toUpperCase()
                : c.group.name[0].toUpperCase()}
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg">
              {c.contact ? c.contact.username : c.group.name}
            </h2>
            <p className="text-(--dark-gray) dark:text-(--light-gray) line-clamp-1">
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

export default ContactList;
