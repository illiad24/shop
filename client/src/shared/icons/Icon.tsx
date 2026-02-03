import { Heart, ChevronRight, User, ShoppingBasket, Menu, X } from 'lucide-react';


const iconMap = {
    favorite: Heart,
    arrow: ChevronRight,
    user: User,
    bag: ShoppingBasket,
    menu: Menu,
    close: X,
}
export const Icon = ({ name, className, size = 24, filled = false, ...props }: any) => {
    const IconComponent = iconMap[name]

    if (!IconComponent) {

        return null
    }

    return <IconComponent className={className} fill={filled ? 'currentColor' : 'none'} size={size} {...props} />
}