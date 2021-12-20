import React,{useState, useEffect} from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import swal from 'sweetalert';
import {ServerURL, getData, postData} from './FetchNodeServices';
import 'react-quill/dist/quill.snow.css';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
 
},
subdiv:{
    padding:20,
    marginTop:30,
    width:580,
    background:'#fff',
    outline:'10px solid pink',
},
input: {
    display: 'none',
  },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function ProductDisplay(props)
{ 
  const [list, setList]=useState()
  const classes = useStyles();

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////

const [productid,setproductid]=useState('')
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [sku,setSku]=useState('')
const [slug,setSlug]=useState('')
const [sellingPrice,setSellingPrice]=useState('')
const [purchasePrice,setPurchasePrice]=useState('')
const [image,setImage]=useState({bytes:'', file:'/noimage.webp'})
//const [iconSaveCancel,setIconSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])


const handleIcon=(event)=>{
  setImage({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  //setIconSaveCancel(true)

}

const handledelete=async()=>{
  var body = {productid:productid}
  var result = await postData('product/deleteproduct',body);

  if(result)
  {
      swal({
          title: "Product Deleted Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
  else
  {
    swal({
      title: "Fail to Delete Record",
      icon: "success",
      dangerMode: true,
     })
  }
}

const handleClick=async()=>{

  var body = {"productid":productid,"title":title,"description":description, "sku":sku, "slug":slug, "sellingprice":sellingPrice,
                "purchaseprice":purchasePrice};
  var result = await postData('product/editproductdata', body);

  if(result)
  {
    
      swal({
          title: "Product Updated Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
}


// const handleClickSaveIcon=async()=>{

//   var formData = new FormData()
//   formData.append("productid",productid)
//   formData.append("image",image.bytes)
//   var config = {headers:{"content-type":"multipart/form-data"}}
//   var result = await postDataAndImage('product/editicon',formData, config)
//   if(result)
//   {
//       swal({
//           title: "Image Upadated Successfully",
//           icon: "success",
//           dangerMode: true,
//          });
//          setIconSaveCancel(false)
//   }

// }


const editFormView=()=>{
  return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    Interface
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Title" value={title} onChange={(event)=>setTitle(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                        <TextField label="Sku" value={sku} onChange={(event)=>setSku(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Slug" value={slug} onChange={(event)=>setSlug(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Selling Price" value={sellingPrice} onChange={(event)=>setSellingPrice(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Purchase Price" value={purchasePrice} onChange={(event)=>setPurchasePrice(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                <Grid item xs={10}>
                <span style={{fontSize:15,fontWeight:400}}>Edit  Image</span>
                <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="image-button-file" type="file" />
                <label htmlFor="image-button-file">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                {/* <Grid item xs={12} sm={2} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                {iconSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
                </Grid> */}

            </Grid>
        </div>
    </div>

)


}





  /////////////////////////////////////////////////////////////////////////////////////////////////////////





  ///////////////////////////////////////////Edit Dialog///////////////////////////////////////////
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setproductid(rowData.productid);
    setTitle(rowData.title)
    setDescription(rowData.description)
    setSku(rowData.sku)
    setSlug(rowData.slug)
    setSellingPrice(rowData.sellingPrice)
    setPurchasePrice(rowData.purchasePrice)
    setImage({bytes:"",file:`${ServerURL}/images/${rowData.image}`})

  };

  const handleClose = () => {
    setOpen(false);
    fetchProduct()
  };

  const showEditDialog=()=>{
    return (
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete Product
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>handleClick()}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={handledelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );
    



  }





  ///////////////////////////////////////////////////////////////////////////////////////

  const fetchProduct=async()=>{
    var result = await getData('product/displayAll')
    setList(result)
  }
  useEffect (function(){
    fetchProduct()
  },[]);

function DisplayAll() {
    return (
      <div>
      <MaterialTable
        title="List"
        columns={[
          { title: 'Title', field: 'title' },
          { title: 'Description', field: 'description' },
          { title: 'Sku', field: 'sku' },
          { title: 'Slug', field: 'slug' },
          { title: 'Selling Price', field: 'sellingprice' },
          { title: 'Purchase Price', field: 'purchaseprice' },
          { title: 'Image', field: 'image',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.image}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },
          
        ]}
      
        data={list}
        

        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Product',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div style={{marginTop:50, padding:5, width:900}}>
      {DisplayAll()}
    </div>
  </div>)
}

