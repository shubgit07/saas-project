import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/CTA";
import GetStartedModal from "@/components/landing/GetStartedModal";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center">
      <GetStartedModal />
      {/* Animated Gradient Title with Glowing Gradient Aura */}
      <div className="relative flex items-center justify-center w-full">
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[120px] md:w-[500px] md:h-[180px] rounded-full blur-3xl opacity-40 z-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 60%, #a21caf 100%)',
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 50%',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(60px)',
            animation: 'gradientGlow 3s ease-in-out infinite',
          }}
        />
        <h1
          className="relative z-10 mt-28 mb-8 text-4xl md:text-6xl font-bold text-transparent bg-clip-text animate-gradient"
          style={{
            backgroundImage: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 60%, #a21caf 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientMotion 3s ease-in-out infinite',
            WebkitTextStroke: '1px rgba(0,0,0,0.04)',
          }}
        >
          SphereAi
        </h1>
        <style>{`
          @keyframes gradientMotion {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes gradientGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
      <Hero />
      <Features />
      <CTA />
    </main>
  );
};

export default LandingPage;
