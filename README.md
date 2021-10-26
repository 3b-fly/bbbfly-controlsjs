3b-fly's alternative Controls.js build
===========

### Source structure

- **original** - Original Controls.js files. Use these files to check the right Controls.js library subversion.
- **alternative** - Copy these files into Controls.js library directory to alternative build.


### Grunt tasks and build structure


- **build content**

| task            | build path     | content                                                     |
| --------------- | -------------- | ----------------------------------------------------------- |
| lib_hammerjs    | hammerjs.js    | [Hammer.js library](http://eightmedia.github.com/hammer.js) |           |
| lib_fontloader  | fontloader.js  | [FontLoader.js library](https://github.com/smnh/FontLoader) |
| loader          | loader.js      | basic Controls.js application loader                        |
| controls        | controls.js    | Controls.js core                                            |
| langs           | lang/??.js     | Controls.js language resources                              |

### Controls.js packages

| package         | requires                                                                     |
| --------------- | ---------------------------------------------------------------------------- |
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
