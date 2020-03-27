import React from 'react'
import Header from '../../../../Header'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Button, ListItemIcon, Box } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// icon
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditLocation from '@material-ui/icons/EditLocation';
// My component
import SelectInput from '../../../../MyComponents/SelectInput'
import InputComponent from '../../../../MyComponents/InputComponent'
import FormComponent from '../../../../MyComponents/FormComponent'
const hostpath =  process.env.REACT_APP_API_HOST ||'http://192.168.3.111:8080'
const useStyles = makeStyles(theme => ({
    root:{
        marginTop:"1%",
        margin:"3%",
        alignItems:"center",
        padding:theme.spacing(3),
        direction:"row",
    },
    bgroot:{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      }
}))

export default function UpdateCustomer(){
    const classes = useStyles()
    const [state, setState] = React.useState({
      
    })
    const [search, setSearch] = React.useState({})
    const [validate , setValidate] = React.useState({
        CardCode:{
            error:false,
            mess:''
        },
        CardName:{
            error:false,
            mess:''
        },
        Phone1:{
            error:false,
            mess:''
        },
        LicTradNum :{
            error:false,
            mess:''
        },
        Address :{
            error:false,
            mess:''
        },
    })
    function handleSearch(event){
        event.preventDefault()
        axios({
            method:'GET',
            url:`${hostpath}/api/masterdata-customer/search-customer`,
            headers:{
                'Content-Type':'application/json',
                'auth-hbg':localStorage.getItem('authen-hbg').toString()
              },
              params: {
                cardcode: search.cardcodesearch
              },
            responseType:'json'
        }).then(res => {
            const data = res.data[0]
            for(var i in data){
               if(data[i] === null)
               data[i] = ''
            }
            setState({
                ...data
            })
        }).catch( e => {
            if(e){
                if(e.response.data.err == "fail")
                {
                    alert("Hết phiên làm việc đăng nhập lại !")
                    localStorage.removeItem('authen-hbg')
                    window.location.href = '/'
                }   
            }
           
        })
    }
    function onChangeSearch(event){
        event.preventDefault()
        setSearch({
            cardcodesearch:event.target.value
        })
    }
    function handleChange(event){
        const name = event.target.name
        const value = event.target.value
        setState({
            ...state,
            [name]:value
        })
    }
    function handleSubmit(event){
        event.preventDefault() 
        const check = validateForm()
        // nếu true -> submit form else return false
        if(check){
            console.log('submited')
        }
        else return
    }
    // Push state vào 1 mảng giá trị -> lấy mảng đó gáng vào 1 mảng khác rồi push lên state ??? REALLY ???
    function validateForm(){
        var check = []
        for(var i in state){
            if(i === 'Phone1'){
                check.push({[i]:checkPhone(state[i])})
            }else{
                check.push({[i]:required(state[i])})
            }
        }
        const xl = []
        check.map(i => {
             for(var s in i)
             xl[s] = i[s]
         })
         setValidate({
            ...validate,
           ...xl
        })
        var kiemtra = false
        for(var s in validate){
            if(validate[s] !== true)
                {   
                    kiemtra = false
                    break;
                }
            else kiemtra = true
        }
        
        if(kiemtra)
        return true
        else return false
    }
    function checkPhone(value){
        const regexp = /^0[1-9][0-9]{8,9}$/
        const checkresult = regexp.exec(value)
        if(checkresult !== null){
            return true
        }else return {
            error:true,
            mess:"Số điện thoại không hợp lệ "
        }
        
    }
   function required(value){
       if(value === '')
       {
           return {
               error:true,
               mess:'Không được bỏ trống'
           }
       }
       return true
   }
    
    const input = {
        CardCode:{
            onChange:handleChange,
            name:'CardCode',
            value:state.CardCode,
            label:"Mã KH(ERP)",
            icon: <VpnKeyIcon  color="primary"/>,
            validate:validate.CardCode
        },
        LicTradNum:{
            onChange:handleChange,
            name:'LicTradNum',
            value:state.LicTradNum,
            label:"Mã Số Thuế",
            icon: <AccountBalanceIcon  color="primary"/>,
            validate:validate.LicTradNum
        },
        CardName:{
            onChange:handleChange,
            name:'CardName',
            value:state.CardName,
            label:"Tên khách hàng",
            icon: <AccountCircleIcon  color="primary"/>,
            validate:validate.CardName
        },
        Phone1:{
            onChange:handleChange,
            name:'Phone1',
            value:state.Phone1,
            label:"Số điện thoại",
            icon: <PhoneIphoneIcon  color="primary"/>,
            validate:validate.Phone1
        },
        Address:{
            onChange:handleChange,
            name:'Address',
            value:state.Address,
            label:"Địa chỉ",
            icon: <EditLocation  color="primary"/>,
            validate:validate.Address
        },
        // Select:{
        //     onChange:handleChange,
        //     onBlur:handleLost,
        //     name:'Test',
        //     value:state.Select,
        //     icon:<SearchIcon color="primary"/>,
        //     label:"TEST THÔI",
        //     listvalue:[
        //         {val:'0',text:'Company'},
        //         {val:'1',text:"Private"},
        //     ]
        // }
    }
    const form = {
        handleSubmit:handleSubmit,
        onBlur:validateForm,
        title:"Form chỉnh sửa mã khách hàng",
        components:[
            // {Component:<SelectInput {...input.Select} />},
            {Component: <InputComponent {...input.CardCode} />},
            {Component: <InputComponent {...input.CardName} />},
            {Component: <InputComponent {...input.LicTradNum} />},
            {Component: <InputComponent {...input.Phone1} />},
            {Component: <InputComponent {...input.Address} />},
        ]
    }
    return(
        <div>
            <Header />
            <Box  >
            <Paper elevation={3} className={classes.root} >
            <Grid item xs={12} md={3} sm={3} >
                <Paper component="form" onSubmit={handleSearch}>
                        <InputBase
                            className={classes.input}
                            placeholder="Tìm kiếm mã khách hàng"
                            inputProps={{ 'aria-label': 'Tìm kiếm mã khách hàng','helperText':'test','error':'true' }}
                            name="cardcodesearch"
                            value={search.cardcodesearch || ''}
                            onChange={onChangeSearch}
                            inputComponent="input"
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                       
                        </Paper>
                </Grid>
                <Grid container>
                    <Grid item xs={12} spacing={3} className={classes.root}>
                          {/* Form submit */}
                        <FormComponent {...form} />
                          
                    </Grid>
                </Grid>
            </Paper>
            </Box>
            
        </div>
    )
}