import { useState } from "react";

const defFilters = {
  status: true,
  action: true,
  agenda: true,
  stage1: true,
  stage2: true,
  secret: true,
  main: true,
  pok: true,
  omega: true,
};

export const useFilter = (initialFilters) => {
  const [filters, setFilters] = useState({ ...defFilters, ...initialFilters });

  const handler = (name) => {
    setFilters(
      (filters) => ({
        ...filters,
        [name]: !filters[name],
      }),
      []
    );
  };
  return [filters, handler];
};
