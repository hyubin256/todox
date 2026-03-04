
import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { options } from "@/lib/data";

interface DateTimeFilterProps {
  dateQuery: string | null;
  setDateQuery: (dateQuery: string) => void;
}

export default function DateTimeFilter({ dateQuery, setDateQuery }: DateTimeFilterProps) {
  const selectedOption = options.find((opt) => opt.value === (dateQuery || "all")) || options[3];

  return (
    <Combobox
      items={options}
      itemToStringValue={(item: { label: string; value: string } | null) => item?.label ?? ""}
      value={selectedOption}
      onValueChange={(val) => {
        if (val) {
          setDateQuery(val.value);
        }
      }}
    >
      <ComboboxInput placeholder="Chọn thời gian" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}