var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./upload.js');
var jwt = require('jsonwebtoken');



/* GET home page. */
router.post('/addnewproduct', upload.any(), function (req, res, next) {
    console.log("BODY ==>", req.body);
    pool.query("insert into product (title,description,sku,slug,sellingprice,purchaseprice,image) values(?,?,?,?,?,?,?)", 
    [req.body.title, req.body.description, req.body.sku, req.body.slug, req.body.sellingprice,req.body.purchaseprice, req.files[0].originalname],
     function (error, result) {
        if (error) {
            console.log("Error", error)
            res.status(500).json({ result: false });
        }
        else {
            console.log("Result", result)
            res.status(200).json({ result: true });
        }
    });

});

router.get('/displayAll',function(req,res){
    //console.log(req.headers.authorization)
    try{
        var token = jwt.verify(
            req.headers.authorization,
            'itmgroupofinstitutioncollegegwal'
        );
    pool.query("select * from product", function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    } )
}
    catch(e)
    {
        res.status(200).json('expire');
    }
});

router.post('/editicon', upload.single('image'), function (req, res, next) {
    console.log("BODY ==>", req.body);
    pool.query("update product set image=? where productid=?", [req.file.originalname,req.body.productid], function (error, result) {
        if (error) {
            console.log("Error", error)
            res.status(500).json({ result: false });
        }
        else {
            console.log("Result", result)
            res.status(200).json({ result: true });
        }
    });

});


router.post('/editproductdata', function (req, res, next) {
console.log("body",req.body)
    pool.query("update product set title=?,description=?,sku=?,slug=?,sellingprice=?,purchaseprice=? where productid=?", 
    [req.body.title, req.body.description, req.body.sku, req.body.slug, req.body.sellingprice,req.body.purchaseprice, req.body.productid], function (error, result) {
        if (error) {
            console.log(req.body)
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/deleteproduct', function (req, res, next) {

    pool.query("delete from product where productid=?", [req.body.productid], function (error, result) {
        if (error) {
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});


module.exports = router;
