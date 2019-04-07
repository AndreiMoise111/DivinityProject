const {Divinity} = require('./divinity');
const {Troupes} = require('./troupes');
const {Trader} = require('./trading');

/**
 *
 */
class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName);
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.init();
    this.Trader1 = new Trader();
    this.troupes = new Troupes();
    this.k = 1; // Compteur pour la fonction updateTroupe
    this.compt = 1; // Compteur pour la fonction combat()
  }

  init() {
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', resources =>
      this.getResources(resources)
    );
    this.divinity_.worldEvents.on('blessing', resources =>
      this.getResources(resources)
    );
  }

  getResources(s) {
    this.corn_ += Math.floor(s.corn);
    this.gold_ += Math.floor(s.gold);
  }

  giveResources() {
    this.divinity_.offeringCorn(this.corn_ / 5);
    this.divinity_.offeringGold(this.gold_ / 5);
    this.corn_ -= this.corn_ / 5;
    this.gold_ -= this.corn_ / 5;
  }

  updateTroupe() {
    // Ajoute un certain nombre de troupes et certaines meurent de vieillesse

    if (this.k % 4 === 0) {
      this.troupes.NmbTroupes -= 2;
      this.k += 1;
    } else {
      this.k += 1;
    }

    if (this.gold_ && this.corn_ > 500) {
      this.troupes.NmbTroupes += 20;
      this.gold_ -= 2;
      this.corn_ -= 2;
    }
  }

  /*
Combat entre deux troupes(d'un certain nombre) de 2 cités.
Les 2 camps perdent un nombre aléatoire de troupes au fur et à mesure du combat.
Si une des 2 troupes est décimée, le combat prend fin.
 */
  combat(EnemyCity, NbrTroupTarget, NbrTroup) {
    if (this.compt === 1) {
      console.log(
        `THE BATTLE BETWEEN ${this.name_} AND ${EnemyCity.name_} JUST BEGUN !`
      );
    }

    const rand1 = Math.random() * (30 - 5) + 5;
    const rand2 = Math.random() * (30 - 5) + 5;
    NbrTroup -= rand1;
    this.troupes.NmbTroupes -= rand1;
    NbrTroupTarget -= rand2;
    EnemyCity.troupes.NmbTroupes -= rand2;
    this.compt += 1;
    if (NbrTroupTarget <= 0) {
      console.log(`${this.name_} WON`);
      this.compt = 1;
      NbrTroupTarget = 0;
      return NbrTroupTarget;
    }

    if (NbrTroup <= 0) {
      console.log(`${EnemyCity.name_} WON`);
      this.compt = 1;
      NbrTroup = 0;
      return NbrTroup;
    }
  }

  giveTraderGold(gold) {
    this.gold_ -= gold;
    this.Trader1.gold_ += gold;
  }

  giveTraderCorn(corn) {
    this.corn_ -= corn;
    this.Trader1.corn_ += corn;
  }

  showResources() {
    console.log(
      `${this.name_}: Corn ${Math.floor(this.corn_)}, Gold ${Math.floor(
        this.gold_
      )}, NmbTroupes ${Math.floor(this.troupes.NmbTroupes)}`
    );
  }

  tradeWithCity(City) {
    if (this.Trader1.gold_ > 0) {
      City.gold_ += this.Trader1.gold_;
      City.corn_ -= this.Trader1.gold_;
      this.Trader1.corn_ += this.Trader1.gold_;
      this.Trader1.gold_ = 0;
      this.corn_ += this.Trader1.corn_;
      this.Trader1.corn_ = 0;
      console.log('TRADE GOLD FOR CORN WAS SUCCESSFUL');
    } else {
      City.corn_ += this.Trader1.corn_;
      City.gold_ -= this.Trader1.corn_;
      this.Trader1.gold_ += this.Trader1.corn_;
      this.Trader1.corn_ = 0;
      this.gold_ += this.Trader1.gold_;
      this.Trader1.gold_ = 0;
      console.log('TRADE CORN FOR GOLD SUCCESSFUL');
    }
  }

  trade(CityName) {
    if (this.gold_ > this.corn_) {
      this.giveTraderGold(this.gold_ / 10);
      console.log(` corn ${this.Trader1.corn_}, gold ${this.Trader1.gold_}`);
      if (Math.random() > 0.5) {
        this.Trader1.gold_ = 0;
        console.log('YOUR TRADER GOT ROBBED');
      } else {
        this.tradeWithCity(CityName);
      }
    } else {
      this.giveTraderCorn(this.corn_ / 10);
      console.log(` corn ${this.Trader1.corn_}, gold ${this.Trader1.gold_}`);
      if (Math.random() > 0.5) {
        this.Trader1.corn_ = 0;
        console.log('YOUR TRADER GOT ROBBED');
      } else {
        this.tradeWithCity(CityName);
      }
    }
  }
}

module.exports = {City};
