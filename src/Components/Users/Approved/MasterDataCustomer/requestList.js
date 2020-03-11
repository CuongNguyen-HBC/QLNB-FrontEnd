import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Header from '../../../../Header'
import { Container, Box,Typography,Grid } from '@material-ui/core';
import axios from 'axios';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };



const hostpath =  process.env.REACT_APP_API_HOST ||'http://192.168.3.111:8080'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [state, setState] = React.useState(getRequestList,{
    
  })
  async function getRequestList(){
    const data = await axios({
         method:'get',
         headers:{
             'Content-Type':'application/json',
             'auth-hbg':localStorage.getItem('authen-hbg').toString()
           },
         url:`${hostpath}/api/masterdata-customer/list-request`,
         responseType:'json'
     }).then(res => {
      let rows = [];
      res.data.forEach(el => {
        const date = new Date(el.Created_at)
        const created_at = `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`
          rows.push({ CardCode:el.CardCode,CardName:el.CardName,Name:el.Name,FederalTaxID:el.FederalTaxID,Phone1:el.Phone1,Status:el.Status == 1 ? <Typography color="primary">Đã duyệt</Typography> : el.Status == 0 ? 'Đang tạo ...' : <Typography color="error"> Thất bại </Typography>,Created_at:created_at })
      });
      setState({
        data:rows
      })
     })
     
 }

 
  return (
      <div> 
          <Header />
          <Grid Container xs={12} xs={12}>
              <Grid item >
              <Paper elevation={3}>
               </Paper>
              </Grid>
              <Grid item>
              <MaterialTable
                title="Tạo mã khách hàng"
                icons={tableIcons}
                columns={ [
                  { title: 'Mã KH(ERP)', field: 'CardCode', },
                  { title: 'Tên khách hàng', field: 'CardName' },
                  { title:'Mã số thuế', field:'FederalTaxID' },
                  { title:'Ngày yêu cầu', field:'Created_at' },
                  { title:'Trạng thái', field:'Status' },
                ]}
                data={state.data} />
              </Grid>
          </Grid>
               
          
         
           
    </div>
  );
}