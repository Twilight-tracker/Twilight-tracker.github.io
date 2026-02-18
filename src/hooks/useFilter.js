import { useState } from "react";

const data = {
  objectives: [
    [
      { name: "stage1", label: "Цели I этапа" },
      { name: "stage2", label: "Цели II этапа" },
      { name: "secret", label: "Секретные цели" },
    ],
    [
      { name: "status", label: "Фаза статуса" },
      { name: "action", label: "Фаза действий" },
      { name: "agenda", label: "Фаза политики" },
    ],
    [
      { name: "main", label: "Базовая игра" },
      { name: "pok", label: "Пророчество королей" },
      { name: "omega", label: "Омега-карты" },
    ],
  ],
  relics: [
    [
      { name: "pok", label: "Пророчество королей" },
      { name: "codex2", label: "Кодекс II" },
      { name: "codex4", label: "Кодекс IV" },
      { name: "te", label: "Thunder's Edge" },
    ],
  ],
};

const defFilters = {
  objectives: {
    status: true,
    action: true,
    agenda: true,
    stage1: true,
    stage2: true,
    secret: true,
    main: true,
    pok: true,
    omega: true,
  },
  relics: {
    pok: true,
    codex2: true,
    codex4: true,
    te: true
  },
};

const useFilter = ({ type, initialFilters }) => {
  const [filters, setFilters] = useState({
    ...defFilters[type],
    ...initialFilters,
  });

  const handler = (name) => {
    setFilters(
      (filters) => ({
        ...filters,
        [name]: !filters[name],
      }),
      []
    );
  };
  return [filters, handler, data[type]];
};

export const useObjectivesFilter = (initialFilters) =>
  useFilter({ type: "objectives", initialFilters });

export const useRelicsFilter = (initialFilters) =>
  useFilter({ type: "relics", initialFilters });
