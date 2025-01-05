import { ReactNode } from 'react';
import Image from 'next/image';
import Head from 'next/head';

interface StorySectionProps {
    imageSrc: string;
    text: string;
}

const StorySection = ({ imageSrc, text }: StorySectionProps) => {
    return (
        <div className="flex flex-col items-center mb-16">
            <div className="w-[60%] min-w-[600px]">
                <Image
                    src={imageSrc}
                    alt="Story Illustration"
                    width={1200}
                    height={800}
                    layout="responsive"
                    objectFit="contain"
                />
            </div>
            <p className="mt-8 text-2xl text-gray-800 font-serif text-center max-w-xl">
                {text}
            </p>
        </div>
    );
};

const StoryBook = () => {
    return (
        <div className="w-full pt-10">
            <h1 className="text-7xl font-bold text-center mb-12 font-serif text-gray-900">
                The Characters
            </h1>
            <div className="space-y-16">
                <StorySection
                    imageSrc="/images/zk-illustration-003.png"
                    text="This is a cat named Meadowsweet (after the flower)"
                />
                <StorySection
                    imageSrc="/images/zk-illustration-004.png"
                    text="This is a mouse named Daisy (also after the flower)"
                />
                <StorySection
                    imageSrc="/images/zk-illustration-005.png"
                    text="This is an unnamed hen."
                />
                <StorySection
                    imageSrc="/images/zk-illustration-006.png"
                    text="This is a bear who I probably won't add to the story because she looks too much like the Candlewick Press logo."
                />
                <StorySection
                    imageSrc="/images/zk-illustration-007.png"
                    text="This is a cat named Pumpkin."
                />
                <StorySection
                    imageSrc="/images/zk-illustration-008.png"
                    text="And this is the whole page of illustrations."
                />
                {/* Add more StorySections as needed */}
                <div className="min-h-7"> </div>
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <main>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-[#f8f4eb]">
                <StoryBook />
            </div>
        </main>
    );
}
