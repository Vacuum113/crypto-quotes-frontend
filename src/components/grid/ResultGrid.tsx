import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowData } from "@material-ui/data-grid";
import api from "../../dataProvider/api";
import { ParamType } from "../../enums";

const ResultGrid = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<GridRowData[]>([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    (async () => {
        setLoading(true);

        const resultData = await api.LoadQuotes((page * 10), (page * 10 + 10));
        if (resultData) {
          setRows(resultData.data);
          setRowCount(resultData.total);
        }
        setLoading(false);
    })();
  }, [page]);

  if (columns === null) {
    return (<div></div>);
}
  
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        rowCount={rowCount}
        pagination
        disableSelectionOnClick
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default ResultGrid;
