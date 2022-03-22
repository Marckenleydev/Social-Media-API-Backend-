const router = require ("express").Router();

router.get('/',(req,res)=>{
    res.send("hey its test route")
})

module.exports= router