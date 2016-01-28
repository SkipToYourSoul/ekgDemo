/**
 * 定义Graph和Community类
 */

var Graph = {
	createNew : function() {
		var graph = {};

		graph.nodeAdj = {};
		graph.nodeNum = 0; // cache the node size
		graph.nodeWeight = {};
		graph.nodeSelfWeight = {};
		graph.edges = {};
		graph.edgeNum = 0; // cache the edge num, exclude self loops
		graph.totalWeight = 0;
		graph.addEdge = function(id, start, end, weight) {
			if (this.existEdge(start, end))
				return

			this.totalWeight += weight;
			if (start == end) {
				this.nodeSelfWeight[start] = weight;
				this.insertNode(start, weight);
			} else {
				this.edgeNum++;
				this.edges[id] = [ id, start, end, weight ];
				this.installNodeEdge(start, id, end, weight);
				this.installNodeEdge(end, id, start, weight);
			}
		};
		graph.existEdge = function(start, end) {
			if (this.nodeAdj.hasOwnProperty(start)
					&& this.nodeAdj[start].hasOwnProperty(end))
				return true;
			return false;
		};
		graph.insertNode = function(node, w) {
			if (!this.nodeAdj.hasOwnProperty(node)) {
				this.nodeAdj[node] = {};
				this.nodeNum++;
				this.nodeWeight[node] = 0.0;
			}
			this.nodeWeight[node] += w;
		};
		graph.installNodeEdge = function(node, edgeID, end, weight) {
			this.insertNode(node, 0);
			if (!this.nodeAdj[node].hasOwnProperty(end)) {
				this.nodeAdj[node][end] = edgeID;
				this.nodeWeight[node] += weight;
			}
		};
		graph.getSelfWeight = function(node) {
			if (this.nodeSelfWeight.hasOwnProperty(node))
				return this.nodeSelfWeight[node];
			else
				return 0.0;
		};
		graph.getTotalWeight = function() {
			return this.totalWeight;
		};
		graph.nodeArr = function() {
			var temp = [];
			for ( var key in this.nodeAdj)
				temp.push(key);
			return temp;
		};
		/*
		 * 直接返回nodeAdj?这样可以避免一个loop
		 */
		graph.nodes = function() {
			/*
			 * modify: xiafan var temp = []; for(var key in this.nodeAdj)
			 * temp.push(key); return temp;
			 */
			return this.nodeAdj;
		};
		// 修改了输出格式，之后注意 nei_node -> edge
		graph.neighbours = function(node) {
			var neighbour = {};
			for ( var key in this.nodeAdj[node]) {
				temp = this.nodeAdj[node][key];
				neighbour[key] = temp;
			}
			return neighbour;
		};
		graph.neighWeight = function(node) {
			return this.nodeWeight[node];
		};
		graph.getEdge = function(id) {
			return this.edges[id];
		};
		graph.nodeSize = function() {
			/*
			 * var count = 0; for(n in this.nodeAdj){
			 * if(this.nodeAdj.hasOwnProperty(n)) count++; } return count;
			 */
			return this.nodeNum;
		};
		graph.edgeSize = function() {
			/*
			 * var count = 0; for(n in this.edges){
			 * if(this.edges.hasOwnProperty(n)) count++; } return count;
			 */
			return this.edgeNum;
		};

		return graph;
	}
};

var Community = {
	createNew : function(graph, min_modularity, minC, maxLevel) {
		var comm = {};

		comm.g = graph;
		comm.min_modularity = min_modularity;
		comm.minC = minC;
		comm.maxLevel = maxLevel;
		comm.n2c = {};
		comm.tot = {};
		comm.inw = {};
		comm.neigh_weight = {};
		comm.neigh_last = 0;
		comm.neigh_pos = {};

		comm.clone=function(){
			var ret = Community.createNew(this.g, this.min_modularity, this.minC, this.maxLevel);
			$.extend(ret.n2c, this.n2c);
			$.extend(ret.tot, this.tot);
			$.extend(ret.inw, this.inw);
			$.extend(ret.neigh_weight, this.neigh_weight);
			$.extend(ret.neigh_last, this.neigh_last);
			$.extend(ret.neigh_pos, this.neigh_pos);
			return ret;
		};
		comm.init_comm = function() {
			for ( var key in this.g.nodes()) {
				// var node = this.g.nodes()[key];
				var node = key;
				this.n2c[node] = node;
				this.tot[node] = this.g.neighWeight(node);
				this.inw[node] = this.g.getSelfWeight(node);
				this.neigh_weight[node] = -1;
			}
		};
		comm.modularity_gain = function(node, comm, dnodecomm, w_degree) {
			var totc = this.tot[comm];
			m2 = this.g.getTotalWeight() * 2;
			return dnodecomm - totc * w_degree / (m2);
		};
		comm.remove = function(node, comm, dnodecomm) {
			this.tot[comm] -= this.g.neighWeight(node);
			this.inw[comm] -= 2 * dnodecomm + this.g.getSelfWeight(node);
			this.n2c[node] = -1;
		};
		comm.insert = function(node, comm, dnodecomm) {
			this.tot[comm] += this.g.neighWeight(node);
			this.inw[comm] += 2 * dnodecomm + this.g.getSelfWeight(node);
			this.n2c[node] = comm;
		};
		comm.modularity = function() {
			var q = 0;
			m2 = this.g.getTotalWeight() * 2;
			for ( var key in this.g.nodes()) {
				// var node = this.g.nodes()[key];
				var node = key;
				if (this.tot[node] > 0)
					q += this.inw[node] / m2 - (this.tot[node] / m2)
							* (this.tot[node] / m2);
			}
			return q;
		};
		comm.neigh_comm = function(node) {
			for ( var i = 0; i < this.neigh_last; i++)
				this.neigh_weight[this.neigh_pos[i]] = -1;
			this.neigh_last = 0;
			this.neigh_pos[0] = this.n2c[node];
			this.neigh_weight[this.neigh_pos[0]] = 0;
			this.neigh_last = 1;
			var neighbour = this.g.neighbours(node);
			for ( var key in neighbour) {
				edge = this.g.getEdge(neighbour[key]);
				neigh_comm = this.n2c[key];
				neigh_w = edge[3];
				if (neighbour[key] != node) {
					if (this.neigh_weight[neigh_comm] == -1) {
						this.neigh_weight[neigh_comm] = 0;
						this.neigh_pos[this.neigh_last] = neigh_comm;
						this.neigh_last += 1;
					}
					this.neigh_weight[neigh_comm] += neigh_w;
				}
			}
		};
		comm.oneLevel = function() {
			var improvement = false;
			var nb_moves = 0;
			var nb_pass_done = 0;
			var new_mod = this.modularity();
			var size = this.g.nodeSize();

			var random_order = [];
			for ( var key in this.g.nodes()) {
				// var node = this.g.nodes()[key];
				var node = key;
				random_order.push(node);
			}

			// 对node列表进行随机排列，算法变成了随机算法。
			for ( var i = 0; i < size; i++) {
				var random_pos = Math.floor(Math.random() * (size - i - 1)) + i;
				var tmp = random_order[i];
				random_order[i] = random_order[random_pos];
				random_order[random_pos] = tmp;
			}
			var cont = true;
			while (cont) {
				var cur_mod = new_mod;
				nb_moves = 0;
				nb_pass_done += 1;
				for ( var node_tmp = 0; node_tmp < size; node_tmp++) {
					var node = random_order[node_tmp];
					var node_comm = this.n2c[node];
					var w_degree = this.g.neighWeight(node);
					this.neigh_comm(node);
					this.remove(node, node_comm, this.neigh_weight[node_comm]);
					var best_comm = node_comm;
					var best_nblinks = 0;
					var best_increase = 0;
					for ( var i = 0; i < this.neigh_last; i++) {
						var increase = this.modularity_gain(node,
								this.neigh_pos[i],
								this.neigh_weight[this.neigh_pos[i]], w_degree);
						if (increase > best_increase) {
							best_comm = this.neigh_pos[i];
							best_nblinks = this.neigh_weight[this.neigh_pos[i]];
							best_increase = increase;
						}
					}
					//var test_mod = this.modularity();
					this.insert(node, best_comm, best_nblinks);
					if (best_comm != node_comm)
						nb_moves += 1;
				}
				new_mod = this.modularity();
				if (nb_moves > 0)
					improvement = true;
				if (improvement && (new_mod - cur_mod) > this.min_modularity)
					cont = true;
				else
					cont = false;
			}
			return improvement;
		};
		comm.printCommunity = function() {
			var temp = {};
			for ( var key in this.g.nodes()) {
				// var node = this.g.nodes()[key];
				var node = key;
				temp[node] = this.n2c[node];
			}
		};
		comm.getNextCommTask = function(edgeCount) {
			var newEdgeMap = {};
			for ( var key in this.g.nodes()) {
				// var node = this.g.nodes()[key];
				var node = key;
				var neighbour = this.g.neighbours(node);
				for ( var edgePair in neighbour) {
					var edge = this.g.getEdge(neighbour[edgePair]);
					var oCluster = this.n2c[edgePair];
					var newNode = [ this.n2c[node], oCluster ];
					if (newEdgeMap.hasOwnProperty(newNode))
						newEdgeMap[newNode] += edge[3];
					else
						newEdgeMap[newNode] = edge[3];
				}
			}
			var graph = Graph.createNew();
			var i = edgeCount + 1;
			for ( var key in newEdgeMap) {
				var start = "";
				var end = "";
				var count = 0;
				for ( var i = 0; i < key.length; i++) {
					if (key[i] == ',')
						count = i;
				}
				start = key.substring(0, count);
				end = key.substring(count + 1, 1000);
				var weight = newEdgeMap[key];
				graph.addEdge(i, start, end, weight);
				i++;
			}
			var com = Community.createNew(graph, this.min_modularity,
					this.minC, this.maxLevel);
			return com;
		};
		comm.clusterSize = function() {
			var cluster = {};
			for ( var node in this.n2c) {
				var clus = this.n2c[node];
				if (!cluster.hasOwnProperty(clus))
					cluster[clus] = 1;
			}
			var count = 0;
			for ( var key in cluster) {
				count++;
			}
			return count;
		};
		comm.startCluster = function() {
			this.init_comm();
			this.oneLevel();
			
			var edgeCount = 0;
			var curTask = this;
			var i = 1;
			var minCom = curTask.clone();
			var minGap = Math.abs(curTask.clusterSize() - this.minC);
			while (minGap > 2 && i++ < 5) {
				curTask.init_comm();
				curTask.oneLevel();
				var gap = Math.abs(curTask.clusterSize() - this.minC);
				if (gap < minGap){
					minCom = curTask.clone();
					minGap = gap;
				}
			}
			
			var cMapChain = [];
			curTask=minCom;
			this.n2c = minCom.n2c;
			cMapChain.push(minCom.n2c);
			
			while (curTask.clusterSize() > this.minC && i < this.maxLevel) {
				curTask.printCommunity();
				edgeCount += this.g.edgeSize();
				curTask = curTask.getNextCommTask(edgeCount);
				curTask.init_comm();
				curTask.oneLevel();
				var gap = Math.abs(curTask.clusterSize() - this.minC);
				if (gap > minGap){
					break;
				}
				cMapChain.push(curTask.n2c);
				i++;
			}
			
			
			var lastMap = cMapChain.pop();
			while (cMapChain.length > 0) {
				var topMap = lastMap;
				lastMap = cMapChain.pop();
				for ( var key in lastMap) {
					if (topMap.hasOwnProperty(lastMap[key]))
						lastMap[key] = topMap[lastMap[key]];
				}
			}
			return lastMap;
			// nodeToComm = lastMap;
			// curTask.printCommunity();
		};

		return comm;
	}
};