# Country Select JS
A jQuery plugin for selecting a country, based on the excellent [International Telephone Input](https://github.com/Bluefieldscom/intl-tel-input.git) plugin. It adds a flag dropdown to any input, which lists all the countries in English and the predominant national language next to their flags.

![alt tag](https://raw.github.com/mrmarkfrench/country-select-js/master/screenshot.png)


## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Options](#options)
- [Public Methods](#public-methods)
- [Static Methods](#static-methods)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Attributions](#attributions)


## Demo
Try it for yourself using the included demo.html.


## Features
* Automatically select the country as the user types
* Navigate the country dropdown by typing a country's name, or using up/down keys
* Selecting a country from the dropdown will update the country name in the input
* Dropdown appears above or below the input depending on available space/scroll position
* Lots of initialisation options for customisation, as well as public methods for interaction
* Can optionally update a related field with the two-letter ISO country code on selection

## Getting Started
1. Download the [latest version](https://github.com/mrmarkfrench/country-select-js/archive/master.zip)

2. Link the stylesheet (note that this references the image flags.png)
  ```html
  <link rel="stylesheet" href="build/css/countrySelect.css">
  ```

3. Add the plugin script and initialise it on your input element
  ```html
  <input type="text" id="country">
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="build/js/countrySelect.min.js"></script>
  <script>
    $("#country").countrySelect();
  </script>
  ```
  
4. Optional: add an extra input field (with type hidden or text) named the same as your selector input appended with "_code". This will automatically be updated with the [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code for the selected country.
  ```html
  <input type="text" id="country" />
  <input type="hidden" id="country_code" />
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="build/js/countrySelect.min.js"></script>
  <script>
    $("#country").countrySelect();
  </script>
  ```


## Options
Pass an (optional) object as a parameter to the `countrySelect` method when initializing the selector.
  ```
  $("#country").countrySelect({
    defaultCountry: "jp",
    onlyCountries: ['us', 'gb', 'ch', 'ca', 'do', 'jp'],
    preferredCountries: ['ca', 'gb', 'us'],
    responsiveDropdown: true
  });
  ```

Note: any options that take country codes should be lower case [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes  

**defaultCountry**  
Type: `String` Default: `""`  
Set the default country by it's country code. Otherwise it will just be the first country in the list.

**onlyCountries**  
Type: `Array` Default: `undefined`  
Display only the countries you specify. Takes an array of country codes.

**excludeCountries**  
Type: `Array` Default: `undefined`  
Display only the countries you specify. Takes an array of country codes.

**preferredCountries**  
Type: `Array` Default: `["us", "gb"]`  
Specify the countries to appear at the top of the list.

**responsiveDropdown**  
Type: `Boolean` Default: `false`  
Set the dropdown's width to be the same as the input. This is automatically enabled for small screens.


## Public Methods
**destroy**  
Remove the plugin from the input, and unbind any event listeners.  
```js
$("#country").countrySelect("destroy");
```

**getSelectedCountryData**  
Get the country data for the currently selected flag.  
```js
var countryData = $("#country").countrySelect("getSelectedCountryData");
```
Returns something like this:
```js
{
  name: "Afghanistan (‫افغانستان‬‎)",
  iso2: "af",
}
```

**selectCountry**  
Change the country selection (e.g. when the user is entering their address).  
```js
$("#country").countrySelect("selectCountry", "gb");
```

**setCountry**  
Insert a country name, and update the selected flag accordingly.  
```js
$("#country").countrySelect("setCountry", "United States");
```


## Static Methods
**getCountryData**  
Get all of the plugin's country data.  
```js
var countryData = $.fn.countrySelect.getCountryData();
```
Returns an array of country objects:
```js
[{
  name: "Afghanistan (‫افغانستان‬‎)",
  iso2: "af",
}, ...]
```

**setCountryData**  
Set all of the plugin's country data.  
```js
$.fn.countrySelect.setCountryData(countryData);
```


## Troubleshooting
**Image path**  
Depending on your project setup, you may need to override the path to flags.png in your CSS.  
```css
.country-select-input .flag {background-image: url("path/to/flags.png");}
```

**Full width input**  
If you want your input to be full-width, you need to set the container to be the same i.e.
```css
.country-select-input {width: 100%;}
```

**Input margin**  
For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want vertical margin, you should add it to the container (with class `country-select-input`).

**Displaying error messages**  
If your error handling code inserts an error message before the `<input>` it will break the layout. Instead you must insert it before the container (with class `country-select-input`).

**Dropdown position**  
The dropdown should automatically appear above/below the input depending on the available space. For this to work properly, you must only initialise the plugin after the `<input>` has been added to the DOM.

## Contributing
Contributions and improvements to the library are welcome! For instructions on contributing to a project on Github, see this guide: [Fork A Repo](https://help.github.com/articles/fork-a-repo).

If you are treating the library as a Node package, the following will be relevant to you.
> To start a local devserver with source code live reload install the dependencies with:
>
> ```
> $ npm install
> ```
>
> And run:
>
> ```
> $ gulp
> ```
>
> To transpile the scss source, minify and prepare your changes at src to build run:
>
>```
> $ gulp build
> ```

## Attributions
* This library is built based on the excellent [International Telephone Input](https://github.com/Bluefieldscom/intl-tel-input.git), the authors of which deserve any credit you might like to give (though none of the blame)
* Flag images and CSS from [Region-Flags](https://github.com/behdad/region-flags)
* Original country data from mledoze's [World countries in JSON, CSV and XML](https://github.com/mledoze/countries)
