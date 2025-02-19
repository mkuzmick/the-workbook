import { ReactNode } from 'react';

interface CreaturesProps {
    children: ReactNode;
}
const Creatures = ({children}: CreaturesProps) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default function Page() {
    return (
        <main>
            <Creatures>
                Creatures content
            </Creatures>
        </main>
    )
}