import React from "react";
export default function ContactMaps(props: { text?: string }) {

    return (
        <div className="flex justify-center items-center w-full h-72 rounded-lg overflow-hidden mt-5 bg-blue-300">
            <iframe
                src={props?.text}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </div>
    );
}

