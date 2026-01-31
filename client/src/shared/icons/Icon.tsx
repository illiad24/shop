import { Heart, ChevronRight } from 'lucide-react';



const iconMap = {
    favorite: Heart,
    arrow: ChevronRight
}
export const Icon = ({ name, className, size = 24, ...props }: any) => {
    const IconComponent = iconMap[name]

    if (!IconComponent) {

        return null
    }

    return <IconComponent className={className} size={size} {...props} />
}