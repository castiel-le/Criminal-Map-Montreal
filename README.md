# 520-Project-Le-Louis

A full-stack MERN application with visualization of the given dataset, as well as some performance considerations

## Dataset 
Taken from Montreal's website [Montreal Crime Dataset](https://donnees.montreal.ca/ville-de-montreal/actes-criminels).

## Lighthouse
We got an overall performance of 99 with a speed index of 97, an accessibility 90, a best practices of a 100, all other score were in the green. Time to interactive is 0.8 s and speed index of 0.9 s. The largest Contentful Paint took 1.3 s.

## Network 
### No Throttling && disabled cache

DOMContentLoad 616 ms and load 1.07 s.

The first query to the network take 93 ms and then takes longer as we move (goes up to 3.5 s when zooming out).

### No Throttling && disabled cache
DOMContentLoaded 283 ms and Load 492 ms.

Showing to be significantly faster with the cache enabled, the first query takes 2 ms and it goes up to 2.42 s when zooming out. 

### Slow 3G && disabled cache
DOMContentLoaded takes 6.30 s and load 13.98 s

first query take  2.16 s showing a significant difference with no throttling. Then it goes upt to 4.25 second for another. We can also see a significant change in the download of the content in the queries wichi take 2.10 s (1.30 s longer than before).

### Slow 3G && enable cache
DOMContentLoaded 2.32 s and Load 2.49 s

It's a lot faster with the cache enabled like we can see with the nearly 4 seconds of difference in the DOMContentLoaded.

The first query takes around 3 ms the ngoes up to 14 s when zooming out.

## Performance 
A lot of dropped frame when we move around (High cpu activity and network activity, it takes around 5.10 s(146.24 ms network transfe + 4.95 s resource loading) to fetch the data)

CPU is maxed out at the scripting and goes high for the loading.

Performance is better in incognito, it loads a lot faster. The frame are dropped a lot faster than in the regullar browser window. 
(High network activity but a lot fasster than the regular window(it takes around 913.55ms (518.55 ms network transfer + 394.73 ms resource loading) to fetch the data)).