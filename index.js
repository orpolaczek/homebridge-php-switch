var Service, Characteristic;
var request = require('request');

const BASE_SERVER_URL = "http://localhost:8000/simple_server.php";

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-php-switch", "PhpSwitch", PhpSwitchAccessory);
};

function PhpSwitchAccessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.switchName = config["switch_name"] || this.name; // fallback to "name" if you didn't specify an exact "switch_name"
  this.binaryState = 0; // switch state, default is OFF
  this.log("Starting a php switch device with name '" + this.switchName + "'...");
};

PhpSwitchAccessory.prototype.getPowerOn = function(callback) {
  var powerOn = this.binaryState > 0;
  var switchName = this.switchName;
  this.log("Power state for the '%s' is %s", switchName, this.binaryState);
  request(BASE_SERVER_URL + "?action=get",
    function (error, response, body) {
      if(body !== undefined) {
        var devices = JSON.parse(body);
        powerOn = (devices[switchName] === "true");
            // console.log(devices[switchName] );
            // console.log(JSON.stringify(devices));
            callback(null, powerOn);
          } else {
            callback(null, false);
          }
        });
}

PhpSwitchAccessory.prototype.setPowerOn = function(powerOn, callback) {
  this.binaryState = powerOn ? 1 : 0; // wemo langauge
  this.log("Set power state on the '%s' to %s", this.switchName, this.binaryState);
  var requestContent = "action=set&deviceName=" + require('querystring').escape(this.switchName) + "&state=" + (powerOn ? "true" : "false");
  request(BASE_SERVER_URL + "?" + requestContent
    , function (error, response, body) {
      callback(null);
    });
}

PhpSwitchAccessory.prototype.getServices = function() {
  var switchService = new Service.Switch(this.name);
  
  switchService
  .getCharacteristic(Characteristic.On)
  .on('get', this.getPowerOn.bind(this))
  .on('set', this.setPowerOn.bind(this));
  
  return [switchService];
}


