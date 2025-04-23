import Contacts from "./Contacts";

function Room() {
  return (
    <main className="flex-1 bg-(--mid-gray) rounded-2xl grid grid-cols-[minmax(150px,350px)_1fr]">
      <Contacts />
    </main>
  );
}

export default Room;
