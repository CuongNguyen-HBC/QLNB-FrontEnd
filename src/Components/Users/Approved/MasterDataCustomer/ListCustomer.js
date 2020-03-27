import React from 'react';
import Header from '../../../../Header'
import Grid from '@material-ui/core/Grid'
import TableComponent from '../../../../MyComponents/TableComponent'
import Typography from '@material-ui/core/Typography'
import axios from 'axios';
const hostpath =  process.env.REACT_APP_API_HOST ||'http://192.168.3.111:8080'

export default function ListMasterDataCustomer(){
    const [rows , setRows] = React.useState(getCustomerList)
    const [state , setState] = React.useState({
        title:"Danh sách khách hàng",
        columns:[
            { title: 'Mã KH(ERP)', field: 'CardCode', },
            { title: 'Tên khách hàng', field: 'CardName' },
            { title:'Mã số thuế', field:'FederalTaxID' },
          ]
    })
    async function getCustomerList(){
        await axios({
            method:'get',
            headers:{
                'Content-Type':'application/json',
                'auth-hbg':localStorage.getItem('authen-hbg').toString()
              },
            url:`${hostpath}/api/masterdata-customer/list-customer`,
            responseType:'json'
        }).then(res => {
                let rows = [];
                res.data.forEach(el => {
                    rows.push({CardCode:el.CardCode,CardName:el.CardName,FederalTaxID:el.LicTradNum })
                });
                console.log({
                    ...props
                })
                setRows({
                  data:rows
                })
                return {rows:rows}
        }).catch(e =>{
            if(e.response.data.err == "fail"){
                localStorage.removeItem('authen-hbg')
            }
            
        })
        }
        
        const props = state
    return(
       <React.Fragment>
            <Header />
             <Grid container>
                 <Grid item xs={12}>
                     <TableComponent {...props} 
                     data={rows.data}
                     />
                 </Grid>
                 
             </Grid>
       </React.Fragment>
    )
}