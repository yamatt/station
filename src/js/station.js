import Player from "./player.js";
import Info from "./info.js";
import Updater from "./updater.js";


export default class Station {
  PLAYER_EL_ID = "player";
  PLAYER = Player;

  INFO_EL_ID = "info";
  INFO = Info;

  UPDATER = Updater;

  #player_el;
  #player;
  #info_el;
  #info;
  #updater;

  get player_el (){
    if (!this.#player_el) {
      this.#player_el = document.getElementById(this.PLAYER_EL_ID);
    }
    return this.#player_el;
  }

  get player(){
    if(!this.#player) {
      this.#player = new this.PLAYER(this);
    }
    return this.#player;
  }


  get info_el (){
    if (!this.#info_el) {
      this.#info_el = document.getElementById(this.INFO_EL_ID);
    }
    return this.#info_el;
  }

  get info(){
    if(!this.#info) {
      this.#info = new this.INFO(this);
    }
    return this.#info;
  }

  get updater () {
    if(!this.#updater) {
      this.#updater = new this.UPDATER(this);
    }
    return this.#updater;
  }


  run() {
    this.player.setup();
    this.updater.start();
  }
}
