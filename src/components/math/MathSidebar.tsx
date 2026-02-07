import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, GraduationCap, Shapes, Calculator, BookOpen, Filter, X, Home } from 'lucide-react';

interface MathSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    schoolLevel: string;
    setSchoolLevel: (level: any) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    categories: string[];
}

export function MathSidebar({
    isOpen,
    onClose,
    schoolLevel,
    setSchoolLevel,
    selectedCategory,
    setSelectedCategory,
    categories,
}: MathSidebarProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Matematika
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-8 space-y-8">
                    {/* Navigation */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Navigáció</h3>
                        <Button variant="ghost" className="w-full justify-start text-lg font-medium" onClick={() => {
                            window.location.href = '/';
                        }}>
                            <Home className="mr-3 w-5 h-5" />
                            Kezdőlap
                        </Button>
                    </div>

                    {/* School Level Filter */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Szint kiválasztása</h3>
                        <div className="grid gap-2">
                            <Button
                                variant={schoolLevel === 'all' ? 'secondary' : 'ghost'}
                                className="justify-start"
                                onClick={() => setSchoolLevel('all')}
                            >
                                Minden szint
                            </Button>
                            <Button
                                variant={schoolLevel === 'elementary' ? 'secondary' : 'ghost'}
                                className="justify-start"
                                onClick={() => setSchoolLevel('elementary')}
                            >
                                Általános Iskola (1-8)
                            </Button>
                            <Button
                                variant={schoolLevel === 'highschool' ? 'secondary' : 'ghost'}
                                className="justify-start"
                                onClick={() => setSchoolLevel('highschool')}
                            >
                                Középiskola (9-12)
                            </Button>
                        </div>
                    </div>

                    {/* Categories Filter */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Témakörök</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={selectedCategory === null ? 'default' : 'outline'}
                                size="sm"
                                className="rounded-full"
                                onClick={() => setSelectedCategory(null)}
                            >
                                Összes
                            </Button>
                            {categories.map(cat => (
                                <Button
                                    key={cat}
                                    variant={selectedCategory === cat ? 'default' : 'outline'}
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
