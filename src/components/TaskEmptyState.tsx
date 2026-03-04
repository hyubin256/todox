import { Circle } from "lucide-react"
import { Card } from "./ui/card"

export default function TaskEmptyState({ filter }: { filter: string }) {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div className="">
          <h3 className="text-foreground font-semibold">
            {
              filter === "active" ? "No active tasks"
                : filter === "completed" ? "No completed tasks"
                  : "No tasks"
            }
          </h3>
          <p className="text-sm text-muted-foreground">
            {
              filter === "all"
                ? "Thêm nhiệm vụ đầu tiên vào để bắt đầu"
                : `Chuyển sang "Tất cả" để xem tất cả nhiệm vụ ${filter === "active" ? "đang hoạt động" : "đã hoàn thành"}`
            }
          </p>
        </div>
      </div>
    </Card>
  )
}