import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject) => {
  return subjectsColors[subject];
};

export const configureAssistant = (voice, style) => {
  const voiceId = voices[voice]?.[style] || "sarah";

  const vapiAssistant = {
    name: "Companion",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.\n\nTutor Guidelines:\nStick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.\nKeep the conversation flowing smoothly while maintaining control.\nFrom time to time make sure that the student is following you and understands you.\nBreak down the topic into smaller parts and teach the student one part at a time.\nKeep your style of conversation {{ style }}.\nKeep your responses short, like in a real voice conversation.\nDo not include any special characters in your responses - this is a voice conversation.\n`,
        },
      ],
    },
  };
  return vapiAssistant;
};
