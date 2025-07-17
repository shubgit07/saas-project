import Image from "next/image"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Navitems from "@/components/Navitems";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={46}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <Navitems />
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin bg-white text-blue-600 px-4 py-2 font-medium text-sm shadow-sm hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 active:bg-blue-100 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
                
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar
