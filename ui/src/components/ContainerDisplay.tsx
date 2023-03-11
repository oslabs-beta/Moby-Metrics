import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows= [
  { id: 1, col1: 'running', col2: 'running' },
  { id: 2, col1: 'sha256:7c15e2e46a6083dc4fe192f2a0fe5f71e075047ad5f9ec5544ab7dddcaf21170', col2: 'sha256:efc39595e2f3b48bfe5eac8e282b1f070cd93fa1c9372af6a198b37d54676a8c' },
  { id: 3, col1: '172.17.0.3', col2: '172.17.0.2' },
];

const columns = [
  { field: 'col1', headerName: 'diamol/ch06-todo-list', width: 150 },
  { field: 'col2', headerName: 'diamol/ch06-todo-list:v2', width: 150 },
];


function ContainerDisplay(){
return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default ContainerDisplay
