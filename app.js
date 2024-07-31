const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 8080
const app = express()

const User = require('./models/User.js')

// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/messProject');
// }
// main().then(()=>{
//     console.log('Connected To DataBase')
// }).catch((err)=>{
//     console.log('Error While Connection to Database', err)
    
// })


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/messProject', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected To Database');
    } catch (err) {
        console.log('Error While Connecting to Database', err);
    }
}

main();




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'auth')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth', 'login.html'));
});

app.post('/signup', async (req, res) => {
    const {username, email, phone_no, password } = req.body
    console.log(req.body)

    try{
        const user = await User.create({
            userName: username,
            email: email,
            phone_no: phone_no,
            password: password
        })
        await user.save()
        .then((res),()=>{
            console.log("User Inserted Into Database")
        })
        .catch(err=>(console.log('Error while Inserting User', err)))
    }catch(err){
        console.log(err)
    }
    res.send("User DashBoard")
});


app.post('/login', async (req, res) => {
   try{

       const {email, password} = req.body;
       console.log(email)           //debug
       console.log(typeof(password))    //debug
       
       const user = await User.findOne({email: `${email}`});
       console.log(user)        //debug
        if(!user){
            return res.status(400).send('Invalid credentials');
        }
        const is_matched = await bcrypt.compare(password, user.password);

        if(!is_matched){
            res.send("Wrong Email or Password")
        }

        const token = jwt.sign({ userId: user._id }, 'aniket**2304', { expiresIn: '1h' });
        res.status(200).json({ token });

        // else res.send("User DashBoard")
    } catch (err) {
        res.send('Server error' + err);
    }

});

app.listen(port, ()=>{
    console.log('Server is Listening on' + port)
})
