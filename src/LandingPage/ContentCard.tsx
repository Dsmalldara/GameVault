/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import community from '/community-driven.png'
import transparent from '/transparent.png'
import world from '/world.png'
import people from '/people.png'
interface FeatureCardProps {
  title: string;
  description: string;
  icon: any
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <Card className="review-color border-transparent shadow-lg text-white rounded-3xl overflow-hidden">
    <CardHeader className="flex flex-row items-center space-x-4 p-6">
      <div className="review-color opacity-90 p-1 rounded-lg">
        <img src={icon} alt={title} className="h-10 w-10" />
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6 pt-2">
      <p className="text-gray-300">{description}</p>
    </CardContent>
  </Card>
);

const FeatureCards = () => {
  const features = [
    {
      title: "OPEN SOURCE",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.",
      icon: people
    },
    {
      title: "WORLDWIDE",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.",
      icon: world
    },
    {
      title: "TRANSPARENT",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.",
      icon: transparent
    },
    {
      title: "COMMUNITY DRIVEN",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc.",
      icon: community
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default FeatureCards;