import { Link } from "react-router";

function Index() {
  return (
    <main className="flex flex-col justify-evenly items-center bg-black text-white h-screen">
      <div className="flex items-center justify-center w-[500px] h-[500px] gradient-bg">
        <div className="flex justify-center items-center w-[400px] h-[400px] rounded-full circle-one">
          <div className="flex justify-center items-center w-[300px] h-[300px] rounded-full circle-two">
            <div className="w-[200px] h-[200px] rounded-full circle-three"></div>
          </div>
        </div>
        <h1 className="absolute text-4xl font-[Gugi] text-center top-(50%) left-(50%)">
          CHARTER BOX
        </h1>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-15 w-[30vw] font-semibold">
        <h2 className="text-2xl text-center">
          Instant Chats, Endless connections. Start today with Charter Box.
        </h2>
        <button className="rounded-3xl bg-(--yellow) py-3 px-8 text-xl text-black">
          <Link to={"/signup"}>Get Started</Link>
        </button>
      </div>
    </main>
  );
}

export default Index;
