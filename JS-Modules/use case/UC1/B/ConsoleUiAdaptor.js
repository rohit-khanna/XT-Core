"use strict";

/**
 * This is the UI Adaptor using COnsole as Output Medium
 */

class ConsoleDisplayAdaptor {
  log(...data) {
    console.log(...data);
  }

  logE(msg) {
    console.error(msg);
  }
}

export default ConsoleDisplayAdaptor;
