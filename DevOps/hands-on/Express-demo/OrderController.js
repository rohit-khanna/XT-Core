const express=require('express');
var parser=require('body-parser');
const router=express.Router();
router.use(parser.json());
router.post('/',(req,res)=>{
    console.log(req.body);
    
    res.end('Order Created with ID:'+req.body.id);
})

router.get('/',(req,res)=>{
    res.end('get done');
})
module.exports=router;

