function knightMoves(startPos, endPos) {
    if (startPos.join() === endPos.join()) return console.log('You are already at that spot!');

    const discoveredNodes = [];
    const queue = [];
    const rootNode = Node(startPos);
    discoveredNodes.push(rootNode);
    queue.push(...generateMoves(rootNode));

    while (queue.length) {
        const currNode = queue.shift();
        // debugger;
        if (isNodeDiscovered(currNode)) continue;
        // debugger;
        discoveredNodes.push(currNode);
        if (isTarget(currNode)) return printPath(currNode);
        queue.push(...generateMoves(currNode));
    }


    //////////////////////////////////////////////////////////////
    function printPath(targetNode) {
        // Path is reversed, because of traversing backwards from target to starting node.
        const reversedPath = [];
        let movesTaken;
        traverse(targetNode);

        if (reversedPath.length === 1) movesTaken = '1 move';
        else movesTaken = `${reversedPath.length} moves`;
        const pathString = reversedPath.reverse().join(' --> ');
        return console.log(
            `You made it in ${movesTaken}!  Here's your path:\r\n(${startPos}) --> ${pathString}`
        );



        function traverse(node) {
            // Traverses the "previous node", from target to the starting node.
            if (!node.prev) return;

            reversedPath.push(`(${node.posX},${node.posY})`);
            traverse(node.prev);
        }
    }
    /////////////////////////////////////////////////////////////
    function isNodeDiscovered(currNode) {
        return discoveredNodes.some(n => n.posX === currNode.posX && n.posY === currNode.posY);
    }
    /////////////////////////////////////////////////////////////
    function generateMoves(node) {
        // Generate all possible moves and create them into node, then remove invalid any moves.
        const allMoves = [];
        allMoves.push(Node([node.posX - 2, node.posY + 1], node));
        allMoves.push(Node([node.posX - 1, node.posY + 2], node));

        allMoves.push(Node([node.posX + 1, node.posY + 2], node));
        allMoves.push(Node([node.posX + 2, node.posY + 1], node));

        allMoves.push(Node([node.posX + 2, node.posY - 1], node));
        allMoves.push(Node([node.posX + 1, node.posY - 2], node));

        allMoves.push(Node([node.posX - 1, node.posY - 2], node));
        allMoves.push(Node([node.posX - 2, node.posY - 1], node));

        // Remove all invalid moves.
        return allMoves.filter(n => n.posX >= 0 && n.posX <= 7 && n.posY >= 0 && n.posY <= 7);
    }
    /////////////////////////////////////////////////////////////////
    function isTarget(currNode) {
        if (currNode.posX === endPos[0] && currNode.posY === endPos[1]) return true;
        return false;
    }
    ////////////////////////////////////////////////////////////////
    function Node(pos, prev = null) {
        return {
            posX: pos[0],
            posY: pos[1],
            prev,
        };
    }
}


const dist = knightMoves([0, 0], [6, 7])
console.log(dist);