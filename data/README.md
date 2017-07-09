## Simulation on Grid5000

### Overview

Deployment of a private network of 40 ethereum nodes (full) and 1 bootnode and we ran 3 experiments :
* 40 nodes mined for 1h. After that, 10 nodes mined for one additional hour.
* 40 nodes mined for 1h. After that, 4 nodes mined for one additional hour.
* 40 nodes mined for 1h. After that, 1 node mined for one additional hour.


At the end, we retrieved the information of all the mined blocks.

### Hardware

All the ethereum nodes ran on the "graphene" cluster of Grid5000 with these hardware specs :
  - 1 CPU Intel Xeon X3440, 4 cores/CPU, 16GB RAM (per physical node)

For this experiment we reserved 11 physical nodes (10 for the ethereum nodes and one for the bootnode). Four virtual nodes were deployed on one physical node, each virtual node ran an ethereum node.

### Software

Deployment of one lxc image built with Ansible (configuration manager) on each virtual node.

### Ethereum network

40 ethereum nodes mining (CPU Mining) :

* Average network hashrate : ~ 2.2MH/s
* Difficulty : ~ 27MH - 27.5MH
* Average block time : ~ 13s - 14s

### Results

1. 40 then 10
  - "Switching" block : 245
  - Blocks info : see the file "blocks_info_40-10.json"
2. 40 then 4
  - "Switching" block : 253
  - Blocks info : see the file "blocks_info_40-4.json"
3. 40 then 1
  - "Switching" block : 238
  - Blocks info : see the file "blocks_info_40-1.json"

