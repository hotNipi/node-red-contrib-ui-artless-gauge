# node-red-contrib-ui-artless-gauge



[![NPM version][npm-image]][npm-url]
[![CodeFactor](https://www.codefactor.io/repository/github/hotnipi/node-red-contrib-ui-artless-gauge/badge)](https://www.codefactor.io/repository/github/hotnipi/node-red-contrib-ui-state-trail)
![npm](https://img.shields.io/npm/dm/node-red-contrib-ui-artless-gauge)

[npm-image]: http://img.shields.io/npm/v/node-red-contrib-ui-artless-gauge.svg
[npm-url]: https://www.npmjs.com/package/node-red-contrib-ui-artless-gauge


## Description


Artless gauge is gauge with minimal design. Gauge has two layouts - linear and radial. Both layouts support regular mode and differential mode. With differential mode, the indicating colored track is drawn from center to side. There is no tick marks or values presented near the gauge track. 


![Node-RED dashboard widget node-red-contrib-ui-artless-gauge](images/node-red-dashboard-widget-artless-gauge.JPG)


## Configuration
### Size
For linear layout the supported height is 1 unit.
For radial mode the minimal size is 2x2 units. Supported size configuration for radial layout is rectangular (3x3, 4x4). Widget forces different size combinations to be rectangular based on shortest side.

### Label
Label can be any string. Label field does not support any html for color or size adjustments.

### Icon
Supported icons are same as for dashboard: Font Awesome, Material Icons and Weather icons. 
Icon field does not support any html for size adjustments.

### Layout
Choose layout type. Layout can be linear or radial.

### Mode
Option to turn on differential mode. With this option selected, the colored track has center point from which the value is shown. Value of center point is not shown anywhere, as well there is no minimum or maximum marks. Value of center point is exactly between configured min and max.

### Colors
Color of track and background line can be configured. By default, the site colors used.

### Range
Minimum and maximum expected values. Note that with differential mode, the middle point is exactly between those values.

### Format
Unit is displayed near the value field. Unit can be any string.
Value is always rounded according to the configured decimals. Default is zero so value presented as integer.  

## Input 
msg.payload should carry single numeric value.


### Licence

This node uses GreenSock animation library GSAP licenced with Standard "No Charge" GreenSock License
https://greensock.com/standard-license/

