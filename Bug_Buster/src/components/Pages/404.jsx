export default function ErrorPage() {
  return (
    <main className="relative flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        {/* <Scene /> */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="mt-2 text-lg">The link is not valid</p>
        </div>
      </div>
    </main>
  );
}
