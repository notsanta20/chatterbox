import { Link } from "react-router";

function Index() {
  return (
    <main className="flex flex-col justify-evenly items-center bg-black text-white h-screen">
      <div className="flex items-center justify-center w-[400px] h-[400px] md:w-[500px] md:h-[500px] gradient-bg">
        <div className="flex justify-center items-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full circle-one">
          <div className="flex justify-center items-center w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full circle-two">
            <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full circle-three"></div>
          </div>
        </div>
        <h1 className="absolute text-2xl md:text-4xl font-[Gugi] text-center top-(50%) left-(50%)">
          CHATTERBOX
        </h1>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-15 w-[80vw] md:w-[30vw] font-semibold">
        <h2 className="text-2xl text-center">
          Instant Chats, Endless connections. Start today with ChatterBox.
        </h2>
        <button className="rounded-2xl bg-(--light-yellow) dark:bg-(--dark-yellow) py-3 px-8 text-2xl">
          <Link to={"/signup"}>Get Started</Link>
        </button>
      </div>
    </main>
  );
}

export default Index;
