import Presentation from "@/components/ProfilePage/Presentation";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { getServerSession } from "next-auth";
import { ApiDataResponseInterface } from "@/types/ApiTypes";
import { getProfileData } from "@/app/actions/profileActions";
import { getRoutines } from "@/app/actions/routineActions";
import { Suspense } from "react";
import { SpinIcon } from "@/components/ui/icons";

export default function Page() {
  return <Suspense fallback={<SpinIcon />}>
    <ProfilePage />
    {/* 
      <section className="flex flex-col items-center gap-6 relative p-4 w-full">

      <div className="absolute top-0 right-0 pt-4 pr-4">
        <SignOutButton />
      </div>

      <Presentation session={session} />

      <ProfileTabs profileData={profileData.data} routinesData={routinesData.data} />

    </section>
    
    */}
  </Suspense>
}

async function ProfilePage() {
  const session = await getServerSession();
  if (!session) return null

  const profileData: ApiDataResponseInterface = await getProfileData()
  const routinesData: ApiDataResponseInterface = await getRoutines();

  return (
    <section className="flex flex-col items-center gap-6 relative p-4 w-full">

      <div className="absolute top-0 right-0 pt-4 pr-4">
        <SignOutButton />
      </div>

      <Presentation session={session} />

      <ProfileTabs profileData={profileData.data} routinesData={routinesData.data} />

    </section>
  );
}

