
### Get this product for $5

<i>Packt is having its biggest sale of the year. Get this eBook or any other book, video, or course that you like just for $5 each</i>


<b><p align='center'>[Buy now](https://packt.link/9781786466952)</p></b>


<b><p align='center'>[Buy similar titles for just $5](https://subscription.packtpub.com/search)</p></b>


# Building Smart Homes with Raspberry Pi Zero


This is the code repository for[Building Smart Homes with Raspberry Pi Zero](https://www.packtpub.com/hardware-and-creative/building-smart-homes-raspberry-pi-zero?utm_source=github&utm_medium=repository&utm_content=9781786466952),published by Packt.It contains all the supporting
project files necessary to work through the book from start to finish.

## Instructions and Navigation
All of the code is organized into folders.Each folder starts with a number followed by the application name.
The commands and instructions will look like the following:
```
var sensor = {
initialize: function () {
return sensorLib.initialize(11, 4);
},
read: function () {
var readout = sensorLib.read();
console.log('Temperature: ' + readout.temperature.toFixed(2) +
'C, ' +
'humidity: ' + readout.humidity.toFixed(2) + '%');
setTimeout(function () {
sensor.read();
}, 2000);
}
};
if (sensor.initialize()) {
sensor.read();
} else {
console.warn('Failed to initialize sensor');
}
```
## Note:
Chapter 01 do not have code files.


## Related products:
* [Raspberry Pi for Secret Agents](https://www.packtpub.com/hardware-and-creative/raspberry-pi-secret-agents?utm_source=github&utm_medium=repository&utm_content=9781849695787)
* [Raspberry Pi Cookbook for Python Programmers](https://www.packtpub.com/hardware-and-creative/raspberry-pi-cookbook-python-programmers?utm_source=github&utm_medium=repository&utm_content=9781849696623)
* [Raspberry Pi Home Automation with Arduino](https://www.packtpub.com/hardware-and-creative/raspberry-pi-home-automation-arduino?utm_source=github&utm_medium=repository&utm_content=9781849695862)
### Download a free PDF

 <i>If you have already purchased a print or Kindle version of this book, you can get a DRM-free PDF version at no cost.<br>Simply click on the link to claim your free PDF.</i>
<p align="center"> <a href="https://packt.link/free-ebook/9781786466952">https://packt.link/free-ebook/9781786466952 </a> </p>