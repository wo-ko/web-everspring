// import { useThemeContext } from "@app/context/theme-context";
// import Link from "next/link";
// import React from "react";
// import Image from "next/image";
// import { Mail } from "lucide-react";
// import { renderImageUrl } from "@app/admin/hook/useMediaImages";

// type CompanyData = {
//   type: "email" | "line" | "facebook";
//   text: string;
//   link: string;
// };

// type ColumnData = {
//   logo?: string;
//   titlephone?: string;
//   textphone?: string;
//   title?: string;
//   text: string;
//   links?: CompanyData[];
//   titlecompany?: string;
//   linkscompany?: CompanyData[];
// };

// type ContactCompanyProps = {
//   obj: ColumnData[];
// };

// const ContactLink = ({ linksData }: { linksData: CompanyData }) => {
//   const { themeColor1 } = useThemeContext();
//   const displayColor =
//     themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";
//   const getIcon = () => {
//     switch (linksData.type) {
//       case "email":
//         return (
//           <Mail />
//         );
//       case "line":
//         return (
//           <Image
//             src="https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png"
//             alt="line icon"
//             width={20}
//             height={20}
//             className="mr-3"
//             unoptimized
//           />
//         );
//       case "facebook":
//         return (
//           <Image
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1280px-Facebook_Logo_%282019%29.png"
//             alt="facebook icon"
//             width={20}
//             height={20}
//             className="mr-3"
//             unoptimized
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="bg-white border border-gray-300 rounded-md px-4 py-2 "
//       style={{ minWidth: "calc(100% + 20px)" }}
//     >
//       <Link href={linksData?.link} target="_blank">
//         <div className="flex items-center shadow-sm">
//           {getIcon()}
//           <span
//             className="text-sm font-medium ml-2 md:text-xs lg:text-xl"
//             style={{ color: displayColor }}
//           >
//             {linksData.text}
//           </span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default function ContactCompany({ obj }: ContactCompanyProps) {
//   const { themeColor1 } = useThemeContext();
//   const displayColor =
//     themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

//   if (!obj || obj.length === 0) {
//     return null;
//   }
//   return (
//     <div className="bg-gray-100 py-12 px-6 text-gray-800">
//       <div className="max-w-screen-xl mx-auto grid md:grid-cols-[1fr_2fr_2fr] lg:grid-cols-3 gap-12 text-left">
//         {obj.map((column, index) => (
//           <React.Fragment key={index}>
//             <div className="flex flex-col items-center md:items-center">
//               <div className="mb-5">
//                 <img
//                   src={renderImageUrl(column.logo)}
//                   alt="Logo"
//                   width={130}
//                   height={100}
//                 />
//               </div>
//               <h3
//                 className="text-lg font-semibold text-gray-800 mb-2 md:text-xs lg:text-xl"
//                 style={{ color: displayColor }}
//               >
//                 {column.titlephone}
//               </h3>
//               <p
//                 className="text-base  text-gray-800 mt-0 md:text-xs lg:text-xl"
//                 style={{ color: displayColor }}
//               >
//                 {column.textphone}
//               </p>
//             </div>
//             <div className="flex flex-col items-center md:items-start">
//               {column.title && (
//                 <h3
//                   className="text-lg font-semibold text-gray-900 mb-4 md:text-xs lg:text-xl"
//                   style={{ color: displayColor }}
//                 >
//                   {column.title}
//                 </h3>
//               )}
//               <div
//                 className="whitespace-pre-line text-base leading-relaxed md:text-xs lg:text-xl"
//                 style={{ color: displayColor }}
//               >
//                 {column.text}
//               </div>
//               {column.links && (
//                 <div
//                   className="mt-5 space-y-3 md:pt-6"
//                   style={{ color: displayColor }}
//                 >
//                   {column.links.map((linksData, linkIndex) => (
//                     <ContactLink key={linkIndex} linksData={linksData} />
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="flex flex-col items-center md:items-start">
//               <h3
//                 className="text-lg font-semibold text-gray-800 mb-2"
//                 style={{ color: displayColor }}
//               >
//                 {column.titlecompany}
//               </h3>
//               {column.linkscompany && (
//                 <ul className="space-y-2">
//                   {column.linkscompany.map((link, linkIndex) => (
//                     <li
//                       key={linkIndex}
//                       className="text-base  text-gray-800 md:text-[12px] lg:text-xl"
//                       style={{ color: displayColor }}
//                     >
//                       {link.text}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useThemeContext } from "@app/context/theme-context";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

type CompanyData = {
  type: "email" | "line" | "facebook";
  text: string;
  link: string;
};

type ColumnData = {
  logo?: string;
  titlephone?: string;
  textphone?: string;
  title?: string;
  text: string;
  links?: CompanyData[];
  titlecompany?: string;
  linkscompany?: CompanyData[];
};

type ContactCompanyProps = {
  obj: ColumnData[];
};

const ContactLink = ({ linksData }: { linksData: CompanyData }) => {
  const { themeColor1 } = useThemeContext();
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

  const getIcon = () => {
    const iconClass = "w-5 h-5 transition-transform group-hover:scale-110";
    switch (linksData.type) {
      case "email":
        return <Mail className={iconClass} style={{ color: displayColor }} />;
      case "line":
        return (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png"
            alt="line"
            width={20}
            height={20}
            className="object-contain"
            unoptimized
          />
        );
      case "facebook":
        return (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1280px-Facebook_Logo_%282019%29.png"
            alt="facebook"
            width={20}
            height={20}
            className="object-contain"
            unoptimized
          />
        );
      default:
        return null;
    }
  };

  return (
    <Link
      href={linksData?.link || "#"}
      target="_blank"
      className="group block w-full"
    >
      <div className="flex items-center gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
          {getIcon()}
        </div>
        <span
          className="text-sm font-medium truncate md:text-base"
          style={{ color: displayColor }}
        >
          {linksData.text}
        </span>
      </div>
    </Link>
  );
};

export default function ContactCompany({ obj }: ContactCompanyProps) {
  const { themeColor1 } = useThemeContext();
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

  if (!obj || obj.length === 0) return null;

  return (
    <footer className="bg-[#f8fafc] py-16 px-6 border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {obj.map((column, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center md:items-start space-y-6">
                <div className="shadow-sm border border-gray-50">
                  <img
                    src={renderImageUrl(column.logo)}
                    alt="Logo"
                    className="h-auto w-[130px] md:w-[150px] object-contain"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <Phone
                      className="w-4 h-4"
                      style={{ color: displayColor }}
                    />
                    <h3
                      className="text-lg font-bold tracking-tight"
                      style={{ color: displayColor }}
                    >
                      {column.titlephone}
                    </h3>
                  </div>
                  <p
                    className="text-2xl font-black"
                    style={{ color: displayColor }}
                  >
                    {column.textphone}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin
                      className="w-5 h-5"
                      style={{ color: displayColor }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{ color: displayColor }}
                    >
                      {column.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {column.text}
                  </p>
                </div>

                {column.links && (
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {column.links.map((link, idx) => (
                      <ContactLink key={idx} linksData={link} />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Building2
                      className="w-5 h-5"
                      style={{ color: displayColor }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{ color: displayColor }}
                    >
                      {column.titlecompany}
                    </h3>
                  </div>
                  {column.linkscompany && (
                    <ul className="space-y-3">
                      {column.linkscompany.map((link, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm md:text-base text-gray-600 group cursor-default"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150"
                            style={{ backgroundColor: displayColor }}
                          />
                          <span className="hover:text-gray-900 transition-colors">
                            {link.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
