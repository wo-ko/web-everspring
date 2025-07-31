import React from 'react';

type Link = {
  type: 'email' | 'line' | 'facebook';
  text: string;
};

type ColumnData = {
  // image?: string;
  title?: string;
  text: string;
  links?: Link[]; 
};

type ContactCompanyProps = {
  obj: ColumnData[];
};

const ContactLink = ({ link }: { link: Link }) => {
  const getIcon = () => {
    switch (link.type) {
      case 'email':
        return <img className="text-xl mr-3" src="https://cdn-icons-png.flaticon.com/128/9068/9068642.png"  width={20} height={20}/>;
      case 'line':
        return <img className="text-xl mr-3" src="https://cdn-icons-png.flaticon.com/128/3670/3670089.png"  width={20} height={20}/>;
      case 'facebook':
        return <img className="text-xl mr-3" src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"  width={20} height={20}/>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-2.5 flex items-center w-full max-w-xs shadow-sm">
      {getIcon()}
      <span className="text-sm font-medium">{link.text}</span>
    </div>
  );
};

export default function ContactCompany({ obj }: ContactCompanyProps) {
  if (!obj || obj.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 py-12 px-6 text-gray-800 font-['Tahoma',sans-serif]">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-x-8 gap-y-10">
        <div className="flex flex-col items-center flex-1 min-w-[250px] mb-8 md:mb-0">
        {obj.map((column, index) => (
          <div key={index} className="flex-1 min-w-[300px]">          
            {/* {column.image && (
              <img src={column.image} alt="Company Logo" className="mb-6" style={{ width: '130px' }} />
            )} */}
            {column.title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h3>
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
        ))}
        </div>
      </div>
    </div>
  );
}

