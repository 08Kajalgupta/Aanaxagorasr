var express = require('express');
var pool = require('./pool');
var router = express.Router();
var jwt = require("jsonwebtoken");
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


/* GET home page. */


router.post('/chkadminlogin', function(req, res, next) {
    console.log("Body",req.body)
    pool.query("select * from login where email=? and password=?",[req.body.email,req.body.password],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            if(result.length==0)
            {
                res.status(500).json({result:false})
            }
            else
            {
                res.status(200).json({result:true,data:result})
            }
        }

        
    });
});

router.get('/assignToken',function(req,res,next){
    try{
        var token=jwt.sign({id:100},'itmgroupofinstitutioncollegegwal',{expiresIn:'1800s'})
        console.log(token)
        //localStorage.setItem("token",token)
        res.json({access_token:token})
    }

    catch(e){
        console.log("GET TOKEN:",e)
        res.json({access_token:null})
    }

})


module.exports = router;
