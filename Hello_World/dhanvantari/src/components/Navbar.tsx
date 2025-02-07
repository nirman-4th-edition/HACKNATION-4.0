const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-[14vh] w-full bg-transparent flex items-center justify-center bg-gradient-to-b from-black/45 to-transparent">
        <ul className=" flex gap-10 text-white items-center text-xl font-medium">
            <li className=" text-green-400 underline decoration-wavy">Home</li>
            <li>Demo</li>
            <li>Demo</li>
            <li>Demo</li>
        </ul>
    </div>
  )
}

export default Navbar