import './App.css'
import { useEffect, useMemo, useState } from 'react'
import type { Checklist, ChecklistItem } from './types'
import { newId } from './lib/id'
import { useLocalStorageState } from './lib/useLocalStorageState'
import { Sidebar } from './components/Sidebar'
import { ChecklistView } from './components/ChecklistView'

function App() {
  const [checklists, setChecklists] = useLocalStorageState<Checklist[]>('checklist-app:v1', [])
  const [selectedChecklistId, setSelectedChecklistId] = useState<string | null>(() =>
    checklists[0]?.id ?? null,
  )

  useEffect(() => {
    if (checklists.length === 0) {
      if (selectedChecklistId !== null) setSelectedChecklistId(null)
      return
    }
    if (selectedChecklistId === null) {
      setSelectedChecklistId(checklists[0]!.id)
      return
    }
    const exists = checklists.some((c) => c.id === selectedChecklistId)
    if (!exists) setSelectedChecklistId(checklists[0]!.id)
  }, [checklists, selectedChecklistId])

  const selectedChecklist = useMemo(
    () => checklists.find((c) => c.id === selectedChecklistId) ?? null,
    [checklists, selectedChecklistId],
  )

  function createChecklist(name: string, color: string) {
    const trimmed = name.trim()
    if (!trimmed) return

    const checklist: Checklist = {
      id: newId(),
      name: trimmed,
      color,
      createdAt: Date.now(),
      items: [],
    }

    setChecklists((prev) => [checklist, ...prev])
    setSelectedChecklistId(checklist.id)
  }

  function deleteChecklist(id: string) {
    setChecklists((prev) => prev.filter((c) => c.id !== id))
  }

  function renameChecklist(checklistId: string, name: string) {
    const trimmed = name.trim()
    if (!trimmed) return

    setChecklists((prev) => prev.map((c) => (c.id === checklistId ? { ...c, name: trimmed } : c)))
  }

  function addItem(checklistId: string, text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const item: ChecklistItem = {
      id: newId(),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    }

    setChecklists((prev) =>
      prev.map((c) => (c.id === checklistId ? { ...c, items: [item, ...c.items] } : c)),
    )
  }

  function toggleItem(checklistId: string, itemId: string) {
    setChecklists((prev) =>
      prev.map((c) => {
        if (c.id !== checklistId) return c
        return {
          ...c,
          items: c.items.map((it) => (it.id === itemId ? { ...it, done: !it.done } : it)),
        }
      }),
    )
  }

  function deleteItem(checklistId: string, itemId: string) {
    setChecklists((prev) =>
      prev.map((c) => {
        if (c.id !== checklistId) return c
        return { ...c, items: c.items.filter((it) => it.id !== itemId) }
      }),
    )
  }

  function renameItem(checklistId: string, itemId: string, text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    setChecklists((prev) =>
      prev.map((c) => {
        if (c.id !== checklistId) return c
        return {
          ...c,
          items: c.items.map((it) => (it.id === itemId ? { ...it, text: trimmed } : it)),
        }
      }),
    )
  }

  return (
    <div className="appShell">
      <Sidebar
        checklists={checklists}
        selectedChecklistId={selectedChecklistId}
        onSelectChecklist={setSelectedChecklistId}
        onCreateChecklist={createChecklist}
        onDeleteChecklist={deleteChecklist}
      />

      <main className="mainPanel">
        {selectedChecklist ? (
          <ChecklistView
            checklist={selectedChecklist}
            onRenameChecklist={(name) => renameChecklist(selectedChecklist.id, name)}
            onAddItem={(text) => addItem(selectedChecklist.id, text)}
            onToggleItem={(itemId) => toggleItem(selectedChecklist.id, itemId)}
            onRenameItem={(itemId, text) => renameItem(selectedChecklist.id, itemId, text)}
            onDeleteItem={(itemId) => deleteItem(selectedChecklist.id, itemId)}
          />
        ) : (
          <div className="emptyState">
            <h2>Sin checklist seleccionada</h2>
            <p>Crea una checklist desde el panel izquierdo para empezar.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
