import { IoAccessibilityOutline, IoHeartOutline, IoInformationCircleSharp, IoListOutline, IoLockClosedOutline, IoPawOutline } from 'react-icons/io5';
import { RequestInfo, WhiteCard } from '../../components';
import { useAuthStore, useBearStore, usePersonStore, useTaskStore } from '../../stores';

export const Dashboard = () => {
  // const totalBears = useBearStore((state) => state.computed.totalBears);
  const totalBears = useBearStore((state) => state.totalBears);
  const firstName = usePersonStore((state) => state.firstName);
  const lastName = usePersonStore((state) => state.lastName);
  const tasks = useTaskStore((state) => state.tasks);
  const user = useAuthStore((state) => state.user);

  const totalTasks = Object.keys(tasks).length;

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <WhiteCard centered>
          <IoPawOutline size={50} className="text-indigo-600" />
          <h2>Osos</h2>
          <p>Total de osos: {totalBears()}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoAccessibilityOutline size={50} className="text-indigo-600" />
          <h2>Persona</h2>
          <p>
            Nombre y apellido: {firstName} {lastName}
          </p>
        </WhiteCard>

        <WhiteCard centered>
          <IoListOutline size={50} className="text-indigo-600" />
          <h2>Tareas</h2>
          <p>Total de tareas: {totalTasks}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoHeartOutline size={50} className="text-indigo-600" />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoLockClosedOutline size={50} className="text-indigo-600" />
          <h2>Auth</h2>
          <p>{user?.fullName || 'No user'}</p>
        </WhiteCard>

        <WhiteCard centered className="col-span-3">
          <IoInformationCircleSharp size={50} className="text-indigo-600" />
          <RequestInfo />
        </WhiteCard>
      </div>
    </>
  );
};
