import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function OfflineBanner() {
    const isOnline = useOnlineStatus();

    if (isOnline) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-2 z-50 text-[14px] font-medium">
            Немає підключення до інтернету
        </div>
    );
}
