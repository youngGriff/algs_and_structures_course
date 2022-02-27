// Поиск в ширину в графе

const graph = {}
graph.a = ['b', 'c']
graph.b = ['f']
graph.c = ['d', 'e']
graph.d = ['f']
graph.e = ['f']
graph.f = ['g']

function breadthSearch(graph, start, end) {
    let queue = []
    queue.push(start)
    const prevMap = {};
    while (queue.length > 0) {
        const current = queue.shift()
        if (!graph[current]) {
            graph[current] = []
        }
        Object.values(graph[current]).forEach(item => prevMap[item] = current);
        if (graph[current].includes(end)) {
            return getPath(prevMap, start, end);
        } else {
            queue = [...queue, ...graph[current]]
        }
    }
    return [];
}

function getPath(prevMap, start, end) {
    let currentNode = end;
    const path = [];
    path.push(end);
    while (currentNode !== start) {
        currentNode = prevMap[currentNode];
        path.push(currentNode);
    }

    return path;
}

console.log(breadthSearch(graph, 'a', 'g'))
