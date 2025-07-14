import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import Cta from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'


const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy explainer"
          topic="the neural Network of Brain"
          subject="Science"
          duration={90}
          color="#ffda6e"
        />
        <CompanionCard
          id="456"
          name="MathX the number wizard"
          topic="Integrals & Derivatives"
          subject="Math"
          duration={60} 
          color="#e5d0ff"
        />
        <CompanionCard
          id="789"
          name="Verba the Vocabulary Builder"
          topic="Language"
          subject="English Literature"
          duration={30}
          color="#bde7ff"
        />
      </section>

      <section className="home-section">
        <CompanionsList 
        title="Recently completed sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
        />
        <Cta
        
        
        />
      </section>
    </main>
  )
}

export default Page