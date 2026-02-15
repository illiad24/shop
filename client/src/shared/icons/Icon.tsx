import {
    Heart,
    ChevronRight,
    User,
    ShoppingBasket,
    Menu,
    X,
    LogOut,
    Trash2,
    SquarePen,
    Search,
} from "lucide-react";

const iconMap = {
    favorite: Heart,
    arrow: ChevronRight,
    user: User,
    bag: ShoppingBasket,
    menu: Menu,
    close: X,
    logout: LogOut,
    delete: Trash2,
    edit: SquarePen,
    search: Search,
} as const;

type IconName = keyof typeof iconMap;

type IconProps = {
    name: IconName;
    className?: string;
    size?: number;
    filled?: boolean;
};

export const Icon = ({
    name,
    className,
    size = 24,
    filled = false,
    ...props
}: IconProps) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) return null;

    return (
        <IconComponent
            className={className}
            size={size}
            fill={filled ? "currentColor" : "none"}
            {...props}
        />
    );
};
