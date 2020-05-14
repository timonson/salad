# salad

various stuff I frequently eat

## Dependencies

To use the `selectModule.sh` script you need `xclip` or `xsel` and `rofi` or
`dmenu` on Linux.

## Usage

With the help of the `selectModule.sh` bash script you can select any **ES
Module** with your favorite _selection app_, e.g. `rofi` or `dmenu`.

Run the script inside the _salad_ repo with:
`./selectModule.sh -c . https://cdn.jsdelivr.net/gh/timonson/salad`. This script
is dependent on the file **getEsModules.js** which is in this repo, too.

If you have `rofi`, start the script and all module exports in this repo are
displayed one below the other.

After you selected an export, it would automatically copy a string like the
following one into your clipboard:

`import { compose } from "https://cdn.jsdelivr.net/gh/timonson/salad@d3d61e7/funFp.js"`

If you want to use the copied module - in the above case `makeEntries` - in the
browser or on `deno`, you can import the module with the copied string
immediately.

## Credit

The most functions here come from various sources from the internet.
