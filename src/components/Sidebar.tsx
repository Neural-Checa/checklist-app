import { useMemo, useState } from 'react'
import type { Checklist } from '../types'

const DEFAULT_COLORS = ['#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626', '#0f766e', '#db2777']

export function Sidebar(props: {
  checklists: Checklist[]
  selectedChecklistId: string | null
  onSelectChecklist: (id: string) => void
  onCreateChecklist: (name: string, color: string) => void
  onDeleteChecklist: (id: string) => void
}) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(() => DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)]!)

  const selectedId = props.selectedChecklistId
  const title = useMemo(() => {
    if (props.checklists.length === 0) return 'Mis checklists'
    return `Mis checklists (${props.checklists.length})`
  }, [props.checklists.length])

  function submit() {
    props.onCreateChecklist(name, color)
    setName('')
  }

  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarTitle">{title}</div>
      </div>

      <div className="createCard">
        <label className="label">
          Nombre
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Compras"
            maxLength={48}
          />
        </label>

        <div className="row">
          <label className="label compact">
            Color
            <input className="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </label>

          <button className="primary" onClick={submit} disabled={!name.trim()}>
            Crear
          </button>
        </div>
      </div>

      <div className="sidebarList" role="list">
        {props.checklists.length === 0 ? (
          <div className="hint">Crea tu primera checklist arriba.</div>
        ) : (
          props.checklists.map((c) => {
            const done = c.items.filter((i) => i.done).length
            const total = c.items.length
            const isSelected = c.id === selectedId

            return (
              <div key={c.id} className={`listRow ${isSelected ? 'selected' : ''}`} role="listitem">
                <button className="listRowMain" onClick={() => props.onSelectChecklist(c.id)}>
                  <span className="dot" style={{ background: c.color }} />
                  <span className="listRowText">
                    <span className="listRowName">{c.name}</span>
                    <span className="listRowMeta">
                      {done}/{total} completadas
                    </span>
                  </span>
                </button>

                <button
                  className="ghostDanger"
                  title="Eliminar checklist"
                  onClick={() => {
                    const ok = confirm(`¿Eliminar la checklist "${c.name}"? (Se borrarán sus checks)`)
                    if (ok) props.onDeleteChecklist(c.id)
                  }}
                >
                  Eliminar
                </button>
              </div>
            )
          })
        )}
      </div>
    </aside>
  )
}

