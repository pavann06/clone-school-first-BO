import { useState, useCallback } from 'react';

export function useTable() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('order_date');
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    order_by: '-order_date',
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
  };

  const onSort = useCallback(
    (property) => {
      console.log(property);
      if (property !== 'S_No' && property !== 'actions') {
        // Exclude 'S_No' and 'actions' columns from sorting
        handleRequestSort(property);
        setFilters({
          ...filters,
          order_by: `${order === 'desc' ? '-' : ''}${property}`,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, filters]
  );

  return {
    order,
    orderBy,
    onSort,
    filters,
    setFilters,
    // other properties and methods...
  };
}
