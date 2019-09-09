# vplan

## kurzinfo

shell scripts für web untis, erkennt neue items und generiert dann einen rss feed und eine statische html seite, macht auch eine get request (mit curl) an `$beliebige_api` z.b. für benachrichtigungen auf dem handy oder so.

## mehr info

auf der generierten html seite werden vergangene meldungen sowie heutige meldungen, wenn es nach 17 uhr ist, versteckt/weggefiltert, zudem kann jeder besucher eigene filter festlegen, die werden dann im localstorage gespeichert.

## setup

> feed.rss und index.html sind beispieldateien

verschiedene variablen müssen in vp.sh, script.js und feed.rss angegeben werden. html, css und js sowie feed.rss dann am besten mit `$webserver` hosten, **aber nicht** im gleichen verzeichnis.

```
vp.sh (die ersten beiden auch für script.js)
------
fullurl # idR die url zum vertretungsplan "hauptinterface" der schule. falls die hinter http basic auth sitzt, müssen user und pass in der url gegeben werden
classfile # findet man idR unter $fullurl/w/w000* muss man halt gucken, welche datei zu welcher klasse gehört
apicall # optional, curl macht eine get request an diese url, die neuen items werden direkt hinten an die url angefügt
rssfile & htmlfile # pfad zu feed.rss und index.html
rsslinkto # wo der rss feed hinlinkt
```

um den rss feed zu aktualisieren und die html seite zu generieren, geht vp.sh von bestimmten vorraussetzungen für `$rssfile` und `$htmlfile` aus.

für `$htmlfile`: `<div id="c">` muss auf linie 18 sein, wenn "`sed 18q`" in vp.sh nicht angepasst wurde.

für `$rssfile`: 2 linien über `<guid>` muss der `<item>` tag sein, 4 linien unter `<guid>` muss der `</item>` tag sein, sofern nicht in vp.sh angepasst.

### dependencies

iconv, diff, curl und jq

der `sed -r` command (im oneliner) braucht `sed 4.7` damit er funktioniert, sonst wird spezieller (aber nicht seltener!) input nicht richtig formatiert.

wenn's diese version nicht in den repos gibt, compilen [how-to](https://askubuntu.com/questions/1107139/how-to-upgrade-sed-to-4-5-on-ubuntu-server-18-04).

dann folgendes oben in vp.sh einfügen:
```
shopt -s expand_aliases
alias sed=$pfad_zu_sed47_binary
```

## sonstiges

fyi, das ist alles etwas fragil, da schon *ein* verändertes merkmal im input das regex matching kaputt machen kann, deswegen bleibt es in der dauerbeta™.

seit commit 1b06bdd sind die chars `( ) :` "illegal" und werden rausgefiltert, da die das regex matching kaputt machen.

die in-code documentation ist auf englisch, warum auch immer.

bild von der generierten statischen html seite:

<img src="https://i.imgur.com/5mUk4nE.png" alt="die statische html seite">
