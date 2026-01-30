interface ContentItemProps {
    imgSrc: string;
    title: string;
    description: string;
    imgAlt?: string;
}

export function ContentItem({ imgSrc, title, description, imgAlt = 'Image' }: ContentItemProps) {
    return (
        <div className="p-5 rounded-[20px] bg-[#fff]">
            <div className="mb-5 last:m-0">
                <img className="max-h-[116px]" src={imgSrc} alt={imgAlt} />
            </div>
            <h3 className="section-title-24 mb-5 last:m-0">{title}</h3>
            <div className="text-14-gray">
                <p>{description}</p>
            </div>
        </div>
    )
}