import { useMemo, useState } from 'react'
import type { Checklist } from '../types'

export function ChecklistView(props: {
  checklist: Checklist
  onAddItem: (text: string) => void
  onToggleItem: (itemId: string) => void
  onDeleteItem: (itemId: string) => void
}) {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const done = props.checklist.items.filter((i) => i.done).length
    const total = props.checklist.items.length
    return { done, total }
  }, [props.checklist.items])

  function submit() {
    props.onAddItem(text)
    setText('')
  }

  return (
    <div className="checklistView">
      <header className="checklistHeader">
        <div className="checklistHeaderTitle">
          <span className="dot big" style={{ background: props.checklist.color }} />
          <div>
            <div className="h1">{props.checklist.name}</div>
            <div className="sub">
              {stats.done}/{stats.total} completadas
            </div>
          </div>
        </div>
      </header>

      <section className="addItemCard">
        <label className="label">
          Nuevo check
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ej: Comprar leche"
            maxLength={140}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
          />
        </label>

        <div className="row">
          <button className="primary" onClick={submit} disabled={!text.trim()}>
            Agregar
          </button>
        </div>
      </section>

      <section className="items">
        {props.checklist.items.length === 0 ? (
          <div className="hint">Aún no hay checks. Agrega el primero arriba.</div>
        ) : (
          props.checklist.items.map((it) => (
            <div key={it.id} className={`itemRow ${it.done ? 'done' : ''}`}>
              <label className="itemMain">
                <input
                  type="checkbox"
                  checked={it.done}
                  onChange={() => props.onToggleItem(it.id)}
                  aria-label={it.done ? 'Marcar como pendiente' : 'Marcar como cumplido'}
                />
                <span className="itemText">{it.text}</span>
              </label>

              <button
                className="ghost"
                title="Eliminar check"
                onClick={() => {
                  const ok = confirm('¿Eliminar este check?')
                  if (ok) props.onDeleteItem(it.id)
                }}
              >
                Borrar
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

