import { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  GridOptions,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { PlanningData } from "../types";

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const stores = ["Store 1", "Store 2"];
const skus = ["SKU 1", "SKU 2"];
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

const PlanningPage: React.FC = () => {
  // Generate cross join of Stores and SKUs
  const initialData = stores.flatMap((store) =>
    skus.map((sku) => ({
      store,
      sku,
      salesUnits: 0,
      price: Math.floor(Math.random() * 100) + 50, // Random price
      cost: Math.floor(Math.random() * 50) + 20, // Random cost
    }))
  );

  const [rowData, setRowData] = useState<PlanningData[]>(initialData);

  // Column Definitions
  const columnDefs = useMemo(() => {
    let baseCols = [
      { field: "store", headerName: "🏪 Store", rowGroup: true },
      { field: "sku", headerName: "📦 SKU", rowGroup: true },
    ];

    let weekCols = weeks.map((week) => ({
      headerName: `📅 ${week}`,
      children: [
        {
          field: `salesUnits_${week}`,
          headerName: "📊 Sales Units",
          editable: true,
          type: "numericColumn",
          valueSetter: (params: any) => {
            if (!isNaN(params.newValue)) {
              params.data[`salesUnits_${week}`] = params.newValue;
              return true;
            }
            return false;
          },
        },
        {
          field: `salesDollars_${week}`,
          headerName: "💰 Sales ₹",
          valueGetter: (params: any) =>
            (params.data[`salesUnits_${week}`] || 0) * params.data.price,
          valueFormatter: (params: any) => `₹${params.value.toFixed(2)}`,
        },
        {
          field: `gmDollars_${week}`,
          headerName: "📈 GM ₹",
          valueGetter: (params: any) =>
            (params.data[`salesUnits_${week}`] || 0) *
            (params.data.price - params.data.cost),
          valueFormatter: (params: any) => `₹${params.value.toFixed(2)}`,
        },
        {
          field: `gmPercentage_${week}`,
          headerName: "📊 GM %",
          valueGetter: (params: any) => {
            let salesDollars =
              (params.data[`salesUnits_${week}`] || 0) * params.data.price;
            let gmDollars =
              (params.data[`salesUnits_${week}`] || 0) *
              (params.data.price - params.data.cost);
            return salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
          },
          valueFormatter: (params: any) => `${params.value.toFixed(2)}%`,
          cellStyle: (params: any) => {
            if (params.value >= 40) return { backgroundColor: "lightgreen" };
            if (params.value >= 10) return { backgroundColor: "yellow" };
            if (params.value >= 5) return { backgroundColor: "orange" };
            return { backgroundColor: "red", color: "white" };
          },
        },
      ],
    }));

    return [...baseCols, ...weekCols];
  }, []);

  // Grid Options
  const gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
    },
    groupDisplayType: "groupRows",
    pagination: true,
    paginationPageSize: 5,
  };
useEffect(()=>{
  if(false){
    setRowData([])
  }
},[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          📅 Planning Data (Stores & SKUs vs. Calendar)
        </h2>
        <div
  className="ag-theme-alpine rounded-lg overflow-hidden shadow-md"
  style={{ height: "500px", width: "100%", maxHeight: "500px", overflow: "none" }}
>
  <AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    gridOptions={{
      ...gridOptions,
      domLayout: "autoHeight",
      suppressHorizontalScroll: true, // Optional: Hide horizontal scroll
    }}
  />
</div>

      </div>
    </div>
  );
};

export default PlanningPage;
