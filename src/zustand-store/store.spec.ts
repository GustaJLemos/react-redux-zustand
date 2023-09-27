import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from '.'

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: "Iniciando com React",
      lessons: [
        {
          id: "Jai8w6K_GnY",
          title: "CSS Modules",
          duration: "13:45"
        },
        {
          id: "w-DW4DhDfcw",
          title: "Estilização do Post",
          duration: "10:05"
        },
        {
          id: "D83-55LUdKE",
          title: "Componente: Header",
          duration: "06:33"
        },
        {
          id: "W_ATsETujaY",
          title: "Componente: Sidebar",
          duration: "09:12"
        },
        {
          id: "Pj8dPeameYo",
          title: "CSS Global",
          duration: "03:23"
        },
        {
          id: "8KBq2vhwbac",
          title: "Form de comentários",
          duration: "11:34"
        }
      ]
    },
    {
      id: 2,
      title: "Estrutura da aplicação",
      lessons: [
        {
          id: "gE48FQXRZ_o",
          title: "Componente: Comment",
          duration: "13:45"
        },
        {
          id: "Ng_Vk4tBl0g",
          title: "Responsividade",
          duration: "10:05"
        },
        {
          id: "h5JA3wfuW1k",
          title: "Interações no JSX",
          duration: "06:33"
        },
        {
          id: "1G0vSTqWELg",
          title: "Utilizando estado",
          duration: "09:12"
        }
      ]
    }
  ]
}

const initialState = useStore.getState()

describe('zustand store', () => {
  beforeEach(() => {
    // para cada teste, eu "reseto" meu estado, para que um teste não interfira no outro, sem isso, se eu atualizasse algo, o prox teste iria ter esse valor atualizado
    useStore.setState(initialState)
  })
  it('should be able to play', () => {
    const { play } = useStore.getState()

    play([1, 2])

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()


    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    useStore.setState({ course })

    const { next } = useStore.getState()

    next()

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it('should be able to jump the next module automatically', () => {
    useStore.setState({ course })

    const { next } = useStore.getState()

    useStore.setState({ currentLessonIndex: 1 })

    next()

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(2)
  })

  it('should not update the current module and lesson index if there is no next lesso available', () => {
    useStore.setState({ course })

    const { next } = useStore.getState()

    useStore.setState({ currentModuleIndex: 1, currentLessonIndex: 1 })

    next()

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })
})