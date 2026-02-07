import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mathTopics } from '@/data/mathTopics';
import { MathQuiz } from '@/components/math/MathQuiz';

import { FractionVisualizer } from '@/components/math/FractionVisualizer';
import { FractionsModule } from '@/components/math/FractionsModule';
import { Grade1MathModule } from '@/components/math/Grade1MathModule';
import { Grade2MathModule } from '@/components/math/Grade2MathModule';
import { AlgebraQuiz } from '@/components/math/AlgebraQuiz';
import { MathColoringGame } from '@/components/math/MathColoringGame';
import { DivisibilityTool } from '@/components/math/DivisibilityTool';
import { MaterialGallery } from '@/components/math/MaterialGallery';
import { LessonViewer } from '@/components/math/LessonViewer';
import { LongDivisionTool } from '@/components/math/LongDivisionTool';
import { AngleMatcher } from '@/components/math/AngleMatcher';
import { ShapeClassifier } from '@/components/math/ShapeClassifier';
import { LineRelationships } from '@/components/math/LineRelationships';
import { DivisibilityPowersModule } from '@/components/math/DivisibilityPowersModule';
import { WordProblemsModule } from '@/components/math/WordProblemsModule';
import { TriangleClassifier } from '@/components/math/TriangleClassifier';
import { QuadrilateralClassifier } from '@/components/math/QuadrilateralClassifier';
import { QuizResult, GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calculator,
} from 'lucide-react';


import { MathDashboard } from '@/pages/MathDashboard';
import { MathModule, mathModules } from '@/data/mathModules';
import { MathHeader } from '@/components/math/MathHeader';
import { MathSidebar } from '@/components/math/MathSidebar';

type ViewState = 'dashboard' | 'activity';
type ActivityType = 'quiz' | 'fractions' | 'algebra' | 'geometry' | 'percentages' | 'coloring' | 'divisibility' | 'materials' | 'long-division' | 'angle-matching' | 'shape-classification' | 'line-relationships' | 'divisibility-powers' | 'grade1-basic' | 'grade2-basic' | 'word-problems' | 'triangle-classification' | 'quadrilateral-classification' | 'grade1-snake' | 'grade1-addition' | 'grade2-snake' | 'grade2-coloring' | 'grade2-blocks';
type SchoolLevel = 'all' | 'elementary' | 'highschool';

export default function MathPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // Kept for legacy compatibility if needed
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [activityType, setActivityType] = useState<ActivityType>('quiz');
  const [activeMaterial, setActiveMaterial] = useState<{ title: string, path: string } | null>(null);

  // Lifted State for Persistence
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract unique categories for sidebar
  const categories = useMemo(() => {
    const cats = new Set(mathModules.map(m => m.category));
    return Array.from(cats);
  }, []);

  const currentTopic = mathTopics.find(t => t.id === selectedTopic);

  const handleModuleSelect = (module: MathModule) => {
    // If the module defines a specific grade (like grade 1 basics), set it
    if (module.grades.length === 1 && typeof module.grades[0] === 'number') {
      setSelectedGrade(module.grades[0] as GradeLevel);
    }

    // Validating ActivityType cast since we know they match
    setActivityType(module.activityType as ActivityType);
    setView('activity');
  };

  const handleBack = () => {
    if (view === 'activity') {
      if (activityType === 'materials' && activeMaterial) {
        setActiveMaterial(null);
      } else {
        setView('dashboard');
        setSelectedGrade(null);
      }
    } else {
      // If at dashboard, we can just return or maybe open sidebar?
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MathHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <MathSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        schoolLevel={schoolLevel}
        setSchoolLevel={setSchoolLevel}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Header - Only show when NOT in dashboard view to avoid duplication */}
      {view !== 'dashboard' && (
        <div className="bg-gradient-math text-white py-8 px-4">
          <div className="container max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Vissza
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Calculator className="w-10 h-10" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold">Matematika</h1>
                <p className="text-white/80">
                  {view === 'activity' && (currentTopic?.title || 'Gyakorlás')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8 flex-1">
        {view === 'dashboard' && (
          <div className="animate-slide-up">
            <MathDashboard
              onModuleSelect={handleModuleSelect}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              schoolLevel={schoolLevel}
              setSchoolLevel={setSchoolLevel}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        )}

        {view === 'activity' && (
          <div className="animate-slide-up">
            {activityType === 'fractions' && (
              <FractionsModule onBack={handleBack} />
            )}

            {(activityType === 'grade1-basic' || activityType === 'grade1-snake' || activityType === 'grade1-addition') && (
              <Grade1MathModule
                onBack={handleBack}
                initialView={
                  activityType === 'grade1-snake' ? 'snake' :
                    activityType === 'grade1-addition' ? 'addition10' :
                      'menu'
                }
              />
            )}

            {(activityType === 'grade2-basic' || activityType === 'grade2-snake' || activityType === 'grade2-coloring' || activityType === 'grade2-blocks') && (
              <Grade2MathModule
                onBack={handleBack}
                initialView={
                  activityType === 'grade2-snake' ? 'snake' :
                    activityType === 'grade2-coloring' ? 'coloring' :
                      activityType === 'grade2-blocks' ? 'blocks' :
                        'menu'
                }
              />
            )}

            {activityType === 'divisibility' && (
              <DivisibilityTool onBack={handleBack} />
            )}

            {activityType === 'long-division' && (
              <LongDivisionTool onBack={handleBack} />
            )}

            {activityType === 'angle-matching' && (
              <AngleMatcher onBack={handleBack} />
            )}

            {activityType === 'shape-classification' && (
              <ShapeClassifier onBack={handleBack} />
            )}

            {activityType === 'line-relationships' && (
              <LineRelationships onBack={handleBack} />
            )}

            {activityType === 'triangle-classification' && (
              <TriangleClassifier onBack={handleBack} />
            )}

            {activityType === 'quadrilateral-classification' && (
              <QuadrilateralClassifier onBack={handleBack} />
            )}

            {activityType === 'divisibility-powers' && (
              <DivisibilityPowersModule onBack={handleBack} />
            )}

            {activityType === 'word-problems' && (
              <WordProblemsModule onBack={handleBack} />
            )}

            {activityType === 'materials' && (
              <MaterialGallery grade={selectedGrade || 5} onView={(m) => setActiveMaterial(m)} />
            )}

            {activeMaterial && (
              <LessonViewer material={activeMaterial} onClose={() => setActiveMaterial(null)} />
            )}

            {activityType === 'algebra' && (
              <AlgebraQuiz
                grade={typeof selectedGrade === 'number' ? selectedGrade : 7}
                onComplete={(result) => console.log(result)}
                onBack={handleBack}
              />
            )}

            {activityType === 'percentages' && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="font-display text-2xl font-bold mb-2">Százalékszámítás modul</h2>
                <p className="text-muted-foreground mb-6">
                  Egy interaktív kalkulátor hamarosan elérhető lesz itt!
                </p>
                <Button onClick={handleBack}>Vissza</Button>
              </div>
            )}

            {activityType === 'quiz' && (
              <MathQuiz
                grade={typeof selectedGrade === 'number' ? selectedGrade : 5}
                type="mixed"
                onComplete={(result) => console.log(result)}
                onBack={handleBack}
              />
            )}

            {activityType === 'geometry' && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <div className="text-6xl mb-4">📐</div>
                <h2 className="font-display text-2xl font-bold mb-2">Geometria modul</h2>
                <p className="text-muted-foreground mb-6">
                  Az interaktív geometriai szerkesztő és számoló modul fejlesztés alatt áll.
                </p>
                <Button onClick={handleBack}>Vissza</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


