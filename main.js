console.log('NODE ENV =', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  require('./localSecrets');
}
const { db } = require('./server/db');
const app = require('./server');
const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () =>
      console.log(`

          Using port ${PORT} to hack into the mainframe...

                             I'm in

      `)
    );
  } catch (err) {
    console.log(`There was an error starting up!`, err);
  }
};

init();
