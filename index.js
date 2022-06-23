const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const { MongoClient, ObjectId } = require('mongodb');
=======
const {MongoClient, ObjectId } = require('mongodb');
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!How r u')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ijulk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const adminsCollection = client.db(`${process.env.DB_NAME}`).collection("admins");
<<<<<<< HEAD
  const reviewsCollection = client.db(`${process.env.DB_NAME}`).collection("reviews");
  const servicesCollection = client.db(`${process.env.DB_NAME}`).collection("services");
  const ordersCollection = client.db(`${process.env.DB_NAME}`).collection("orders");

  console.log("database connected successfully");

  //<<<<<<<<<<<<<<<<<<<<<<< user part >>>>>>>>>>>>>>>>>>>>>>>

  //================== order a single order ========================
  app.post('/addOrder', (req, res) => {
    const newOrder = ObjectId(req.body);
    console.log(newOrder)
    ordersCollection.insertOne(newOrder)
      .then((items) => {
        res.send(items);
      })
  });

  //<===============add aREVIEW=========================

  app.post('/user/review', (req, res) => {
    const newReview = req.body;
    reviewsCollection.insertOne(newReview)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send({ status: 'success', code: 200 });
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
=======
  const reviewsCollection = client.db( `${process.env.DB_NAME}` ).collection("reviews");
  const servicesCollection = client.db( `${process.env.DB_NAME}` ).collection("services");
  const ordersCollection = client.db( `${process.env.DB_NAME}` ).collection("orders");

  console.log("database connected successfully");

//<<<<<<<<<<<<<<<<<<<<<<< user part >>>>>>>>>>>>>>>>>>>>>>>

//================== order a single order ========================
app.post('/addOrder', (req, res) => {
  const newOrder = ObjectId(req.body);
  console.log(newOrder)
  ordersCollection.insertOne(newOrder)
  .then((items) => {
      res.send(items);
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
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
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
<<<<<<< HEAD
    ordersCollection.find({ email: email }).sort({ $natural: -1 })
      .toArray((err, items) => {
        res.send(items)
        console.log(items)
      })
  })


  //<<<<<<<<<<<<<<<<<<<<< admin part >>>>>>>>>>>>>>>>>>>>>>

  //=====================find input email in admin list=====================
  app.post('/isAdmin', (req, res) => {
    const email = req.body.email;
    adminsCollection.find({ email: email })
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
        res.send({ status: 'success', code: 200 });
      })
  })


  //<======================= add ADMIN =======================>
=======
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
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
  app.post('/admin/makeAdmin', (req, res) => {
    const newAdmin = req.body;
    adminsCollection.insertOne(newAdmin)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result);
      })
  })
<<<<<<< HEAD
  //<================= find all orders list======================
=======
//<================= find all orders list======================
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
  app.post('/allOrdersList', (req, res) => {
    ordersCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })

<<<<<<< HEAD
  //<===================== find all services list =======================
  app.post('/allServicesList', (req, res) => {
    servicesCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })

  //<=================== delete a service by id ========================>
  app.delete('/admin/deleteService/:id', (req, res) => {
    const id = ObjectId(req.params.id);
=======
//<===================== find all services list =======================
app.post('/allServicesList', (req, res) => {
  servicesCollection.find()
    .toArray((err, items) => {
      res.send(items)
    })
})

//<=================== delete a service by id ========================>
  app.delete('/deleteService/:id', (req, res) => {
    const id = req.params.id;
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
    servicesCollection.deleteOne({ _id: id })
      .then(documents => res.send(documents));
  })
  //<=================== update user order status ========================>
  app.put('/update/orderStatus/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    console.log(id);
<<<<<<< HEAD
    const { status } = req.body;
    ordersCollection.updateOne({ _id: id }, { $set: { status: status } })
=======
    const {status} = req.body;
    ordersCollection.updateOne({ _id: id }, {$set:{status: status}})
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
      .then(documents => res.send(documents));
  })


});

<<<<<<< HEAD
app.listen(process.env.PORT || port)
=======
app.listen( process.env.PORT || port)
>>>>>>> 6a43ed9d925404565a0aab5bc2c71cfb85317f59
