import React, { useState, useEffect , useRef } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './styles/Process_STD_Leasdtime_Master.css'; // Import the CSS file
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Navbar from "../components/navbar/Navbar";

export default function Process_STD_Leasdtime_Master({ onSearch }) {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [distinctProcSTDLeadtime, setDistinctProcSTDLeadtime] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const handleNavbarToggle = (openStatus) => {
    setIsNavbarOpen(openStatus);
  };

  const fetchDateProcSTD_LT = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3003/api/smart_ora/filter-proc-std-lt`);

      const data = await response.data;
      const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index, // You can use a better unique identifier here if available
      }));
      setDistinctProcSTDLeadtime(rowsWithId);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data Master Process STD LT');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };


  const columns = [
    { field: 'FACTORY_DESC', headerName: 'Factory', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'FAC_UNIT_DESC', headerName: 'Unit', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'PROC_DISP', headerName: 'Process', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'PRD_CATEGORY', headerName: 'Category', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'PROC_STD_LT', headerName: 'Std. LT', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'PROC_STD_LT_UNIT', headerName: 'Std. LT (Unit)', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'PROC_AVG_STD_LT', headerName: 'Avg. Std LT', width: 120 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
  ]

  useEffect(() => {
    fetchDateProcSTD_LT();
  }, []);

  return (
    <>
        <Navbar onToggle={handleNavbarToggle}/>
        <Box marginLeft={isNavbarOpen ? "220px" : 4} marginTop={12}>
            <div className="w-screen ml-16" 
                  style={{width:805 , height: 800 , backgroundColor: '#EEF7FF' , border: '1px solid #A0DEFF'}}>
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: 1}}>
                    <CircularProgress /> {/* Display a loading spinner while data is being fetched */}
                </div>
                // <CircularProgress /> // Display a loading spinner while data is being fetched
                  ) : (
                    <DataGrid
                      columns={columns}
                      // disableColumnFilter
                      // disableDensitySelector
                      rows={distinctProcSTDLeadtime}
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
