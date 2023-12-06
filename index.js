function knightMoves(start, end) {
    function isValid([x, y]) {
        return x >= 0 && y >= 0 && x < 8 && y < 8;
    }
    if (!isValid(start) || !isValid(end)) {
        console.log("Invalid position(s)");
        return;
    }
    if (start.join() === end.join()) {
        console.log("You're already in the spot!");
        return;
    }
    function getValidMoves([x, y]) {
        const moves = [];
        let dx = [2, 1, -1, -2, -2, -1, 1, 2];
        let dy = [1, 2, 2, 1, -1, -2, -2, -1];
        for (let i = 0; i < 8; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];
            if (isValid([newX, newY])) {
                moves.push([newX, newY]);
            }
        }
        return moves;
    };
    function bfs() {
        const queue = [[...start, []]];
        const visited = new Set();

        while (queue.length > 0) {
            const [currentX, currentY, path] = queue.shift();
            const currentPosition = [currentX, currentY];
            if (currentX === end[0] && currentY === end[1]) {
                return [...path, currentPosition];
            }
            if (!visited.has(`${currentX},${currentY}`)) {
                visited.add(`${currentX},${currentY}`);

                const moves = getValidMoves([currentX, currentY]);

                for (const move of moves) {
                    const [newX, newY] = move;
                    queue.push([newX, newY, [...path, currentPosition]]);
                }
            }
        }
        return null; // No path found
    }

    let result = bfs();
    function printResult(arr) {
        console.log(`It took you ${arr.length - 1} steps to get to your destiny`);
        let path = `You followed this path: `;
        for (let i = 0; i < arr.length; i++) {
            if (i === arr.length - 1) {
                path += arr[i];
            } else {
                path += arr[i] + " --> ";
            }
        }
        console.log(path);
    }
    return printResult(result);
}
//
knightMoves([7, 3], [0, 1]);