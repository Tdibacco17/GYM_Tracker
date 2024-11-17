import Presentation from "@/components/ProfilePage/Presentation";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { getServerSession } from "next-auth";
import { getProfileData } from "@/app/actions/profileActions";
import { Suspense } from "react";
import FallbackPresentation from "@/components/Fallbacks/FallbackPresentation";
import FallbackProfileTabs from "@/components/Fallbacks/FallbackProfileTabs";
import { ApiDataResponseInterface } from "@/types/ActionsTypes";

export default function DashboardPage() {

  return (
    <section className="flex flex-col items-center gap-6 relative p-4 w-full">

      <div className="absolute top-0 right-0 pt-4 pr-4">
        <SignOutButton />
      </div>

      <Suspense fallback={<FallbackPresentation />}>
        <AsyncPresentation />
      </Suspense>

      <Suspense fallback={<FallbackProfileTabs />}>
        <AsyncProfileTabs />
      </Suspense>

    </section>
  )
}

async function AsyncPresentation() {
  const session = await getServerSession();
  if (!session) return null

  return <Presentation session={session} />
}

async function AsyncProfileTabs() {
  const session = await getServerSession();
  if (!session) return null

  const profileData: ApiDataResponseInterface = await getProfileData()

  return <ProfileTabs profileData={profileData.data} />
}