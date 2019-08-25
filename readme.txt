> wasn das?
shell scripts für web untis, erkennt neue items und generiert dann einen rss feed und eine statische html seite, macht auch eine get request (mit curl) an $beliebige_api z.b. für benachrichtigungen auf dem handy oder so.

> mehr info?
auf der generierten html seite werden vergangene meldungen sowie heutige meldungen, wenn es nach 17 uhr ist, versteckt/weggefiltert, zudem kann jeder besucher eigene filter festlegen, die werden dann im localstorage gespeichert. beim ersten festlegen der filter wird eine kleine hilfe in einer alert box angezeigt (auf englisch, warum auch immer).

> setup?
verschiedene variablen müssen in vp.sh, script.js und feed.rss angegeben werden. index.html, script.js und feed.rss dann am besten mit $webserver hosten.

> sonstiges?
fyi, das ist alles ein wenig hacky und in der dauerbeta also nicht für sonderlich wichtige dinge geeignet.

die in-code documentation ist auf englisch, warum auch immer.

das war's.
