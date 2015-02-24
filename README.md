# ChasingPhantoms
_Chasing Phantoms_ is a mildly-entertaining HTML/Javascript game.

An invisible object is in orbit around your screen.  Click where you believe the object should be and it will appear briefly, confirming whether you hit or miss and potentially betraying its speed and orbit radius.  You cannot click during this period of visibility.

The score, a simple count of hits and misses, is kept in the lower-right corner.

Every fifteen seconds, the center, radius, and speed of orbit changes randomly.  The time until the next change _should_ probably get dropped into the scoreboard or the change signaled somehow, but that's not the case at this time.  The timer is also hard-coded at this time, though can easily be scaled to the user's skill or randomized.
