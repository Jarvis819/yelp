if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./helpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL;
// 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to DataBase');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  // await Campground.deleteMany({});
  for (let i = 0; i < 27; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '651e7dae243484706d7b0ccf',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dicta repellendus fugiat beatae aspernatur neque, commodi libero. Saepe, facere in. Error necessitatibus cupiditate enim fuga excepturi! Illo neque explicabo perferendis!',
      images: [
        {
          url: 'https://res.cloudinary.com/dql84xef6/image/upload/v1677757407/YelpCamp/cbpj3dtaqesdztncrsaz.avif',
          filename: 'YelpCamp/cbpj3dtaqesdztncrsaz',
        },
        {
          url: 'https://res.cloudinary.com/dql84xef6/image/upload/v1677757407/YelpCamp/hb39vejdllymx6xvg5wa.avif',
          filename: 'YelpCamp/hb39vejdllymx6xvg5wa',
        },
        {
          url: 'https://res.cloudinary.com/dql84xef6/image/upload/v1677757407/YelpCamp/c2bafvdziayoqxf8dtcs.avif',
          filename: 'YelpCamp/c2bafvdziayoqxf8dtcs',
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
