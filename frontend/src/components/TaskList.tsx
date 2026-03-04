import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
import type { Task } from "@/lib/types";

interface TaskListProps {
  filteredTask: Task[];
  filter: string;
  handleTaskChanged: () => void;
}

export default function TaskList({ filteredTask, filter, handleTaskChanged }: TaskListProps) {

  if (!filteredTask || filteredTask.length === 0) {
    return <TaskEmptyState filter={filter} />
  }

  return (
    <div className="space-y-3">
      {
        filteredTask.map((task, index) => {
          return (
            <TaskCard key={task._id} task={task} index={index} handleTaskChanged={handleTaskChanged} />
          )
        })
      }
    </div>
  )
}