import { getSlideDownVariants } from "@/lib/framerVariants"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()

    const getLinkClassName = (path: string) => {
        const isActive = pathname === path
        return isActive 
            ? "text-green-400 underline decoration-wavy" 
            : "hover:text-green-400 transition-colors duration-300"
    }

    return (
        <motion.div 
            className="fixed top-0 left-0 h-[14vh] w-full bg-transparent flex items-center justify-center bg-gradient-to-b from-black/45 to-transparent"
            initial="initial"
            animate="animate"
            variants={getSlideDownVariants(0)}
        >
            <ul className="flex gap-10 text-white items-center text-xl font-medium">
                <Link href="/" className={getLinkClassName('/')}>Home</Link>
                <Link href="/chat" className={getLinkClassName('/chat')}>Chat</Link>
                <Link href="/login" className={getLinkClassName('/login')}>Login</Link>
            </ul>
        </motion.div>
    )
}

export default Navbar