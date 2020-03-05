import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Paper,Input,Container,CssBaseline, FormControl,InputLabel,Select,MenuItem, Box,createMuiTheme,ThemeProvider, Icon } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ListIcon from '@material-ui/icons/List';
import PaymentIcon from '@material-ui/icons/Payment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import SendIcon from '@material-ui/icons/Send';
import { green } from '@material-ui/core/colors';
import InputAdornment from '@material-ui/core/InputAdornment'
import PrintIcon from '@material-ui/icons/Print';
import PeopleIcon from '@material-ui/icons/People';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ErrorForm from './errorForm'
const theme = createMuiTheme({
  palette: {
    primary:green
  },
});
const hostpath = 'http://localhost'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
      marginTop:20
      
    },
    margin: {
      margin: theme.spacing(1),
    },
    header:{
      color:'red'
    },
    formControl: {
      margin: theme.spacing(1),
    },
    selectLabel:{
      marginBottom:theme.spacing(3)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    modal: {
      position: 'absolute',
      width:"95%",
      top:`30%`,
      left:`50%`,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonaction:{
      marginTop:5,
      marginBottom:5,
      float:'right'
    },
    inputlabel:{
      fontWeight:'bold'
    },
    cardview:{
      position:"fixed"
    }
  }));
  
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 // Hàm submit form gửi API đến server
export default function FormMasterDataCustomer(props){
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const [openAlert , setOpenAlert] = React.useState(false)
    const [lictradnum , setLicTradNum] = React.useState({
          LicTradNum :'',
          CardCode :'',
          CardName:'',
          Company:'',
          Button : true
    })
    const [state,setState] = React.useState({
      CardName          : '', 
      GroupCode         : '',   
      CmpPrivate        : '',     
      LicTradNum        : '',     
      Phone1            : '',    
      Phone2            : '',
      Tel1              : '',
      Tel2              : '',
      Fax               : '',
      GroupNum          : '',    
      CreditLine        : '',    
      StreetNo          : '',
      Street            : '',
      Block             : '',
      State             : '',
      City              : '',
      Country           : '',
      Name              : '',
      Address           : '',
    })
    const [vaildate , setValidate] = React.useState({
      isError:false,
      isMess:''
    })
    function validateForm(event){
      const input = event.target.name
      const value = event.target.value
      switch(input){
        case 'Phone1':
          const reg =   /^0[1-9][0-9]{8,9}$/;
          const checkResult = reg.exec(value)
          console.log(checkResult)
          if(checkResult == null)
          {
            setValidate({
              isError:true,
              isMess:"Phone 1 lỗi"
            })
            setLicTradNum({
              ...lictradnum,
              Button:false
            })
          }
          else{
            setValidate({
              isError:false,
              isMess:""
            })
            setLicTradNum({
              ...lictradnum,
              Button:true
            })
          }
        break;
      }
    }
    function handleChange(event){
      const value = event.target.value;
      const name = event.target.name
      setState({
        ...state,
        [name]: value
      });
      if(state.GroupCode == '03_Cust_Dự_Án' || state.GroupCode == '05_Cust_Xuất_Khẩu'){
        setState({
            ...state,
           [name]: value,
            GroupNum:'Theo hợp đồng',
            CreditLine:'Theo hợp đồng',
            CmpPrivate:'Tổ chức'
        })
      }
     }
    const handleCloseAlert = () => {
      setOpenAlert(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
   
    function submitCustomForm() {
      axios({
        method: 'post',
        url: `${hostpath}/api/masterdata-customer`,
        headers:{
          'Content-Type':'application/json',
          'auth-hbg':localStorage.getItem('authen-hbg').toString()
        },
        data:{
          formdata:state
        },
        responseType:'json'
      }).then((res)=>{
       
        if(res.data.mess){
          setOpenAlert(true)
        }else console.log('None')
      }).catch(e => {
        localStorage.removeItem('authen-hbg')
        window.location.reload()
      })
        // setState({
        //   CardName          : '', 
        //   GroupCode         : '',   
        //   CmpPrivate        : '',     
        //   LicTradNum        : '',     
        //   Phone1            : '',    
        //   Phone2            : '',
        //   Tel1              : '',
        //   Tel2              : '',
        //   Fax               : '',
        //   GroupNum          : '',    
        //   CreditLine        : '',    
        //   StreetNo          : '',
        //   Street            : '',
        //   Block             : '',
        //   State             : '',
        //   City              : '',
        //   Country           : '',
        //   Name              : '',
        //   Address           : '',
        // })
        
      handleClose()
    };

    function checkLicTradNum(event){
      const value = event.target.value
      axios({
        method: 'post',
        url: `${hostpath}/api/masterdata-customer/lictradnum`,
        headers:{
          'Content-Type':'application/json',
          'auth-hbg':localStorage.getItem('authen-hbg').toString()
        },
        data:{
          lictradnum:value
        },
        responseType:'json'
      }).then(res =>{
        if(res.data.length <= 0){
        setLicTradNum({
          ...lictradnum,
          Button:true
        })
      }
        else{
          res.data.map((i)=> {
            setLicTradNum({
              ...lictradnum,
              Button:false,
              LicTradNum:i.LicTradNum,
              CardCode:i.CardCode,
              CardName:i.CardName,
              Company:i.Company
            })
          })
        }
      })
    }
    
    return (
      <div className={classes.root}>
          <Grid container xs={12} md={12} spacing={3} >
            <Grid item xs={7}>
              <Paper elevation={3} >
                {/* Đầu Form Tạo mã khách hàng */}
                <form  method="post">
                  {/* Chia form */}
                  <ErrorForm 
                    isError={vaildate.isError}
                    isMess = {vaildate.isMess}
                  />
                 
                  <Grid container xs={12} spacing={3}>
                    {/* nhóm khách hàng */}
                  <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth spacing={1}>
                      <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>NHÓM KHÁCH HÀNG</InputLabel>
                      <Select
                      startAdornment={
                        <PeopleIcon color="primary"/>
                      }
                      name="GroupCode"
                      value={state.GroupCode}
                      onChange={handleChange}
                      required
                      fullWidth>
                        <MenuItem value="02_Cust_Đại_Lý">02_Cust_Đại_Lý</MenuItem>
                        <MenuItem value="03_Cust_Dự_Án">03_Cust_Dự_Án</MenuItem>
                        <MenuItem value="04_Cust_Lẻ">04_Cust_Lẻ</MenuItem>
                        <MenuItem value="05_Cust_Xuất_Khẩu">05_Cust_Xuất_Khẩu</MenuItem>
                     </Select>
                    </FormControl>
                    </Grid>
                    {/* Loại khách hàng */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth spacing={1}>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>LOẠI KHÁCH HÀNG</InputLabel>
                    <Select
                      id="input-with-icon-adornment"
                      startAdornment={
                          <ListIcon color="primary"/>
                      }
                      name="CmpPrivate"
                      value={state.CmpPrivate}
                      onChange={handleChange}
                      required
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value="Tổ chức">Tổ chức</MenuItem>
                        <MenuItem value="Cá nhân">Cá nhân</MenuItem>
                    </Select>
                  </FormControl>
                    </Grid>
                    {/* Mã số thuế */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>MÃ SỐ THUẾ</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <ImportContactsIcon color="primary"/>
                        </InputAdornment>
                      }
                      name="LicTradNum"
                      value = {state.LicTradNum}
                      onChange = {handleChange}
                      onBlur = {checkLicTradNum}
                      
                    />
                  </FormControl>
                    </Grid>
                        {/* Cửa hàng */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel} >CỬA HÀNG</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <LocalConvenienceStoreIcon color="primary" />
                        </InputAdornment>
                      }
                      name="CardName"
                      value = {state.CardName}
                      onChange = {handleChange}
                      required
                    />
                  </FormControl>
                    </Grid>
                    {/* Người đại diện */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>NGƯỜI ĐẠI DIỆN</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle  color="primary"/>
                        </InputAdornment>
                      }
                      name="Name"
                      value = {state.Name}
                      onChange = {handleChange}
                      required
                    />
                  </FormControl>
                    </Grid>
                    {/* Fax */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>FAX</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PrintIcon color="primary" />
                        </InputAdornment>
                      }
                      name="Fax"
                      value = {state.Fax}
                      onChange = {handleChange}
                    />
                  </FormControl>
                    </Grid>
                    {/* số điện thoại 1 */}
                    
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>SỐ ĐIỆN THOẠI 1</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneIphoneIcon color="primary"/>
                        </InputAdornment>
                      }
                      name="Phone1"
                      value = {state.Phone1}
                      onChange = {handleChange}
                      onBlur={validateForm}
                    />
                  </FormControl>
                    </Grid>
                     {/* số điện thoại 2 */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>SỐ ĐIỆN THOẠI 2</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneIphoneIcon color="primary"/>
                        </InputAdornment>
                      }
                      name="Phone2"
                      value = {state.Phone2}
                      onChange = {handleChange}
                    />
                  </FormControl>
                    </Grid>
                     {/* số điện thoại 3 */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>SỐ ĐIỆN THOẠI 3</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneIcon color="primary"/>
                        </InputAdornment>
                      }
                      name="Tel1"
                      value = {state.Tel1}
                      onChange = {handleChange}
                    />
                  </FormControl>
                    </Grid>
                     {/* số điện thoại 4 */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>SỐ ĐIỆN THOẠI 4</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneIcon color="primary"/>
                        </InputAdornment>
                      }
                      name="Tel2"
                      value = {state.Tel2}
                      onChange = {handleChange}
                    />
                  </FormControl>
                    </Grid>
                    {/* Thời hạn nợ */}
                    
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>THỜI HẠN NỢ</InputLabel>
                    <Select
                      startAdornment={
                        <QueryBuilderIcon color="primary"/>
                      }
                      name="GroupNum"
                      value = {state.GroupNum}
                      onChange={handleChange}
                      fullWidth
                      required>
                      <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value="10 ngày">10 ngày</MenuItem>
                        <MenuItem value="20 ngày">20 ngày</MenuItem>
                        <MenuItem value="30 ngày">30 ngày</MenuItem>
                        <MenuItem value="Theo hợp đồng">Theo hợp đồng</MenuItem>
                        <MenuItem value="Thanh toán tiền mặt">Thanh toán tiền mặt</MenuItem>
                     </Select>
                   
                  </FormControl>
                    </Grid>
                     {/* Hạn mức công nợ */}
                    <Grid item xs={12} md={4}>
                      <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>HẠN MỨC CÔNG NỢ (TRIỆU VNĐ)</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PaymentIcon color="primary"/>
                        </InputAdornment>
                      }
                      name="CreditLine"
                      value = {state.CreditLine}
                      onChange = {handleChange}
                      required
                    />
                  </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.margin}>
                      {/* địa chỉ - BOx */}
                      <Box border={1}>
                        <Grid container xs={12}>
                          <EditLocationIcon color="primary" className={classes.inputlabel}/> Địa chỉ
                        </Grid>
                      <Grid container xs={12}>
                      <FormControl className={classes.margin} fullWidth>
                      <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>ĐỊA CHỈ GIAO DỊCH</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                         
                          </InputAdornment>
                        }
                        placeholder="Số 345 đường số 7 phường tân tạo quận bình tân TPHCM VN"
                        name="Address"
                        value = {state.Address}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                      </Grid>
                      {/* Tỉnh thành */}
                      <Grid container xs={12}>
                      <FormControl className={classes.margin} fullWidth>
                      <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>TỈNH THÀNH</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                         
                          </InputAdornment>
                        }
                        placeholder="THÀNH PHỐ HỒ CHÍ MINH"
                        name="City"
                        value = {state.City}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                      </Grid>
                      {/* Quốc gia */}
                      <Grid container xs={12}>
                      <FormControl className={classes.margin} fullWidth>
                      <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>QUỐC GIA</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                         
                          </InputAdornment>
                        }
                        name="Country"
                        value = {state.Country}
                        onChange = {handleChange}
                        placeholder="VIỆT NAM"
                        required
                      />
                    </FormControl>
                      </Grid>
                      </Box>
                      {/* end Box */}
                      {/* Button Gửi */}
                      <Grid container xs={12} md={12}>
                        <Grid item xs={12}>
                        <Button variant="contained" color="primary" className={classes.buttonaction} onClick={handleOpen}
                        disabled = {!lictradnum.Button}
                        > <SendIcon/>Gửi</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* end Button */}
                    
                </Grid>
                </form>
                {/* Cuối Form Tạo mã khách hàng */}
              </Paper>
            </Grid>
            {/* Đầu Card hiển thị thông tin người tạo nhập */}
            <Grid item xs={5}>
              <Paper elevation={3}>
              <Card className={classes.cardview}>
              <CardActionArea>
                <CardContent>
                <Typography variant="h4"  >Hiển thị trên hợp đồng</Typography>
                <Typography variant="h6" component="h6">Nhóm khách hàng</Typography>      <Typography color="error">{state.GroupCode}</Typography>
                <Typography variant="h6" component="h6">Loại kinh doanh</Typography>      <Typography color="error">{state.CmpPrivate}</Typography>
                <Typography variant="h6" component="h6">Mã số thuế:</Typography>          <Typography color="error">{state.LicTradNum}</Typography>
                <Typography variant="h6" component="h6">Cửa hàng</Typography>             <Typography color="error">{state.CardName}</Typography>
                <Typography variant="h6" component="h6">Người đại diện</Typography>       <Typography color="error">{state.Name}</Typography>
                <Typography variant="h6" component="h6">Địa chỉ</Typography>              <Typography color="error">{state.Address}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 1</Typography>      <Typography color="error">{state.Phone1}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 2</Typography>      <Typography color="error">{state.Phone2}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 3</Typography>      <Typography color="error">{state.Tel1}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 4</Typography>      <Typography color="error">{state.Tel2}</Typography>
                <Typography variant="h6" component="h6">Thời hạn nợ</Typography>          <Typography color="error">{state.GroupNum}</Typography>
                <Typography variant="h6" component="h6">Hạn mức công nợ </Typography>     <Typography color="error">{state.CreditLine}</Typography>
                <Typography variant="h6" component="h6">Tỉnh thành</Typography>           <Typography color="error">{state.City}</Typography>
                <Typography variant="h6" component="h6">Quốc gia</Typography  >           <Typography color="error">{state.Country}</Typography>
                </CardContent> 
              </CardActionArea>
              <CardActionArea>
                <CardContent>
                        <Typography variant="h4" component="h4">
                          Thông tin mã số thuế
                        </Typography>
                        <Typography variant="h6" component="h6">CardCode</Typography>      <Typography color="error">{lictradnum.CardCode}</Typography>
                        <Typography variant="h6" component="h6">Cửa hàng</Typography>      <Typography color="error">{lictradnum.CardName}</Typography>
                        <Typography variant="h6" component="h6">Mã số thuế</Typography>      <Typography color="error">{lictradnum.LicTradNum}</Typography>
                        <Typography variant="h6" component="h6">Giao dịch với</Typography>      <Typography color="error">{lictradnum.Company}</Typography>
                        
                </CardContent> 
              </CardActionArea>
            </Card>
              </Paper>
            </Grid>
            {/* Cuối Card hiển thị thông tin người dùng nhập */}
          </Grid>
          <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
        
      >
          <Grid container xs={12} >
            <Grid item xs={12}>
            <Paper elevation={3}>
              <Card  >
              <CardActionArea>
              <CardContent>
                <Typography variant="h4"  >Hiển thị trên hợp đồng</Typography>
                <Typography variant="h6" component="h6">Nhóm khách hàng</Typography>      <Typography color="error">{state.GroupCode}</Typography>
                <Typography variant="h6" component="h6">Loại kinh doanh</Typography>      <Typography color="error">{state.CmpPrivate}</Typography>
                <Typography variant="h6" component="h6">Mã số thuế:</Typography>          <Typography color="error">{state.LicTradNum}</Typography>
                <Typography variant="h6" component="h6">Cửa hàng</Typography>             <Typography color="error">{state.CardName}</Typography>
                <Typography variant="h6" component="h6">Người đại diện</Typography>       <Typography color="error">{state.Name}</Typography>
                <Typography variant="h6" component="h6">Địa chỉ</Typography>              <Typography color="error">{state.Address}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 1</Typography>      <Typography color="error">{state.Phone1}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 2</Typography>      <Typography color="error">{state.Phone2}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 3</Typography>      <Typography color="error">{state.Tel1}</Typography>
                <Typography variant="h6" component="h6">Số điện thoại 4</Typography>      <Typography color="error">{state.Tel2}</Typography>
                <Typography variant="h6" component="h6">Thời hạn nợ</Typography>          <Typography color="error">{state.GroupNum}</Typography>
                <Typography variant="h6" component="h6">Hạn mức công nợ </Typography>     <Typography color="error">{state.CreditLine}</Typography>
                <Typography variant="h6" component="h6">Tỉnh thành</Typography>           <Typography color="error">{state.City}</Typography>
                <Typography variant="h6" component="h6">Quốc gia</Typography  >           <Typography color="error">{state.Country}</Typography>
                </CardContent> 
              </CardActionArea>
              <CardActions>
                <Grid container xs={12}>
                  <Grid item xs={12}>
                <Button size="small" color="primary" type="submit" onClick = {submitCustomForm} className={classes.buttonaction}>
                  <SendIcon />Send
                </Button></Grid></Grid>
              </CardActions>
            </Card>
              </Paper>
            </Grid>
          </Grid>
      </Modal>
      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          Gửi thành công
        </Alert>
      </Snackbar>
      </div>
        
    );
}