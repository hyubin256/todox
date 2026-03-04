import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CheckCircle2, Circle, Calendar, SquarePen, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { Task } from "@/lib/types";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  index: number;
  handleTaskChanged: () => void;
}

export default function TaskCard({ task, index, handleTaskChanged }: TaskCardProps) {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title);

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success(`${task.title} đã được xóa thành công`);
      handleTaskChanged();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  }

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`,
        { title: updateTaskTitle });
      toast.success(`Đã được cập nhật thành ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  }

  const toggleTaskStatus = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date(),
        });
        toast.success(`Đã cập nhật trạng thái của ${task.title}`);
        handleTaskChanged();
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`Đã cập nhật trạng thái của ${task.title}`);
        handleTaskChanged();
      }
    } catch (error) {
      console.error("Error toggling task status:", error);
      toast.error("Failed to toggle task status");
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTask();
    }
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={
            cn('shrink-0 size-8 rounde-full transition-all duration-200',
              task.status === "completed"
                ? "text-success hover:text-success/80"
                : "text-muted-foreground hover:text-primary"
            )
          }
          onClick={toggleTaskStatus}
        >
          {
            task.status === "completed"
              ? <CheckCircle2 className="size-5" />
              : <Circle className="size-5" />
          }
        </Button>

        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần phải làm gì"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => setIsEditting(false)}
            />
          ) : (
            <p
              className={cn("text-base transition-all duration-200",
                task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground")}
            >
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{new Date(task.createdAt).toLocaleString()}</span>
            {task.completedAt &&
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{new Date(task.completedAt).toLocaleString()}</span>
              </>
            }
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8 text-muted-foreground transition-colors duration-200 hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* Nút delete */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8 text-muted-foreground transition-colors duration-200 hover:text-destructive"
            onClick={deleteTask}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

      </div>
    </Card>
  )
}