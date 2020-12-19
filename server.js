const dbConfig = require('./config/db.config')
const mongoose = require('mongoose')


const db = require('./models');
const Airport = db.airport;
const Flight = db.flight

// db connection
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

// const airport = new Airport({
// 	name: 'First Airport',
// 	country: 'US',
// 	opened: '2020-12-15'
// })

// Lets Make and Save our first airport
const airport1 = new Airport({
  name: 'JFK',
  country: 'USA',
  terminals: [],
  capacity: '1990-06-12'
})
airport1.save()

airport1.terminals.push({
  name: 'Terminal 1',
  flights: [   
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight'
    }
  ],
  capacity: 234324
})

const terminal1 = airport1.terminals[0]

const flight1 = new Flight({
  from: 'CDG France',
  to: 'JFK New-York, USA',
  airline: "American Airlines"
})

flight1.save()
terminal1.flights.push(flight1)

const flight2 = new Flight({
  from: 'Heathrow UK',
  to: 'JFK New-York, USA',
  airline: 'British Airways'
})
flight2.save()
terminal1.flights.push(flight2)



console.log('Airport:\n', airport1)
console.log('Terminals:\n', terminal1)

