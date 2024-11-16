import { Skeleton } from "../ui/skeleton";

export default function FallbackRoutines() {
    const fakeArray = [1, 2, 3, 4];

    return (
        <div className="flex flex-row items-center justify-start w-full overflow-x-scroll no-scrollbar overflow-y-hidden px-6 py-6 gap-4 pl-4">
            {fakeArray.map((_, index: number) => {
                return <Skeleton key={index} className="h-6 min-w-44 max-w-44 w-44" />
            })}
        </div>
    )
}