import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
  const pendingTasks = useTaskStore((state) => state.getTypeByStatus('pending'));
  const inProgressTasks = useTaskStore((state) => state.getTypeByStatus('in-progress'));
  const doneTasks = useTaskStore((state) => state.getTypeByStatus('done'));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <JiraTasks title="Pendientes" status="pending" tasks={pendingTasks} />

        <JiraTasks title="Avanzando" status="in-progress" tasks={inProgressTasks} />

        <JiraTasks title="Terminadas" status="done" tasks={doneTasks} />
      </div>
    </>
  );
};
