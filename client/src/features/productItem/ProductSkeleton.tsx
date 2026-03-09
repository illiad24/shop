export function ProductSkeleton() {
    return (
        <div className="bg-white rounded-[16px] overflow-hidden animate-pulse">
            <div className="bg-gray-200 h-52 w-full" />
            <div className="p-4 flex flex-col gap-3">
                <div className="bg-gray-200 rounded h-4 w-3/4" />
                <div className="bg-gray-200 rounded h-3 w-1/2" />
                <div className="flex justify-between items-center mt-2">
                    <div className="bg-gray-200 rounded h-6 w-20" />
                    <div className="bg-gray-200 rounded-full h-9 w-9" />
                </div>
            </div>
        </div>
    );
}
