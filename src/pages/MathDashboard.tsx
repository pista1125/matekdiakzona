import { useState, useMemo } from 'react';
import { mathModules, MathModule } from '@/data/mathModules';
import { MathModuleCard } from '@/components/math/MathModuleCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, Shapes, Calculator, BookOpen, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MathDashboardProps {
    onModuleSelect: (module: MathModule) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    schoolLevel: SchoolLevel;
    setSchoolLevel: (level: SchoolLevel) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

export type SchoolLevel = 'all' | 'elementary' | 'highschool';

export function MathDashboard({
    onModuleSelect,
    searchQuery,
    setSearchQuery,
    schoolLevel,
    setSchoolLevel,
    selectedCategory,
    setSelectedCategory
}: MathDashboardProps) {
    // State is now lifted to MathPage


    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(mathModules.map(m => m.category));
        return Array.from(cats);
    }, []);

    // Filter modules
    const filteredModules = useMemo(() => {
        return mathModules.filter(module => {
            // 1. Search Filter
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                module.title.toLowerCase().includes(query) ||
                module.description.toLowerCase().includes(query) ||
                module.tags.some(tag => tag.toLowerCase().includes(query));

            if (!matchesSearch) return false;

            // 2. School Level Filter
            if (schoolLevel === 'elementary') {
                // Check if has grades 1-8
                const hasElementary = module.grades.some(g => typeof g === 'number' && g <= 8);
                if (!hasElementary) return false;
            } else if (schoolLevel === 'highschool') {
                // Check if has high school grades
                const hasHighSchool = module.grades.some(g =>
                    (typeof g === 'string' && g.startsWith('high')) ||
                    (typeof g === 'number' && g > 8)
                );
                if (!hasHighSchool) return false;
            }

            // 3. Category Filter
            if (selectedCategory && module.category !== selectedCategory) {
                return false;
            }

            return true;
        });
    }, [searchQuery, schoolLevel, selectedCategory]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Search and Hero Section */}
            <div className="relative text-center space-y-4 py-8">
                <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                    Matematika Tudástár
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Fedezd fel interaktív moduljainkat, gyakorló feladatainkat és tananyagainkat egy helyen.
                </p>

                <div className="max-w-xl mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            placeholder="Keresés (pl. geometria, törtek, 5. osztály)..."
                            className="pl-12 h-14 text-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-lg ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col gap-6">
                {/* School Level Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-inner">
                        <button
                            onClick={() => setSchoolLevel('all')}
                            className={cn(
                                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                schoolLevel === 'all'
                                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            Minden szint
                        </button>
                        <button
                            onClick={() => setSchoolLevel('elementary')}
                            className={cn(
                                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                schoolLevel === 'elementary'
                                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            Általános Iskola (1-8)
                        </button>
                        <button
                            onClick={() => setSchoolLevel('highschool')}
                            className={cn(
                                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                schoolLevel === 'highschool'
                                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            Középiskola (9-12)
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            "rounded-full border",
                            selectedCategory === null
                                ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                                : "bg-transparent border-slate-200 text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        Összes kategória
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "rounded-full border",
                                selectedCategory === cat
                                    ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                                    : "bg-transparent border-slate-200 text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map(module => (
                    <MathModuleCard
                        key={module.id}
                        module={module}
                        onClick={() => onModuleSelect(module)}
                    />
                ))}

                {filteredModules.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        <div className="flex justify-center mb-4">
                            <Search className="w-12 h-12 opacity-20" />
                        </div>
                        <p className="text-lg font-medium">Nincs a keresésnek megfelelő találat.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchQuery('');
                                setSchoolLevel('all');
                                setSelectedCategory(null);
                            }}
                        >
                            Szűrők törlése
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
