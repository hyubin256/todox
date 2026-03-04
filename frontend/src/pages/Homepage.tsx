import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import type { Task } from "@/lib/types";
import { visibleTaskLimit } from "@/lib/data";

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState<Task[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [filter, setFilter] = useState<string>("all");
  const [dateQuery, setDateQuery] = useState<string | null>("all");
  const [page, setPage] = useState(1);

  const fetchTask = async () => {
    try {
      const response = await api.get("/tasks", {
        params: {
          filter: dateQuery
        }
      });
      setTaskBuffer(response.data.tasks);
      setActiveCount(response.data.activeCount);
      setCompletedCount(response.data.completedCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  }

  useEffect(() => {
    fetchTask();
  }, [dateQuery])

  const handleTaskChanged = () => {
    fetchTask();
  }



  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }

  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  })

  const visibleTasks = filteredTask.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit);

  const totalPages = Math.ceil(filteredTask.length / visibleTaskLimit);
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Amber Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 space-y-6 mx-auto">
          <Header />

          <AddTask handleTaskChanged={handleTaskChanged} />

          <StatsAndFilters filter={filter} completedTaskCount={completedCount} activeTaskCount={activeCount} setFilter={setFilter} />

          <TaskList filteredTask={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged} />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer completedTaskCount={completedCount} activeTaskCount={activeCount} />

        </div>
      </div>
    </div>
  )
}

export default Homepage