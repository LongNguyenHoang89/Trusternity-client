## Simulation on Grid5000

### Overview

Deployment of a private network of 40 ethereum nodes (full) and 1 bootnode. The 40 nodes mined for 1h, then some of them are switched off and the remaining ones continued to mine for 1 additional hour.
At the end, we retrieved the information of all the mined blocks.

One experiment consists of running this process 19 times : 40 nodes then [1..19] nodes.


### Hardware

All the ethereum nodes ran on the "graphene" cluster of Grid5000 with these hardware specs :
  - 1 CPU Intel Xeon X3440, 4 cores/CPU, 16GB RAM (per physical node)

For this experiment we reserved 11 physical nodes (10 for the ethereum nodes and one for the bootnode). Four virtual nodes were deployed on one physical node, each virtual node ran an ethereum node.

### Software

Deployment of one lxc image built with Ansible (configuration manager) on each virtual node.

### Ethereum network

The statistics of 40 ethereum nodes mining (CPU Mining) are the following :

* Average network hashrate : ~ 2MH/s - 2.3MH/s
* Difficulty : ~ 27.5MH - 28.7MH
* Average block time : ~ 12.5s - 13.5s

### Results

The experiment has been executed several times, the results are in the folders "1", "2", ...
The difficulty for the first experiment was set to 27MH. We notice that it was a little undervalued, so it has been set to 28MH for the next experiments.

The following table presents the numbers of the last mined block after the first step of the experiment (i.e after 1 hr)

| Number of mining nodes | Exp 1 | Exp 2 | Exp 3 | Exp 4 | Exp 5 | Exp 6 (2*30min) | Exp 7 | Exp 8 |
|:----------------------:|------:|------:|------:|------:|------:|----------------:|------:|------:|
|       40 then 1        |   238 |   234 |   219 |   236 |   250 |                 |       |       |
|       40 then 2        |     ● |   244 |     ● |     ● |     ● |             113 |       |       |
|       40 then 3        |     ● |   232 |     ● |     ● |     ● |             115 |       |       |
|       40 then 4        |   253 |   232 |   243 |   222 |   246 |                 |       |       |
|       40 then 5        |     ● |   253 |     ● |     ● |     ● |                 |       |       |
|       40 then 6        |     ● |   226 |     ● |     ● |     ● |                 |       |       |
|       40 then 7        |     ● |   252 |     ● |     ● |     ● |                 |       |       |
|       40 then 8        |     ● |   218 |     ● |     ● |     ● |                 |       |       |
|       40 then 9        |     ● |   265 |     ● |     ● |     ● |                 |   232 |   227 |
|       40 then 10       |   245 |   245 |   223 |   262 |   226 |                 |       |       |
|       40 then 11       |     ● |   230 |     ● |     ● |     ● |                 |       |       |
|       40 then 12       |     ● |   251 |     ● |     ● |     ● |                 |       |       |
|       40 then 13       |     ● |   245 |     ● |     ● |     ● |                 |       |       |
|       40 then 14       |     ● |   227 |     ● |     ● |     ● |                 |       |       |
|       40 then 15       |     ● |   218 |     ● |     ● |     ● |                 |   209 |   245 |
|       40 then 16       |     ● |   239 |     ● |     ● |     ● |                 |       |       |
|       40 then 17       |     ● |   223 |     ● |     ● |     ● |                 |       |       |
|       40 then 18       |     ● |   253 |     ● |     ● |     ● |                 |   248 |       |
|       40 then 19       |     ● |   251 |     ● |     ● |     ● |                 |   238 |       |
