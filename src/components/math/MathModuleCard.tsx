import { MathModule } from '@/data/mathModules';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface MathModuleCardProps {
    module: MathModule;
    onClick: () => void;
}

export function MathModuleCard({ module, onClick }: MathModuleCardProps) {
    // Helper to format grade display
    const formatGrades = () => {
        const grades = module.grades;
        if (grades.length === 0) return '';

        // Check for high school specific
        const isHighSchool = grades.some(g => typeof g === 'string' && g.startsWith('high'));
        if (isHighSchool) return 'Középiskola';

        const min = Math.min(...grades.filter((g): g is number => typeof g === 'number'));
        const max = Math.max(...grades.filter((g): g is number => typeof g === 'number'));

        if (min === max) return `${min}. osztály`;
        return `${min}-${max}. osztály`;
    };

    return (
        <Card
            onClick={onClick}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-transparent bg-white/80 backdrop-blur-md dark:bg-slate-900/80 rounded-3xl"
        >
            {/* Background Gradient & Pattern */}
            <div className={cn(
                "absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20 bg-gradient-to-br",
                module.color
            )} />

            {/* Decorative Blob */}
            <div className={cn(
                "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:scale-150",
                module.color.split(' ')[1]?.replace('to-', 'bg-') || 'bg-slate-400'
            )} />

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                        "p-3 rounded-2xl bg-gradient-to-br text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                        module.color
                    )}>
                        <div className="text-3xl">{module.icon}</div>
                    </div>

                    <div className="flex gap-2">
                        {module.grades.map((grade) => (
                            <Badge
                                key={grade}
                                variant="secondary"
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm font-bold text-xs shadow-sm"
                            >
                                {typeof grade === 'number' ? `${grade}. o` : 'Középiskola'}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-display font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                        {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {module.description}
                    </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {module.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <div className={cn(
                    "p-2 rounded-full text-white shadow-md",
                    module.color.split(' ')[0]?.replace('from-', 'bg-') || 'bg-slate-500'
                )}>
                    <ArrowRight className="w-5 h-5" />
                </div>
            </div>
        </Card>
    );
}
