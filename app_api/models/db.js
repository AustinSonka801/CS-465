const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURL = `mongodb://${host}/travlr`;

const {seed} = require('./seed');

//models
require('./trips');
require('./user');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('error', err => console.log(err));
mongoose.connection.on('disconnected', () => console.log('disconnected'));

mongoose.set('strictQuery', false);

//kiill mongodc
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected due to to ${msg}`);
    callback();
  } );
}
process.once('SIGUSR2', () =>
    gracefulShutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () =>
    gracefulShutdown('app termination', () => process.exit(0)));

async function main() {
  await mongoose.connect(connect);
  await seed();
}

main().catch(console.log);