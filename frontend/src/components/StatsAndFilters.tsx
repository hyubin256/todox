import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

interface StatsAndFiltersProps {
  completedTaskCount: number;
  activeTaskCount: number;
  filter: string;
  setFilter: (filter: string) => void;
}

export default function StatsAndFilters({
  completedTaskCount,
  activeTaskCount,
  filter,
  setFilter
}: StatsAndFiltersProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        {/* Phần thống kê */}
        <Badge variant="secondary" className="bg-white/50 text-accent-foreground border-info/2">
          {activeTaskCount} {FilterType.active}
        </Badge>

        <Badge variant="secondary" className="bg-white/50 text-success border-success/2">
          {completedTaskCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Phần filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {
          Object.keys(FilterType).map((type) => {

            return (
              <Button
                key={type}
                variant={filter === type ? "gradient" : "ghost"}
                className="capitalize"
                size="sm"
                onClick={() => setFilter(type)}
              >
                <Filter className="size-4" />
                {FilterType[type as keyof typeof FilterType]}
              </Button>
            )
          })
        }
      </div>
    </div>
  )
}