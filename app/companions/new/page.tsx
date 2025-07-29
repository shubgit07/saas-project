// NewCompanion.tsx
import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server"; // Assuming you're using Clerk
import { redirect } from "next/navigation";

const NewCompanion = async () => { // Add 'async' here

  const { userId } = await auth(); // Corrected the variable name to 'userId' (or use 'userID' consistently)
  if(!userId) {
    return redirect('/sign-in');
  }

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <article className="w-full gap-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  );
};

export default NewCompanion;