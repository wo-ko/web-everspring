'use client';

import React, { Component } from 'react';

type Props = {
    titles?: string;
    activities: string[];
};

class ProductList extends Component<Props> {
    render() {
        const { activities } = this.props;

        if (!activities || activities.length === 0) {
            return null;
        }

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-gray-200 py-16 px-4 md:px-8 lg:px-16 text-center shadow-md mb-12">
                    <p className="text-2xl md:text-3xl font-semibold">
                        {this.props.titles}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-base md:text-lg">
                        {activities.map((product, index) => (
                            <li key={`col1-${index}`}>{product}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProductList;
