import React from "react";
export default function ContactMaps(props: { text?: string }) {

    return (
        <div className="flex justify-center items-center w-[100%] h-72 rounded-lg overflow-hidden">
            <iframe
                src={props?.text}
                className="w-full md:w-[70%] h-[100%] border border-slate-600 rounded-xl shadow-lg"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </div>
        
    );
}

