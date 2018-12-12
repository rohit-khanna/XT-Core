/**
 * PURPOSE      :  Jasmine test for ATM Dispenser Class
 *
 * AUTHOR       :   Rohit Khanna
 *
 * LICENSE      :   PUBLIC
 */

describe("ATM-Dispenser", function() {
  var Dispenser = require("../js/atm-dispenser");
  var dispenser;

  describe("when Available Denomination are: 1,2,5,10,50,100", function() {
    beforeEach(function() {
      dispenser = new Dispenser(1, 2, 5, 10, 20, 50, 100);
    });

    it("should be able to dispense 100 rupees with 1 note", function() {
      expect(dispenser.getDenominations(100)["100"]).toBe(1);
    });
    it("should be able to dispense 106 rupees with 3 notes[1x100+1x5+1x1]", function() {
      let resultObj = dispenser.getDenominations(106);
      expect(resultObj["100"]).toBe(1);
      expect(resultObj["5"]).toBe(1);
      expect(resultObj["1"]).toBe(1);
    });
    it("should be able to dispense 650 rupees with 7 notes [6x100+1x50]", function() {
      let resultObj = dispenser.getDenominations(650);
      expect(resultObj["100"]).toBe(6);
      expect(resultObj["50"]).toBe(1);
    });
    it("should be able to dispense 0 rupees with 0 notes", function() {
      let resultObj = dispenser.getDenominations(0);
      Object.keys(resultObj).forEach(index => {
        expect(resultObj[index]).toBe(0);
      });
    });
  });

  describe("when Available Denomination are only : 500,2000", function() {
    beforeEach(function() {
      dispenser = new Dispenser(500, 2000);
    });

    it("should not allow any withdrawal of rupees 800", function() {
      expect(function() {
        dispenser.getDenominations(800);
      }).toThrowError(
        "Not able to dispense this amount.Please try again with multiples of:2000,500"
      );
    });
    it("should  allow  withdrawal of rupees 4000 with 2 notes [2000x2]", function() {
      let resultObj = dispenser.getDenominations(4000);
      expect(resultObj["2000"]).toBe(2);
    });
    it("should  allow  withdrawal of rupees 2500 with 2 notes [2000x1+500x1]", function() {
      let resultObj = dispenser.getDenominations(2500);
      expect(resultObj["2000"]).toBe(1);
      expect(resultObj["500"]).toBe(1);
    });

    it("should  allow not  withdrawal of rupees 2100", function() {
      expect(function() {
        dispenser.getDenominations(2100);
      }).toThrowError(
        "Not able to dispense this amount.Please try again with multiples of:2000,500"
      );
    });
  });

  describe("when User Input is negative", function() {
    beforeEach(function() {
      dispenser = new Dispenser(1, 2, 50, 500, 2000);
    });

    it("should throw an error", function() {
      expect(function() {
        dispenser.getDenominations(-100);
      }).toThrowError("Enter an amount greater than 0");
    });
  });
});
