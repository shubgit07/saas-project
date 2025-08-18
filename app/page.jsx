
import { features } from "@/constants/features";
import { COLORS } from "@/constants/colors";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center rounded-3xl shadow-md shadow-gray-300`}
      style={{ background: COLORS.backgroundGradientStyle }}
    >
      <div className="hero-heading-wrapper mb-8 mt-16 w-full">
        <div className="clouds" aria-hidden="true"></div>
        <div className="clouds layer-2" aria-hidden="true"></div>
        <h1 className={`${COLORS.heading} gradient-text text-center z-10 relative`}>Welcome to SphereAi</h1>
      </div>
      <p className={`${COLORS.paragraph} mb-12 text-center max-w-2xl`}>
        Real-time AI teaching platform. Build your own AI tutors, learn with voice, and track your journey!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {features.slice(0, 6).map((feature, idx) => (
          <div
            key={idx}
            className={`${COLORS.cardBg} rounded-xl ${COLORS.cardShadow} p-6 flex flex-col items-center`}
          >
            {feature.icon && (
              <feature.icon className="w-12 h-12 mb-4" style={{ color: COLORS.primary }} />
            )}
            <h2 className={`${COLORS.subheading} mb-2`}>{feature.title}</h2>
            <p className={`${COLORS.cardText} text-center`}>{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
