import { Card } from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import axios from "axios";
import { toast } from "sonner";

export default function AddTask({ handleTaskChanged }: { handleTaskChanged: () => void }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await axios.post("http://localhost:5001/api/tasks", {
          title: newTaskTitle,
        });
        toast.success(`${newTaskTitle} đã được thêm thành công`);
        setNewTaskTitle("");
        handleTaskChanged();
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task");
      }
    } else {
      toast.error("Please enter a task title");
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  }

  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex items-center gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="what do you need to do"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="h-12 bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/50"
          />
          <Button variant="gradient" size="xl" className="px-6" onClick={addTask} disabled={!newTaskTitle.trim()}>
            <Plus className="size-5" />Add Task
          </Button>
        </div>
      </Card>
    </div>
  )
}