export const parseFilter = (rawFilter) => {
  if (rawFilter === undefined || rawFilter === null) {
    return rawFilter;
  }

  let filterStr;
  if (typeof rawFilter === "string") {
    filterStr = rawFilter.replace(/['"]/g, "").trim();
  } else if (typeof rawFilter === "object" && rawFilter.value) {
    filterStr = rawFilter.value;
  } else if (typeof rawFilter === "object" && rawFilter.label) {
    filterStr = String(rawFilter.label).toLowerCase();
  } else {
    filterStr = String(rawFilter);
  }

  return filterStr;
};
