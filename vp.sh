#!/bin/bash
# depends on: iconv, diff, curl, jq
# $cachefile needs to exist
# if you don't properly set up the vars below, this is not gonna work.
# the rss update function expects that there are a certain number of lines in $rssfile, else some funtionality may not work properly
set -eu -o pipefail
fullurl="" # full-formed url to untis interface containing http basic auth tokens
apicall="" # curl does a GET request to this url, the new 'data' is appended to this url
classfile="/w/w000XX.htm" # each class has a file
cachefile="./vpold.txt"
compfile="./vpnew.txt"
errlog="./errors"
rssfile="" # path
htmlfile="" # path
rsslinkto=""
rssdate=$(date +%a,-%d-%b-%Y-%T-%z | sed -e 's/-/ /g') # rss lastbuild date
date=$(date +%d.%m)

[[ -f ./lock ]] && echo "lock present" && exit
touch ./lock
rm "$compfile" || true
# supplementary functions for rss and html page generation
rssupd() {
  title="${1:2}"
  content="$1"
  sleep 1
  sed -i '/<\/lastBuildDate>/a\\t\t<item>\n\t\t\t<title>'"$date"': '"$title"'<\/title>\n\t\t\t<guid isPermaLink=\"false\">'"$(date +%s)"'<\/guid>\n\t\t\t<link>'"$rsslinkto"'<\/link>\n\t\t\t<description><![CDATA[<p>'"$content"'<\/p>]]><\/description>\n\t\t\t<pubDate>'"$rssdate"'</pubDate>\n\t\t<\/item>' "$rssfile"
  sed -i "s/<lastBuildDate>.*<\/lastBuildDate>/<lastBuildDate>$rssdate<\/lastBuildDate>/gi" "$rssfile"
  # VERY hacky way to cleanup up rss items older than 3 days
  mapfile -t guids <<< "$(grep -oP '(?<=guid isPermaLink="false">).*(?=</guid>)' "$rssfile")"
  for guid in "${guids[@]}"; do
    if [ "$guid" -lt $(( $(date +%s) - 259200 )) ]; then # if older than 3 days
      linenum=$(grep -n "$guid" "$rssfile" | sed 's/:.*//gi')
      upperlim=$(( $linenum - 2 ))
      lowerlim=$(( $linenum + 4 ))
      sed -i ''"$upperlim"','"$lowerlim"'d' "$rssfile"
    fi
  done
}

htmlgen() {
  file="$1"
  mapfile -t items < "$file"
  sed 9q "$htmlfile" > ./htmlcut
  mv ./htmlcut "$htmlfile"
  for item in "${items[@]}"; do
    echo "<p>""$item""</p>" >> "$htmlfile"
  done
  echo "</div><span id=\"ft\"> powered by sed and js <a id=\"code\" href=\"https://github.com/hyphenc/vplan\">code</a></span><script src=\"./script.js\"></script></body></html>" >> "$htmlfile"
}
# main
# 'magic' oneliner that does all the formatting, you can add your own sed 'substitute' commands in the first sed command
curl -s "$fullurl""$(date +%V)""$classfile" | iconv -f iso-8859-1 -t utf-8 | sed 's/<TR>//gi;/<\/font>.*<\/TD>/d;/<TD.*<font.*/d;1,24d;$d;s/Vtr\. ohne Lehrer/EVA/gi;s/Raum-Vtr\./RVTR/gi;s/Statt-Vertretung/SVTR/gi' | head -n -4 | tr '\r\n' '#' | sed 's/<\/TR>/\n/gi;s/##/ /gi' | sed '1d;s/^ //gi;s/<TD align=center>&nbsp.<\/TD>//gi;s/ \+/ /gi;s/ $//gi;s/ \+x *$//gi' > "$compfile"
if ! [ $(diff -w "$cachefile" "$compfile" > /dev/null 2>&1 ) ]; then
  mapfile -t newitems <<< $(diff -w "$cachefile" "$compfile" | grep -P "[<\>] *")
  for newitem in "${newitems[@]}"; do
    if [ "$(cat -e <<< "$newitem")" = "$" ]; then continue; fi
    formatted=$(sed 's/%1B%5B32m//gi;s/%20%1B%5B0m%0A//gi' <<< "$newitem")
    urlencoded=$(jq -sRr @uri <<< "$formatted")
    rssupd "$formatted" || echo "rssupd error" > "$errlog" && true
    curl "$apicall""$urlencoded"
    sleep 1
  done
  mv "$compfile" "$cachefile"
fi
htmlgen "$cachefile" || echo "htmlgen error" > "$errlog" && true
rm ./lock
