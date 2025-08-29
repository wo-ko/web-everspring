import React from "react";
import Image from "next/image";
type ImageLeftTextBlockProps = {
    obj: {
        image: string;
        title?: string;
        text: string;
    }[];
};

export default function ContactPhone({ obj }: ImageLeftTextBlockProps) {
    if (!obj || obj.length === 0) return null;

    const { image, title, text } = obj[0];

    return (
        <div className="bg-gray-200 py-10 px-5 text-gray-700 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] border-t border-gray-300">
            <div className="max-w-screen-xl mx-auto flex justify-between gap-10 flex-wrap">
                <div className="flex flex-col items-center flex-1 min-w-[250px] mb-8 md:mb-0">
                    <div className="mb-5">
                        {!image ? null :<Image
                            src={image}
                            alt="Logo"
                            width={130}
                            height={100}
                        />}                        
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-base font-bold text-gray-800 mt-0">{text}</p>
                </div>
            </div>
        </div >
    );
}

