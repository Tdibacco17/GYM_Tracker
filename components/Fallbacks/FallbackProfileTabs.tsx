import { Skeleton } from "../ui/skeleton";

export default function FallbackProfileTabs() {
    return (
        <>
            <Skeleton className="w-full min-h-9 max-h-9 h-9 rounded-lg p-1" />
            <Skeleton className="w-full min-h-[112px] max-h-[112px] h-[112px] rounded-lg p-1" />
        </>
    )
}