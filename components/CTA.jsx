import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Cta = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way.</div>
            <h2 className="text-3xl font-bold">
                Build and Personalize Learning Companion
            </h2>
            <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
            <Image src="images/cta.svg" alt="cta" width={362} height={232} />
            <Button variant={"secondary"}>
                <Image src="/icons/blackplus.svg" alt="plus" width={40} height={40}/>
                <Link href="/companions/new">
                    <p>Build a New Companion</p>
                </Link>
            </Button>
        </section>
    );
};
export default Cta;
