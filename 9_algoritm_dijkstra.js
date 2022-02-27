// Поиск кратчайшего пути в графе

const graph = {}
graph.a = {b: 2, c: 1}
graph.b = {f: 7}
graph.c = {d: 5, e: 2}
graph.d = {f: 2}
graph.e = {f: 1}
graph.f = {g: 1}
graph.g = {}

function shortPath(graph, start, end) {
    const costs = {}
    const processed = []
    let neighbors = {}
    const previous = {};
    Object.keys(graph).forEach(node => {
        if (node !== start) {
            let value = graph[start][node];
            costs[node] = value || Infinity;
            previous[node] = null;
        }
    });
    Object.keys(graph[start]).forEach((vertex) => {
        previous[vertex] = start;
    });
    let node = findNodeLowestCost(costs, processed)
    previous[node] = start;
    while (node) {
        const cost = costs[node]
        neighbors = graph[node]
        Object.keys(neighbors).forEach(neighbor => {
            let newCost = cost + neighbors[neighbor]
            if (newCost < costs[neighbor]) {
                costs[neighbor] = newCost
                previous[neighbor] = node;
            }
        })
        processed.push(node)
        node = findNodeLowestCost(costs, processed)
    }
    const path = [end];

    let currentNode = end;
    while (currentNode !== start) {
        currentNode = previous[currentNode]
        path.unshift(currentNode);
    }
    return { costs, previous, path }
}


function findNodeLowestCost(costs, processed) {
    let lowestCost = Infinity
    let lowestNode;
    Object.keys(costs).forEach(node => {
        let cost = costs[node]
        if (cost < lowestCost && !processed.includes(node)) {
            lowestCost = cost
            lowestNode = node
        }
    })
    return lowestNode
}

console.log(shortPath(graph, 'a', 'g'));
// console.log(dijkstra(graph, "a"))
