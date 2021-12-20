import React,{useState} from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import swal from 'sweetalert';
import Paper from '@material-ui/core/Paper';
import {postDataAndImage} from './FetchNodeServices';
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import swalhtml from '@sweetalert/with-react';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        marginTop:20,
        width:590,
        background:'#fff'
    },
    input: {
        display: 'none',
      },

  }));     


export default function Product(props)
{
const classes = useStyles();
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [sku,setSku]=useState('')
const [slug,setSlug]=useState('')
const [sellingPrice,setSellingPrice]=useState('')
const [purchasePrice,setPurchasePrice]=useState('')
const [image,setImage]=useState({bytes:'', file:'/noimage.webp'})



const handleIcon=(event)=>{
    setImage({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})

}


const handleClick=async()=>{
   
    var error=false
    var msg="<div>"
    
    if(isBlank(title))
    {error=true
        msg+="<font color='#c0392b'><b>Title should not be blank..</b></font><br>"
    }
    if(isBlank(description))
    {error=true
        msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
    }
    if(isBlank(sku))
    {error=true
        msg+="<font color='#c0392b'><b>Sku should not be blank..</b></font><br>" 
    }
    if(isBlank(slug))
    {error=true
        msg+="<font color='#c0392b'><b>Slug should not be blank..</b></font><br>" 
    }
    if(isBlank(sellingPrice))
    {error=true
        msg+="<font color='#c0392b'><b>Selling price should not be blank..</b></font><br>" 
    }
    if(isBlank(purchasePrice))
    {error=true
        msg+="<font color='#c0392b'><b>Purchase price should not be blank..</b></font><br>" 
    }
    if(isBlank(image.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select image..</b></font><br>"
    }
    
    msg+="</div>"

    if(error)
    {
        swalhtml(renderHTML(msg))
    }


    var formData = new FormData()
    formData.append("title",title)
    formData.append("description",description)
    formData.append("sku",sku)
    formData.append("slug",slug)
    formData.append("sellingprice",sellingPrice)
    formData.append("purchaseprice",purchasePrice)
    formData.append("image",image.bytes)
    
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('product/addnewproduct',formData, config)
    if(result)
    {
        swal({
            title: "Product Submitted Successfully",
            icon: "success",
            dangerMode: true,
           })
    }
}


    return (
        <div className={classes.root}>
            <Paper elevation={2}>
            <div className={classes.subdiv}>
                <Grid container spacing={1} >
                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                           Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Title" onChange={(event)=>setTitle(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Description" onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Sku" onChange={(event)=>setSku(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Slug" onChange={(event)=>setSlug(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField label="Selling Price" onChange={(event)=>setSellingPrice(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Purchase Price" onChange={(event)=>setPurchasePrice(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>


                    <Grid item xs={6}>
                    <span style={{fontSize:15,fontWeight:'400px'}}>Upload Product Image</span>
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="image-button-file" type="file" />
                    <label htmlFor="image-button-file">
                    <IconButton color="primary" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" src={image.file} style={{width:60,height:60}}/>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </div>
            </Paper>
        </div>

    )
}