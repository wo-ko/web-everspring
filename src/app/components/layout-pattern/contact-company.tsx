import React from "react";
import "../../styles/globas.css";
import { useThemeContext } from "@app/context/theme-context";

type Link = {
  type: "email" | "line" | "facebook";
  text: string;
};

type ColumnData = {
  logo?: string;
  titlephone?: string;
  textphone?: string;
  title?: string;
  text: string;
  links?: Link[];
  titlecompany?: string;
  linkscompany?: Link[];
};

type ContactCompanyProps = {
  obj: ColumnData[];
};

const ContactLink = ({ link }: { link: Link }) => {
  const { themeColor1 } = useThemeContext();
  const getIcon = () => {
    switch (link.type) {
      // case 'phone':
      //   return <img className="text-xl mr-3" src="https://cdn-icons-png.flaticon.com/128/724/724664.png" width={20} height={20} />;
      case "email":
        return (
          <img
            className="text-xl mr-3"
            src="https://cdn-icons-png.flaticon.com/128/9068/9068642.png"
            width={20}
            height={20}
          />
        );
      case "line":
        return (
          <img
            className="text-xl mr-3"
            src="https://cdn-icons-png.flaticon.com/128/3670/3670089.png"
            width={20}
            height={20}
          />
        );
      case "facebook":
        return (
          <img
            className="text-xl mr-3"
            src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
            width={20}
            height={20}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-2.5 flex items-center w-full max-w-xs shadow-sm">
      {getIcon()}
      <span className="text-sm font-medium" style={{ color: themeColor1 || '#323296'}}>{link.text}</span>
    </div>
  );
};

export default function ContactCompany({ obj }: ContactCompanyProps) {
  if (!obj || obj.length === 0) {
    return null;
  }
  return (
    <div className="bg-gray-100 py-12 px-6 text-gray-800">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {obj.map((column, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-5">
                <img src={column.logo} alt="Logo" width={130} height={100} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {column.titlephone}
              </h3>
              <p className="text-base  text-gray-800 mt-0">
                {column.textphone}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              {column.title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {column.title}
                </h3>
              )}
              <div className="whitespace-pre-line text-base leading-relaxed">
                {column.text}
              </div>
              {column.links && (
                <div className="mt-5 space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <ContactLink key={linkIndex} link={link} />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {column.titlecompany}
              </h3>
              {column.linkscompany && (
                <ul className="space-y-2">
                  {column.linkscompany.map((link, linkIndex) => (
                    <li key={linkIndex} className="text-base  text-gray-800">
                      {link.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
// {"obj": [{"logo":"https://res.cloudinary.com/dyg6r8pec/image/upload/w_130,h_100,c_fit/v1749023798/logo_everspring-01-Photoroom_lq2qb3.png","titlephone":"เบอร์โทรติดต่อ","textphone":"02-363-8560" ,"title": "ติดต่อบริษัท", "text": "ที่อยู่สำนักงานใหญ่ 388/70 ถนนนวลจันทร์\nแขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพมหานคร 10230", "links": [ {"type": "email", "text": "evergreenagro.th@gmail.com" }, { "type": "line", "text": "Green Land Company" }, { "type": "facebook", "text": "Green Land Company" },{ "type": "line", "text": "Wintafone (Thailand)" },{ "type": "facebook", "text": "Wintafone (Thailand)" }],"titlecompany":"บริษัทในเครือ","linkscompany": [ { "text": "บริษัท เอฟ แอนด์ ดับบลิว อะโกรเคม จำกัด" }, {"text": "บริษัท กรีนแลนด์ อโกรเคมีคอล จำกัด" }, { "text": "บริษัท วินทาโฟน (ประเทศไทย) จำกัด" },{ "text": "บริษัท เอเวอร์สปริง อโกรเคม จำกัด" }]}]}
//  {"obj": [{"logo":"https://res.cloudinary.com/dyg6r8pec/image/upload/w_130,h_100,c_fit/v1749023798/logo_everspring-01-Photoroom_lq2qb3.png","titlephone":"Contact Number","textphone":"02-363-8560" ,"title": "Contact Us", "text": "Head Office Address: 388/70 Nuan Chan Road,Nuan Chan Sub-district,Bueng Kum District,Bangkok 10230, Thailand", "links": [ {"type": "email", "text": "evergreenagro.th@gmail.com" }, { "type": "line", "text": "Green Land Company" }, { "type": "facebook", "text": "Green Land Company" },{ "type": "line", "text": "Wintafone (Thailand)" },{ "type": "facebook", "text": "Wintafone (Thailand)" }],"titlecompany":"Affiliate company","linkscompany": [ { "text": "F&W AGROCHEM CO., LTD." }, {"text": "GREEN LAND AGROCHEMICAL CO.,LTD." }, { "text": "WINTAFONE (THAILAND) CO., LTD." },{ "text": "Everspring Agrochem Co.,Ltd." }]}]}
