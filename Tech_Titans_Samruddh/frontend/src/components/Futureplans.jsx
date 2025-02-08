import React, { useState } from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

const FuturePlans = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleSection = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const sections = [
        {
            title: 'Future Scope',
            description: 'Exploring upcoming technological advancements and expansions.',
            items: [
                { title: 'Advanced AI/ML Integration', content: 'Predictive Analytics, Waste Volume Estimation, Dynamic Pricing for Recycled Materials.' },
                { title: 'IoT Integration', content: 'Smart Bins, Waste Tracking Devices.' },
                { title: 'Blockchain for Transparency', content: 'Supply Chain Tracking, Carbon Credit Tracking.' },
                { title: 'Expansion to Other Industries', content: 'Industrial Waste Management, Household Waste Management.' },
                { title: 'Global Expansion', content: 'Regional Customization, Multi-Language Support.' },
                { title: 'Gamification and Incentives', content: 'Rewards System, Sustainability Certifications.' },
                { title: 'Integration with Smart Cities', content: 'Smart City Partnerships, Public Data Dashboards.' },
                { title: 'Augmented Reality (AR) for Waste Sorting', content: 'AR-Based Training, AR Waste Identification.' },
            ]
        },
        {
            title: 'Business Model Expansion',
            description: 'New revenue streams and collaborations for growth.',
            items: [
                { title: 'New Revenue Streams', content: 'Carbon Credit Marketplace, Waste Collection Services, Training and Certification Programs.' },
                { title: 'Partnerships and Collaborations', content: 'Government Partnerships, Recycling Facility Partnerships, Construction Material Suppliers.' },
                { title: 'Data Monetization', content: 'Waste Analytics for Insurance Companies, Market Research Reports.' },
                { title: 'Subscription Tiers', content: 'Freemium Model, Enterprise Plans.' },
                { title: 'API Licensing', content: 'Third-Party Integrations, White-Label Solutions.' },
                { title: 'Advertising and Sponsorships', content: 'Eco-Friendly Product Ads, Sponsored Content.' },
                { title: 'International Licensing', content: 'Franchise Model, Joint Ventures.' },
            ]
        },
        {
            title: 'Long-Term Vision',
            description: 'Strategic goals to shape a sustainable future.',
            items: [
                { title: 'Circular Economy Leader', content: 'Position C&D Waste Connect as a global leader in promoting the circular economy.' },
                { title: 'Sustainability as a Service (SaaS)', content: 'Expand to offer a suite of sustainability services, including energy efficiency, water conservation, and carbon footprint management.' },
                { title: 'Global Impact', content: 'Aim to reduce global construction waste by 50% over the next decade.' },
                { title: 'AI-Driven Waste-Free Construction', content: 'Develop AI tools to design projects with minimal waste generation.' },
            ]
        }
    ];

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 p-10 rounded-lg shadow-xl max-w-5xl mx-auto mt-14 border border-gray-200">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-10">Future Plans for C&D Waste Connect</h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(activeIndex !== null ? (activeIndex + 1) / 20 * 100 : 0)}%` }}></div>
                </div>
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-6 mt-6">
                        <h3 className="text-3xl font-semibold text-blue-600 border-b pb-2" data-tooltip-id={`tooltip-${sectionIndex}`}>{section.title}</h3>
                        <Tooltip id={`tooltip-${sectionIndex}`} place="top" effect="solid">{section.description}</Tooltip>
                        <div className="space-y-4">
                            {section.items.map((item, itemIndex) => {
                                const index = sectionIndex * 10 + itemIndex;
                                return (
                                    <div key={index} className="border-t pt-4 transition-all duration-300">
                                        <button
                                            className="w-full text-left text-lg font-semibold text-gray-800 hover:text-green-600 focus:outline-none flex justify-between items-center py-2"
                                            onClick={() => toggleSection(index)}
                                        >
                                            {item.title}
                                            <span className="text-gray-600 text-sm">{activeIndex === index ? '-' : '+'}</span>
                                        </button>
                                        {activeIndex === index && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                transition={{ duration: 0.3 }}
                                                className="text-gray-600 mt-2 bg-gray-100 p-4 rounded-lg shadow-sm"
                                            >
                                                {item.content}
                                            </motion.p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto text-center">

                    <div className="mb-4">
                        <p>Contact us: info@cdwastemanagement.com</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="hover:underline">Facebook</a>
                        <a href="#" className="hover:underline">Twitter</a>
                        <a href="#" className="hover:underline">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FuturePlans;