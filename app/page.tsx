import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"; // Updated import path

const HomePage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/companions");
  }
  redirect("/landing");
};

export default HomePage;
