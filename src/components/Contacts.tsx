function Contacts({ setData }: { data: Array<object> | null }) {
  return (
    <section className="flex flex-col bg-(--light-gray) rounded-2xl p-2">
      <div className="flex-1">
        <h1 className="font-semibold text-center">Contacts</h1>
      </div>
      <div className="grid grid-cols-2 text-center cursor-pointer font-semibold">
        <div>Add Contact</div>
        <div>Add Group</div>
      </div>
    </section>
  );
}

export default Contacts;
