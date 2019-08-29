# vplan

## kurzinfo

shell scripts für web untis, erkennt neue items und generiert dann einen rss feed und eine statische html seite, macht auch eine get request (mit curl) an `$beliebige_api` z.b. für benachrichtigungen auf dem handy oder so.

## mehr info

auf der generierten html seite werden vergangene meldungen sowie heutige meldungen, wenn es nach 17 uhr ist, versteckt/weggefiltert, zudem kann jeder besucher eigene filter festlegen, die werden dann im localstorage gespeichert. beim ersten festlegen der filter wird eine kleine hilfe in einer alert box angezeigt (auf englisch, warum auch immer).

## setup

> feed.rss und index.html sind beispieldateien

verschiedene variablen müssen in vp.sh, script.js und feed.rss angegeben werden. index.html, script.js und feed.rss dann am besten mit `$webserver` hosten, **aber nicht** im gleichen verzeichnis.
um den rss feed zu aktualisieren und die html seite zu generieren, geht vp.sh von bestimmten vorraussetzungen für `$rssfile` und `$htmlfile` aus.

für `$htmlfile`: `<div id="c">` muss auf linie 9 sein, wenn "`sed 9q`" in vp.sh nicht angepasst wurde.

für `$rssfile`: 2 linien über `<guid>` muss der `<item>` tag sein, 4 linien unter `<guid>` muss der `</item>` tag sein, sofern nicht in vp.sh angepasst.

### dependencies

iconv, diff, curl und jq

der `sed -r` command (im oneliner) braucht `sed 4.7` damit er funktioniert, sonst wird spezieller (aber nicht seltener!) input nicht richtig formatiert.

## sonstiges

fyi, das ist alles etwas fragil, da schon *ein* verändertes merkmal im input das regex matching kaputt machen kann, deswegen bleibt es in der dauerbeta™.

die in-code documentation ist auf englisch, warum auch immer.
