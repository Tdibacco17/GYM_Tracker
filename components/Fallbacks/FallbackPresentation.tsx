import { Skeleton } from "../ui/skeleton";

export default function FallbackPresentation() {
    return (
        <>
            <Skeleton className="rounded-full min-w-24 max-w-24 w-24 min-h-24 h-24 max-h-24" />
            <Skeleton className=" max-w-3 min-w-36 w-3 min-h-6 h-6 max-h-6 rounded-lg" />
        </>
    )
}