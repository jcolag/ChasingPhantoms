# ChasingPhantoms
_Chasing Phantoms_ is a mildly-entertaining HTML/Javascript game.  The goal of simplicity was more important than how fun it is, so bear that in mind, here...

An invisible object is in orbit around your screen.  Click where you believe the object should be and it will appear briefly, confirming whether you hit or miss and potentially betraying its speed and orbit radius.  You cannot click during this period of visibility.

The score, a simple count of hits and misses, is kept in the lower-right corner.

Every fifteen seconds, the center, radius, and speed of orbit changes randomly.  The time until the next change _should_ probably get dropped into the scoreboard or the change signaled somehow, but that's not the case at this time.  The timer is also hard-coded at this time, though can easily be scaled to the user's skill or randomized.

## Documentation
This file is authored in [Markdown](http://daringfireball.net/projects/markdown/).  Use the `convert.sh` script (assuming that [Pandoc](http://johnmacfarlane.net/pandoc/) has been installed) to translate it into HTML.  This creates `readme.html`, which is loaded and displayed by the game's _About_ button.

Unless you have installed this, though, you probably already know that last part about the _About_ button, since you probably just clicked it.  Odds are also that you don't care, in that case.

## License
_Chasing Phantoms_ is by [John Colagioia](http://john.colagioia.net), available under the [GNU Affero General Public Licence](https://gnu.org/licenses/agpl.html).
