import { ReactNode } from 'react';
import MarkdownEditor from '@/components/tools/markdown/MarkdownEditor';

interface ComponentProps {
    children: ReactNode;
}
const Component = ({children}: ComponentProps) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default function Page() {
    return (
        <main>
            <Component>
                Component content
            </Component>
            <MarkdownEditor />
        </main>
    )
}
