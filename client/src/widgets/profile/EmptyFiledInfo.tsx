
import { Link } from "react-router";
import { type ReactNode } from "react";
interface EmptyFieldProps {
    imgSrc?: string;
    title?: string;
    description?: string;
    linkText?: string;
    linkUrl?: string;
    children?: ReactNode;
}

export function EmptyFiledInfo({
    imgSrc,
    title,
    description,
    linkText,
    linkUrl,
    children,
}: EmptyFieldProps) {
    return (
        <div className="bg-white p-5 rounded-[12px] flex items-center gap-12 min-h-[300px] max-md:flex-col">
            {imgSrc && (
                <div>
                    <img src={imgSrc} alt="Image" />
                </div>
            )}
            <div>
                {title && <div className="section-title-24 mb-4">{title}</div>}
                {description && (
                    <div className="text-14-gray text-[16px] mb-4">{description}</div>
                )}
                {linkText && linkUrl && (
                    <Link to={linkUrl} className="button-element">
                        {linkText}
                    </Link>
                )}
                {children}
            </div>
        </div>
    );
}
