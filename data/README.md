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

The experiment have been executed several times, the results are in the folders "1", "2", ...
The first time the difficulty was a little undervalued (it was set to 27Mh, now it is 28MH).

Number of the last mined block after the first step of the experiment :

* 40 then 1
  1. block #238
* 40 then 4
  1. block #253
* 40 then 10
  1. block #245
