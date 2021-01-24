const router = require('express').Router();
const jwt = require('jsonwebtoken');
const AccountModel = require('../models/Account');
const jwtSeret = process.env.JWT_SECRET;

router.post('/login', (req, res)=>{
    AccountModel.find({ email: req.body.email,
                        password: req.body.password }, 
    (err, response) => {
        if(err){
            res.send(err);
        }else{
            if(response[0]){
                const access_token = jwt.sign({user: req.body.user}, 
                    jwtSeret, {expiresIn: '30 mins'} )
                res.json({access_token});
            }else{
                res.send('Error password or email');
            }
        }

    })
    
})

router.post('/verify', (req, res) => {
    jwt.verify(req.body.access_token, jwtSeret, (err, decoded)=> {
        if(err){
            console.log('jwt verify error')
            res.send(false);
        }
        console.log(decoded);
        res.send(decoded);
    });
})
module.exports = router;