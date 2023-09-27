// import { useCurrentLesson } from "../store/slices/player";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson();
  // const isCourseLoading = useAppSelector(state => state.player.isLoading);
  const isLoading = useStore(state => { return state.isLoading });

  if (isLoading) {
    <h1 className="text-2xl font-bold">Carregando...</h1>
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentModule?.title}</h1>
      <span className="text-sm text-zinc-400">Módulo "{currentLesson?.title}"</span>
    </div>
  );
}