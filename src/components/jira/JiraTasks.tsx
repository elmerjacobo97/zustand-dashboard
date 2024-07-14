import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import { useTaskStore } from '../../stores';
import classNames from 'classnames';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  const draggingTaskId = useTaskStore((state) => state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addNewTask = useTaskStore((state) => state.addNewTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddNewTask = async () => {
    const { value: title, isConfirmed } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputPlaceholder: 'Escribe el título de la tarea',
      inputAttributes: {
        autocapitalize: 'off',
      },
      inputAutoTrim: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El campo no puede estar vacío';
        }
        return null;
      },
    });

    if (!isConfirmed || !title) {
      return;
    }

    addNewTask(title, status);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        '!text-black relative border-4 flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px]',
        { 'border-indigo-700 border-dotted': draggingTaskId, 'border-green-500 border-dotted': onDragOver && draggingTaskId }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center bg-indigo-100 rounded-full h-9 w-9">
            <span className="flex items-center justify-center w-6 h-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddNewTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="w-full h-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
