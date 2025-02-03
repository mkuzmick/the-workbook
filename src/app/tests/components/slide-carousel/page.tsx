"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Innovation at the Learning Lab
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ sections }: { sections: { text: string; src: string; alt: string }[] }) => {
  return (
    <>
      {sections.map((section, index) => (
        <div
          key={`dummy-content-${index}`}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            {section.text}
          </p>
          <Image
            src={section.src}
            alt={section.alt}
            height={500}
            width={800}
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "AI-Powered Education",
    src: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <DummyContent
        sections={[
          {
            text: "Explore how AI transforms the classroom, enabling personalized learning experiences.",
            src: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "AI in education",
          },
          {
            text: "Leverage machine learning to analyze student engagement and adapt teaching strategies.",
            src: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "AI insights for education",
          },
          {
            text: "Discover how AI-driven tools can support instructors with smarter grading systems.",
            src: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "AI tools for grading",
          },
        ]}
      />
    ),
  },
  {
    category: "Collaboration",
    title: "Collaborative Learning Spaces",
    src: "https://files.slack.com/files-pri/T0HTW3H0V-F085XQAQMHQ/img_0791.jpg?pub_secret=15baa58b79",
    content: (
      <DummyContent
        sections={[
          {
            text: "Discover how technology enhances collaboration among students and educators.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F085XQAQMHQ/img_0791.jpg?pub_secret=15baa58b79",
            alt: "Collaborative tools",
          },
          {
            text: "Learn how multimedia tools can foster creative teamwork in academic settings.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F085XQAQMHQ/img_0791.jpg?pub_secret=15baa58b79",
            alt: "Creative teamwork",
          },
          {
            text: "Create shared knowledge spaces using the latest digital platforms.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F085XQAQMHQ/img_0791.jpg?pub_secret=15baa58b79",
            alt: "Digital collaboration",
          },
        ]}
      />
    ),
  },
  {
    category: "Immersive Technology",
    title: "Apple Vision Pro for Education",
    src: "https://files.slack.com/files-pri/T0HTW3H0V-F086ETVP3QX/dall__e_2024-12-30_15.17.31_-_a_16x9_landscape_conceptual_illustration_divided_into_three_spatial_zones_for__the_workbook__application._the_left_zone_represents_a__content_lake__wi.webp?pub_secret=d451fbc584",
    content: (
      <DummyContent
        sections={[
          {
            text: "Transform learning with augmented and virtual reality experiences.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F086ETVP3QX/dall__e_2024-12-30_15.17.31_-_a_16x9_landscape_conceptual_illustration_divided_into_three_spatial_zones_for__the_workbook__application._the_left_zone_represents_a__content_lake__wi.webp?pub_secret=d451fbc584",
            alt: "AR/VR in education",
          },
          {
            text: "Engage students in immersive simulations and virtual field trips.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F086ETVP3QX/dall__e_2024-12-30_15.17.31_-_a_16x9_landscape_conceptual_illustration_divided_into_three_spatial_zones_for__the_workbook__application._the_left_zone_represents_a__content_lake__wi.webp?pub_secret=d451fbc584",
            alt: "Virtual field trips",
          },
          {
            text: "Redefine hands-on learning with cutting-edge wearable technology.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F086ETVP3QX/dall__e_2024-12-30_15.17.31_-_a_16x9_landscape_conceptual_illustration_divided_into_three_spatial_zones_for__the_workbook__application._the_left_zone_represents_a__content_lake__wi.webp?pub_secret=d451fbc584",
            alt: "Wearable tech in education",
          },
        ]}
      />
    ),
  },
  {
    category: "Navigation",
    title: "Innovative Maps for Education",
    src: "https://files.slack.com/files-pri/T0HTW3H0V-F085UR9LA2E/img_0786.jpg?pub_secret=d99add7feb",
    content: (
      <DummyContent
        sections={[
          {
            text: "Discover how advanced mapping technologies can enhance geography and field studies.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F085UR9LA2E/img_0786.jpg?pub_secret=d99add7feb",
            alt: "Educational maps",
          },
          {
            text: "Enable students to visualize historical events with interactive map overlays.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F085UR9LA2E/img_0786.jpg?pub_secret=d99add7feb",
            alt: "Interactive maps",
          },
          {
            text: "Integrate location-based data to inspire new ways of learning about the world.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F085UR9LA2E/img_0786.jpg?pub_secret=d99add7feb",
            alt: "Geographical learning tools",
          },
        ]}
      />
    ),
  },
  {
    category: "Visual Arts",
    title: "Transforming Photography in Education",
    src: "https://files.slack.com/files-pri/T0HTW3H0V-F084BNM345C/mdf-fall-2024-11.png?pub_secret=0ee4484183",
    content: (
      <DummyContent
        sections={[
          {
            text: "Empower students to tell stories through impactful visuals and photographs.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F084BNM345C/mdf-fall-2024-11.png?pub_secret=0ee4484183",
            alt: "Photography in education",
          },
          {
            text: "Incorporate advanced image editing tools to enhance creative projects.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F084BNM345C/mdf-fall-2024-11.png?pub_secret=0ee4484183",
            alt: "Creative photography tools",
          },
          {
            text: "Capture and share campus events to build community engagement.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F084BNM345C/mdf-fall-2024-11.png?pub_secret=0ee4484183",
            alt: "Campus photography",
          },
        ]}
      />
    ),
  },
  {
    category: "Careers",
    title: "Join Our Team",
    src: "https://files.slack.com/files-pri/T0HTW3H0V-F0856RRQF3J/img_0561.jpg?pub_secret=26583f1664",
    content: (
      <DummyContent
        sections={[
          {
            text: "Help us shape the future of education at the Learning Lab.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F0856RRQF3J/img_0561.jpg?pub_secret=26583f1664",
            alt: "Future of education",
          },
          {
            text: "Collaborate with a diverse team of educators, technologists, and creators.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F0856RRQF3J/img_0561.jpg?pub_secret=26583f1664",
            alt: "Team collaboration",
          },
          {
            text: "Be part of innovative projects that transform learning experiences.",
            src: "https://files.slack.com/files-pri/T0HTW3H0V-F0856RRQF3J/img_0561.jpg?pub_secret=26583f1664",
            alt: "Innovative education projects",
          },
        ]}
      />
    ),
  },
];
