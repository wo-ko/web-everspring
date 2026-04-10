"use client";

import React, { Component } from "react";
import { ThemeContext } from "@app/context/theme-context";
import { ActivityUI } from "@/types/jobcontent";
import { resolveImageUrl } from "@app/admin/hook/useMediaImages";

type Props = {
  titles?: { th: string; en: string };
  activities: ActivityUI[];
  onClick?: (activity: ActivityUI) => void;
};

class ActivitiesSection extends Component<Props> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  render() {
    const { activities, titles, onClick } = this.props;
    const { lang } = this.context;

    if (!activities || activities.length === 0) return null;

    return (
      <section 
      // className="py-10 md:py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-800">
            {titles?.[lang as "th" | "en"]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <div
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => onClick?.(activity)}
                >
                  <div className="overflow-hidden h-70">
                    <img
                      src={resolveImageUrl(activity.imageUrl)}
                      alt={activity.title[lang as "th" | "en"]}
                      onError={() =>
                        console.log("โหลดรูปไม่ได้:", activity.imageUrl)
                      }
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
                  </div>
                </div>

                {(index === 2 || index === 5) && (
                  <div className="col-span-full border-t border-gray-200 my-4"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default ActivitiesSection;
