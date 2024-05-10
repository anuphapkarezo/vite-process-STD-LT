import React, { useState, useEffect , useRef } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './styles/Process_STD_Leasdtime_Master.css'; // Import the CSS file
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Navbar from "../components/navbar/Navbar";

export default function Product_Routing_No_STD_LT({ onSearch }) {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [distinctProdRoutNoSTD_LT, setDistinctProdRoutNoSTD_LT] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const handleNavbarToggle = (openStatus) => {
    setIsNavbarOpen(openStatus);
  };

  const fetchDataProdRoutNoSTD_LT = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3003/api/smart_ora/filter-prod-rout-no-std-lt`);

      const data = await response.data;
      const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index, // You can use a better unique identifier here if available
      }));
      setDistinctProdRoutNoSTD_LT(rowsWithId);
      console.log(distinctProdRoutNoSTD_LT);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data Master Process STD LT');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };


  const columns = [
    { field: 'RO_PRD_NAME', headerName: 'Product', width: 180 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'PRD_CATEGORY', headerName: 'Category', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'FACTORY_DESC', headerName: 'Factory', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'FAC_UNIT_DESC', headerName: 'Unit', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'PROC_DISP', headerName: 'Process', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'PROC_STD_LT', headerName: 'Std. LT', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center' , 
        renderCell: (params) => (
          <div style={{ color: params.row.PROC_STD_LT > 0 ? "green" : "red" , fontWeight: "bold"}}>
              {params.value}
          </div>
        )
    },
    { field: 'ITEM_TYPE', headerName: 'Item', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'COUNT_LOT', headerName: 'WIP', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center' ,
        renderCell: (params) => (
          <div style={{ color: params.row.COUNT_LOT > 0 ? "red" : "green" , fontWeight: "bold"}}>
              {params.value}
          </div>
        )
    },
  ]

  useEffect(() => {
    fetchDataProdRoutNoSTD_LT();
  }, []);

  return (
    <>
        <Navbar onToggle={handleNavbarToggle}/>
        <Box marginLeft={isNavbarOpen ? "220px" : 4} marginTop={12}>
            <div className="w-screen ml-16" 
                  style={{width:985 , height: 800 , backgroundColor: '#EEF7FF' , border: '1px solid #A0DEFF'}}>
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', zIndex: 1}}>
                    <CircularProgress /> {/* Display a loading spinner while data is being fetched */}
                </div>
                // <CircularProgress /> // Display a loading spinner while data is being fetched
                  ) : (
                    <DataGrid
                      columns={columns}
                      // disableColumnFilter
                      // disableDensitySelector
                      rows={distinctProdRoutNoSTD_LT}
                      slots={{ toolbar: GridToolbar }}
                      filterModel={filterModel}
                      onFilterModelChange={(newModel) => setFilterModel(newModel)}
                      slotProps={{ toolbar: { showQuickFilter: true } }}
                      columnVisibilityModel={columnVisibilityModel}
                      // checkboxSelection
                      onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibilityModel(newModel)
                      }
                    />
                  )}
            </div>
        </Box>
    </>
  );
}
