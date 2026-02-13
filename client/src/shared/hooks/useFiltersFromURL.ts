import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useFiltersFromURL() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Ініціалізація фільтрів зі всіх параметрів URL
  useEffect(() => {
    const initial: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      initial[key] = value;
    });
    setFilters(initial);
  }, [searchParams]);

  // Функція для оновлення одного фільтра
  const setFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };

    // видаляємо пусті значення
    Object.keys(newFilters).forEach(
      (k) => !newFilters[k] && delete newFilters[k],
    );

    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  return { filters, setFilter };
}
