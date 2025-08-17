import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const CompanionCard = ({ id, name, topic, subject, duration, color }) => {
  return (
    <article 
      className="companion-card rounded-2xl p-5 cursor-pointer shadow-md border-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-250 ease-out" 
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark hover:scale-105 transition-transform duration-200">
          <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-sm mb-4">{topic}</p>
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <Button className="btn-primary w-full justify-center hover:scale-[1.01] transition-transform duration-200">
          Launch Lesson
        </Button>
      </Link>
    </article>
  )
}

export default CompanionCard;
