// 'use client';
// import React, { Component } from 'react';
// import Image from 'next/image';

// type Activity = {
//   id: number;
//   imageUrl: string;
//   title: string;
//   description: string;
//   linkUrl: string;
// };

// type Props = {
//  titles?: string;
//   activities: Activity[];
// };

// class ActivitiesSection extends Component<Props> {
//   render() {
//     const { activities } = this.props;
//     if (!activities || activities.length === 0) {
//       return null;
//     }

//     return (
//       <section className="bg-white py-10 md:py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
//             {this.props.titles}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {activities.map((activity) => (
//               <div key={activity.id} className="group">
//                 <a href={activity.linkUrl} className="block">
//                   <div className="mb-4 overflow-hidden">
//                     <img
//                       src={activity.imageUrl}
//                       alt={activity.title}
//                       width={500}
//                       height={350}
//                       className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                       {activity.title}
//                     </h3>
//                     <p className="text-gray-600 mt-1">
//                       {activity.description}
//                     </p>
//                   </div>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

// export default ActivitiesSection;

"use client";
import React, { Component } from "react";
import { ThemeContext } from "@app/context/theme-context";

type Activity = {
  id: number;
  imageUrl: string;
  linkUrl: string;
  title: { th: string; en: string };
  description: { th: string; en: string };
};

type Props = {
  titles?: { th: string; en: string };
  activities: Activity[];
};

class ActivitiesSection extends Component<Props> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  render() {
    const { activities, titles } = this.props;
    const { lang } = this.context; // 'th' หรือ 'en'

    if (!activities || activities.length === 0) return null;

    return (
      <section className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-800">
            {titles?.[lang as "th" | "en"]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <a href={activity.linkUrl} className="block">
                  {/* <div className="overflow-hidden">
                    <img
                      src={activity.imageUrl}
                      alt={activity.title[lang as "th" | "en"]}
                      className="w-full h-44 object-cover transition-transform duration-200 group-hover:scale-102"
                    />
                  </div> */}

                  <div className="overflow-hidden h-70">
                    <img
                      src={activity.imageUrl}
                      alt={activity.title[lang as "th" | "en"]}
                      className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-102"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">
                      {activity.title[lang as "th" | "en"]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {activity.description[lang as "th" | "en"]}
                    </p>
                    <span className="mt-2 inline-block text-sm text-blue-600 hover:underline">
                      {/* {lang === "th" ? "ดูรายละเอียด →" : "View details →"} */}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default ActivitiesSection;
