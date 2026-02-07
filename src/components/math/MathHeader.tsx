import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";

interface MathHeaderProps {
    onMenuClick: () => void;
}

export function MathHeader({ onMenuClick }: MathHeaderProps) {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="flex gap-4 items-center">
                    <Button variant="ghost" size="icon" onClick={onMenuClick}>
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Menü</span>
                    </Button>
                    <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            MatekDiákzóna
                        </span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-2">
                    {/* Placeholder for future header items like Search trigger or User profile */}
                </div>
            </div>
        </header>
    );
}
