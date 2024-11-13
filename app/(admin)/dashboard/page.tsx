import Presentation from "@/components/ProfilePage/Presentation";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { getServerSession } from "next-auth";
import { ApiDataResponseInterface } from "@/types/ApiTypes";
import { getProfileData } from "@/app/actions/profileActions";

export default function Page() {
  return <ProfilePage />
}

async function ProfilePage() {
  const session = await getServerSession();
  if (!session) return null

  const profileData: ApiDataResponseInterface = await getProfileData()

  return (
    <section className="flex flex-col items-center gap-6 relative p-4 w-full">

      <div className="absolute top-0 right-0 pt-4 pr-4">
        <SignOutButton />
      </div>

      <Presentation session={session}/>

      <ProfileTabs profileData={profileData.data} />

    </section>
  );
}


