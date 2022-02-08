const { response } = require('express');
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3000';

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    },
});

const upload = multer({ storage: fileStorageEngine });
/*
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "index.html"));
});
*/
app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single File upload success");
});

app.post("/multiple", upload.array("images", 3),(req, res) => {
    console.log(req.files);
    res.send("Multiple Files Upload Success");
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Routes

app.get('/', (request, response) =>{
    response.status(200).send("This is not why you're here. Head to /user/:id and replace :id with your user id")
})

const userRouter = require('./routes/user');
app.use('/user',userRouter);

// start listening

app.listen(PORT,() => {
    console.log(`Listening for requests on port ${PORT}`)
}) 
 