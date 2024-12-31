import { ReactNode } from 'react';
import MarkdownNoteEditor from '@/components/tools/markdown/MarkdownNoteEditor';
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
            <MarkdownNoteEditor />
        </main>
    )
}
