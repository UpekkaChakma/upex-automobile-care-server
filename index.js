const express = require('express');
const cors = require('cors');
const {MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ijulk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const adminsCollection = client.db(`${process.env.DB_NAME}`).collection("admins");
  const reviewsCollection = client.db( `${process.env.DB_NAME}` ).collection("reviews");
  const servicesCollection = client.db( `${process.env.DB_NAME}` ).collection("services");
  const ordersCollection = client.db( `${process.env.DB_NAME}` ).collection("orders");

  console.log("database connected successfully");

//<<<<<<<<<<<<<<<<<<<<<<< user part >>>>>>>>>>>>>>>>>>>>>>>

//================== order a single service ========================
app.post('/addOrder', (req, res) => {
  const newOrder = req.body;
  ordersCollection.insertOne(newOrder)
  .then(() => {
      res.send({status: 'Success Ordered', code: 200});
  })
});

//<===============add aREVIEW=========================

app.post('/user/review', (req, res) => {
  const newReview = req.body;
  reviewsCollection.insertOne(newReview)
    .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send({status: 'success', code: 200});
    })
})


//<=================== find a single service by id =====================>
  app.get('/findService/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    servicesCollection.find({ _id: id })
    .toArray((err, items) => {
      res.send(items)
    })
  })

//<===========find all servicesCollection=====================> 
  app.post('/services', (req, res) => {
    servicesCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })
  //<===========reviewsCollection=====================> 
  app.post('/reviews', (req, res) => {
    reviewsCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })

  //=====================find order list by email=====================
  app.post('/user/totalOrderedLists', (req, res) => {
    const email = req.body.email;
    ordersCollection.find({email: email}).sort({$natural:-1})
    .toArray((err, items) => {
      res.send(items)
      console.log(items)
    })
})


//<<<<<<<<<<<<<<<<<<<<< admin part >>>>>>>>>>>>>>>>>>>>>>

//=====================find input email in admin list=====================
app.post('/isAdmin', (req, res) => {
  const email = req.body.email;
  adminsCollection.find({email: email})
  .toArray((err, items) => {
    res.send(items)
  })
})

//=====================add a service=====================

app.post('/admin/addService', (req, res) => {
  const newService = req.body;
  servicesCollection.insertOne(newService)
    .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send({status: 'success', code: 200});
    })
})


//<======================= add ADMIN =======================>
  app.post('/admin/makeAdmin', (req, res) => {
    const newAdmin = req.body;
    adminsCollection.insertOne(newAdmin)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send({status: 'success', code: 200});
      })
  })
//<================= find all orders list======================
  app.post('/allOrdersList', (req, res) => {
    ordersCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })

//<===================== find all services list =======================
app.post('/allServicesList', (req, res) => {
  servicesCollection.find()
    .toArray((err, items) => {
      res.send(items)
    })
})

//<=================== delete a service by id ========================>
  app.delete('/deleteService/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    servicesCollection.deleteOne({ _id: id })
      .then(documents => res.send({status: 'Successfully Delete', code: 200}));
  })


});

app.listen( process.env.PORT || port)