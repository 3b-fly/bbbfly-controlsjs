3b-fly's alternative Controls.js build
===========

### Source structure

- **original** - Original Controls.js files. Use these files to check the right Controls.js library subversion.
- **alternative** - Copy these files into Controls.js library directory to alternative build.


### Grunt tasks and build structure


- **basic tasks**

| task            | build path     | content                                                     |
| --------------- | -------------- | ----------------------------------------------------------- |
| lib_hammerjs    | hammerjs.js    | [Hammer.js library](http://eightmedia.github.com/hammer.js) |
| lib_knockout    | knockout.js    | [Knockout.js library](http://knockoutjs.com/)               |
| lib_fontloader  | fontloader.js  | [FontLoader.js library](https://github.com/smnh/FontLoader) |
| loader          | loader.js      | basic Controls.js application loader                        |
| controls        | controls.js    | Controls.js core                                            |
| controls-ui-raw | controls-ui.js | Controls.js UI components                                   |
| controls-ui     | controls-ui.js | **controls-ui-raw** + **lib_hammerjs**                      |
| langs           | lang/??.js     | Controls.js language resources                              |
| designinfo      | designinfo.js  | Controls.js FormEditor design info                          |
| clean           | -              | deletes all build files                                     |

- **main tasks**

| task            | content                                                                      |
| --------------- | ---------------------------------------------------------------------------- |
| debug           | loader + controls + controls-ui + langs + designinfo                         |
| release         | loader + controls + controls-ui + langs + designinfo                         |
| default         | debug + release                                                              |


### Controls.js packages

| package         | requires                                                                     |
| --------------- | ---------------------------------------------------------------------------- |
| DesignInfo      |                                                                              |
| Lang EN         |                                                                              |
| Lang CS         |                                                                              |
| Lang SK         |                                                                              |
| Loader          |                                                                              |
| Controls.js     | Loader, Lang EN                                                               |
| Controls.js UI  | Controls.js                                                                  |


### Controls.js

- [Controls.js web page](http://controlsjs.com/)
- [Controls.js on GitHub](https://github.com/controlsjs/controls.js)

<br/>
<br/>

> ### License
> Comply with [MIT License](https://mit-license.org/) for use.<br/>
