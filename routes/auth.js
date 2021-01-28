const router = require('express').Router();
const jwt = require('jsonwebtoken');
const AccountModel = require('../models/Account');
const jwtSecret = 'alskdjflkasdjflas';

router.post('/register', (req, res)=>{
    AccountModel.find({email: req.body.email}, 
    (err, response)=>{
        if(err){
            res.send('Finding account db error', err);
        }else{
            if(response){
                console.log(response);
                res.send('User email has been used');
            }else{
                AccountModel.insertMany({ email: req.body.email, 
                password: req.body.password,
                createdate: new Date(),
                name: req.body.name }, (err, doc)=>{
                    if(err){
                        console.log(err);
                        res.status(400).send('Can not create user ');
                    }else{
                        console.log(doc);
                        res.send('Created user successful');
                    }
                })
            }
        }
    })
})

router.post('/login', (req, res)=>{
    AccountModel.find({ email: req.body.email,
                        password: req.body.password }, 
    (err, response) => {
        if(err){
            res.send(err);
        }else{
            if(response[0]){
                const access_token = jwt.sign({user: req.body.user}, 
                    jwtSecret, {expiresIn: '30 mins'} )
                res.json({access_token});
            }else{
                res.send('Error password or email');
            }
        }

    })
    
})

router.post('/verify', (req, res) => {
    jwt.verify(req.body.access_token, jwtSecret, (err, decoded)=> {
        if(err){
            console.log('jwt verify error')
            res.send(false);
        }
        console.log(decoded);
        res.send(decoded);
    });
})
module.exports = router;