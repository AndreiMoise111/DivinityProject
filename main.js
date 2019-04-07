const {City} = require('./city');

const Paris = new City('Paris', 'Zeus');
const Berlin = new City('Berlin', 'Athena');

setInterval(() => Paris.updateTroupe(), 1000);
setInterval(() => Berlin.updateTroupe(), 1000);

setInterval(() => {
  if (Paris.troupes.NmbTroupes > 400 && Paris.troupes.NmbTroupes) {
    const timer = setInterval(() => {
      this.Counter = Paris.combat(
        Berlin,
        Berlin.troupes.NmbTroupes / 10,
        Paris.troupes.NmbTroupes / 10
      );
      if (this.Counter === 0) {
        clearInterval(timer);
      }
    }, 100);
  }
}, 10000);

setInterval(() => Paris.giveResources(), 2000);
setInterval(() => Paris.showResources(), 4000);
setInterval(() => Berlin.giveResources(), 2000);
setInterval(() => Berlin.showResources(), 4000);

// SetInterval(()=>Paris.trade(Berlin),7000);
// setInterval(()=>Berlin.trade(Paris),5000);
