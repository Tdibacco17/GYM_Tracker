import { Skeleton } from "../ui/skeleton";

export default function FallbackRoutineCards() {
    return (
        <div className="flex flex-col gap-6 px-6">
            <div className="w-full h-full flex justify-between items-center">
                <Skeleton className="h-9 w-[100px] min-w-[100px] max-w-[100px]" />
                <Skeleton className="h-9 w-[100px] min-w-[100px] max-w-[100px]" />
            </div>
            <div className="flex flex-col gap-8">
                <Skeleton className="h-[168px] w-full" />
                <Skeleton className="h-[168px] w-full" />
            </div>
        </div>
    )
}