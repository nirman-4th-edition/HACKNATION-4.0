import { getSlideDownVariants } from "@/lib/framerVariants"
import { motion } from "framer-motion"

const Navbar = () => {
    return (
        <motion.div 
        className="fixed top-0 left-0 h-[14vh] w-full bg-transparent flex items-center justify-center bg-gradient-to-b from-black/45 to-transparent"
        initial="initial"
        animate="animate"
        variants={getSlideDownVariants(0)}
        >
            <ul className=" flex gap-10 text-white items-center text-xl font-medium">
                <li className=" text-green-400 underline decoration-wavy">Home</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
            </ul>
        </motion.div>
    )
}

export default Navbar