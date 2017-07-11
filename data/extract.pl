$max = 4000000;
$counter = 44004;
$interval = 1000;

while($counter < $max){    
    $end = $counter + $interval;
    system("node extract.js $counter $end");
    $counter = $end;
}