import { MessageCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Video } from '../components/Video';
import { Module } from '../components/Module';
import { useAppSelector } from '../store';
import { useCurrentLesson } from '../store/slices/player';
import { useEffect } from 'react';

export function Player() {
  // o React só via atualizar, quando realmente o estado q estamos pegando aq atualizar
  // por isso q quando chamamos o appSelector, a gente chama exatamente o que a gente quer
  // pra evitar renderizações desencessárias, quando outras coisas do nosso redux mudar
  const modules = useAppSelector(state => state.player.course.modules);

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson.title}`
  }, [currentLesson])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          {/* Header */}
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l border-zinc-800 divide-y-2 divide-zinc-900 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules.map((module, index) => {
              return (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  amountOfLessons={module.lessons.length}
                  title={module.title}
                />
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  );
}