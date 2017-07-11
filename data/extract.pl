# Somehow Geth does not response after every 11k request.
# This perl script runs extract.js in a process for every 1000 request.

$max = 4000000;
$counter = 44004;
$interval = 1000;

while($counter < $max){    
    $end = $counter + $interval;
    system("node extract.js $counter $end");
    $counter = $end;
}