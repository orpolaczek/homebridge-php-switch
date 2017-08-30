# homebridge-php-switch

Simulates a (fake) power-outlet device on HomeBridge Platform

# Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin by cloning and `npm install -g`
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

Configuration sample:

 ```
"accessories": [
        {
            "accessory":      "PhpSwitch",
            "name":           "Test Switch",
            "switch_name":      "Switch 1"
        }
]

```
