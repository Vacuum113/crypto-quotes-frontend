import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowData, GridSortModel } from "@material-ui/data-grid";
import api, { GridResult } from "../../dataProvider/api";

const ResultGrid = () => {
  const [rows, setRows] = useState<GridRowData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([{field: "marketCap", sort: "asc"}]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    (async () => {
        setLoading(true);
        console.log(sortModel);
        const fieldName = sortModel[0] ? sortModel[0].field.charAt(0).toUpperCase() + sortModel[0].field.slice(1) : undefined;
        const sort =  sortModel[0] ? sortModel[0].sort === "asc" ? 0 : 1 : undefined;
        const resultData = await api.loadQuotes((page * 10), (page * 10 + 10), fieldName, sort) as GridResult;
        if (resultData) {
          setRows(resultData.entities.map(e => ({logo: `https://s2.coinmarketcap.com/static/img/coins/32x32/${e.coinMarketCapId}.png`, ...e})));
          setRowCount(resultData.count);
        }
        setLoading(false);
    })();
  }, [page, sortModel]);
  
  return (
    <div style={{ height: "647px", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowCount={rowCount}
        pagination
        disableSelectionOnClick
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
        onSortModelChange={e => {console.log(e); setSortModel(e);}}
        sortModel={sortModel}
      />
    </div>
  );
};

const columns: GridColDef[] = [ 
  { field: "name", width: 250, headerName: "Название" }, 
  { field: "symbol", width: 130, headerName: "Символ" },
  { field: "price", width: 220, headerName: "Текущая цена в USD" },
  { 
    field: "logo", 
    width: 130, 
    headerName: "Логотип",
    renderCell: (params) => { 
      return (
        <img src={params.value as string}></img >
      );
    },
    sortable: false
  },
  { field: "percentChangeOneHour", width: 200, headerName: "Изменение за час" }, 
  { field: "percentChangeTwentyFourHours", width: 230, headerName: "Изменение за 24 часа" }, 
  { field: "marketCap", width: 230, headerName: "Капитализации в USD" }, 
  { 
    field: "lastUpdated", 
    width: 260, 
    headerName: "Время обновления данных", 
    valueFormatter: (params) => 
      new Intl.DateTimeFormat('ru', 
      { 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric", 
        minute: "2-digit", 
        hour: "2-digit", 
        hour12: false 
      }).format(new Date(params.value as string)) }, 
];

export default ResultGrid;
