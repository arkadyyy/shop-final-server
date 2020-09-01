const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




const x = JSON.parse(fs.readFileSync('./Products.json','utf-8')) ;

// app.get('/',(req,res)=>{


//     res.send('hello from the server~!');
//     console.log('hello from the server~!!');
    
// })

app.get('/',(req,res)=>{

    res.send('hello world~!');
})

app.get('/products',(req,res)=>{

    const products = fs.createReadStream('./products.json');
    products.pipe(res);
    console.log(res);
    // console.log(x);
    
    
})

//add new product
app.post('/products/newproduct',(req,res)=>{
    
console.log('post request happend~!');


    const products = JSON.parse( fs.readFileSync('./products.json'));
    
    const newId = products[products.length-1].id+1;
    const updatedProducts = [...products,{id:newId,title:req.query.title,image:req.query.image,quantity:req.query.quantity,price:req.query.price}]
    fs.writeFileSync('./products.json',JSON.stringify(updatedProducts) );
    console.log(req.query);
    
    res.send('shalom');
    
    
})

//login
app.post('/products/login',(req,res)=>{

        console.log(process.env.USERNAMEE);
        console.log(process.env.PASSWORD);
        console.log(req.query);
        if(req.query.username === process.env.USERNAMEE && req.query.password === process.env.PASSWORD){
            res.send(true)
        }else
        res.send(false)
})

//get product by id 

app.get('/products/updateproductById/:id',(req,res)=>{
        

        fs.readFile("./products.json", (err, data) => {
            const products = JSON.parse(data);
            const productId = +req.params.id;
            const foundProduct = products.findIndex((product) => product.id === productId)
            console.log(products[foundProduct]);
            res.send(products[foundProduct])  
        }
            
            
            );

            

         
})

//get product by title


app.get('/products/updateproductByTitle/:title',(req,res)=>{
        

    fs.readFile("./products.json", (err, data) => {
        const products = JSON.parse(data);
        const productTitle = req.params.title;
        const foundProduct = products.findIndex((product) => product.title === productTitle)
        console.log(products[foundProduct]);
        products[foundProduct] ? res.status(200).send(products[foundProduct]) :  res.status(500).send(products[foundProduct]);

    }
        
        
        );

        

     
})

//update product

app.put("/products/updateproduct/:id", (req, res) => {
    fs.readFile("./products.json", (err, data) => {
      const products = JSON.parse(data);
      const productTitle = req.query.title;
      const productIndex = products.findIndex((product) => product.title === productTitle);
     
      products[productIndex].title = req.query.title;
      products[productIndex].image = req.query.image;
      products[productIndex].quantity = req.query.quantity;
      products[productIndex].price = req.query.price;
      fs.writeFile("./products.json", JSON.stringify(products), (err) => {
            console.log(err);
      });
      console.log(req.query.title);
      
      console.log(productIndex);
      res.send("YOU SUCCEED!!!");
    });
  });

  //delete product

  app.delete('/products/:title',(req,res)=>{
    fs.readFile("./products.json", (err, data) => {
        const products = JSON.parse(data);
        const productTitle = req.query.title;
        const productIndex = products.findIndex((product) => product.title === productTitle);
       
        products.splice(productIndex,1);
       
        fs.writeFile("./products.json", JSON.stringify(products), (err) => {
              console.log(err);
        });
        console.log(req.query.title);
        
        console.log(productIndex);
        res.send("YOU SUCCEED!!!product deleted ");
      });



  })


app.listen(process.env.PORT);