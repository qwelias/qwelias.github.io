## Visual keyboard interface

## The Problem
I see two types of software interfaces:
1. visual interactive elements for mouse/touch
    - hopefully intuitive
1. keyboard
    - cli
    - shortcuts
        - could be generic ones like `ctrl+c`, `ctrl+f`, `esc`, `tab`, etc
        - could be specific per app

While first type is very easy to start with many would say that it becomes a bottleneck in terms of performance once you know very well what you want to do.

In an ideal world I'd like to have a performance of keyboard-based interface with low learning curve and intuitiveness of mouse/touch interface. Sounds like it's impossible and it probably is unless we can upload all keyboard shortcuts straight into the brain Matrix-style, but at that point we'd probably already have a neural interface, so...

## Enter my iMaGiNaTiOn
Remember how Apple made a touch display bar above the keyboard? Yeah.

Here's some ideas based on that in the order of ridiculouseness:
1. Use it to display some useful information about kb shortcuts based on the app in-focus. What is useful information you ask? Well idk, probably depends on the app and have to be provided by developers, but maybe:
    - most common ones to incline more users to start using kb
    - most rare ones for advanced users to discover something new
    - based on the current app activity, e.g.:
        - if you're on input field suggest `ctrl+v`
        - if you're selecting text suggest `ctrl+c`
1. Make all keyboard keys touch sensitive (lol)! So when you just touch a key or a combination of keys the display bar will:
    - display info about what the key or a combo would do
    - display info about shortcuts that could be combined using the key(s), e.g.:
        - if touching `ctrl` suggest `v` for paste or `c` for copy
1. Highlight keys that could be used for something with keyboard backlight:
    - would work great with the first idea for increased visibility
    - could highlight extra keys from second idea

Of course nothing of that would work out of the box, some of it could be done using man pages or existing autosuggest scripts for cli tools, but for the most part it'd require developers to provide this functionality, especially if it's based on current activity.

## Welp, nice try
So in order to implement something like this into the real world we need:
- mass market users that want to start using keyboard shortcuts more
- someone big to drive it
- hardware support
- OS support
- software support

_Highly unlikely to happen if you ask me, so go back to memorizing those shortcuts or clicking your mouse :)_
