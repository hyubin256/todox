export const FilterType = {
  all: "all",
  active: "Đang Làm",
  completed: "Hoàn Thành",
}

export const options = [
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "week",
    label: "Tuần này",
  },
  {
    value: "month",
    label: "Tháng này",
  },
  {
    value: "all",
    label: "Tất cả",
  },
]

export type optionItem = typeof options[number];

export const visibleTaskLimit = 5;