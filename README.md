## Архітектура

App
│
└── TodoList (state: [todos])
    │
    ├── AddTodoForm
    │     ↑ onAddTodo(newTask)
    │
    └── TodoItem (state: isCompleted, props: task, onDelete)
          │   [Checkbox] → toggle completed (local state)
          │   [Delete Button] ↑ onDelete(id)

## State colocation
`TodoList` зберігає список завдань (`[todos]`).
`TodoItem` зберігає власний стан `isCompleted`.

## Acceptance Criteria
- Додавання нового завдання.
- Позначення завдання як виконаного.
- Виконані завдання відображаються перекресленими.
- Видалення завдань.
- Стан розташований у потрібних компонентах.
- У `App` немає стану — тільки композиція.
- Передача даних: props (вниз) + callbacks (вгору).
