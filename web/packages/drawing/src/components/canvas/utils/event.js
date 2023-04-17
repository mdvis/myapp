/**
 * name: event.js
 * author: Deve
 * date: 2021-05-11
 */

import EventEmitter from 'eventemitter3';

class MyEvent extends EventEmitter { }

const myEvt = new MyEvent();

export default myEvt;
