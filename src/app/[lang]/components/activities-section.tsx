'use client';
import React, { Component } from 'react';
import Image from 'next/image';

type Activity = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
};

type Props = {
 titles?: string;
  activities: Activity[];
};

class ActivitiesSection extends Component<Props> {
  render() {
    const { activities } = this.props;
    if (!activities || activities.length === 0) {
      return null;
    }

    return (
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            {this.props.titles}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity.id} className="group">
                <a href={activity.linkUrl} className="block">
                  <div className="mb-4 overflow-hidden">
                    <img
                      src={activity.imageUrl}
                      alt={activity.title}
                      width={500}
                      height={350}
                      className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {activity.description}
                    </p>
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