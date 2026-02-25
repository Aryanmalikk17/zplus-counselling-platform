import { Loader2 } from 'lucide-react';
import React from 'react';


const Loading: React.FC = () => {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
        </div>
    );
};

export default Loading;
