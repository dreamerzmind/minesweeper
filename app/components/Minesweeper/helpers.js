
const positionMines = (board, rows, cols, mines) => {
    for (let mine = 0; mine < mines; mine++) {
        const yIndex = Math.floor(Math.random() * rows);
        const xIndex = Math.floor(Math.random() * cols);
        if (board[yIndex][xIndex]) {
            console.warn('Repeated mine position');
        }
        board[yIndex][xIndex] = {
            hasMine: true,
            discovered: false
        };
    }
};

export const createBoard = (rows, cols, mines) => {
    const board = [];

    // Create rows
    for (let row = 0; row < rows; row++) {
        const r = [];
        board.push(r);
    }

    // Add mines
    positionMines(board, rows, cols, mines);
    
    // Add numbers and empty spaces
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // row - col
            if (board[row][col]) continue;

            let mineCount = 0;
            if (board[row][col - 1]?.hasMine) mineCount++;
            if (board[row][col + 1]?.hasMine) mineCount++;
            if (board[row - 1]?.[col - 1]?.hasMine) mineCount++;
            if (board[row - 1]?.[col]?.hasMine) mineCount++;
            if (board[row - 1]?.[col + 1]?.hasMine) mineCount++;
            if (board[row + 1]?.[col - 1]?.hasMine) mineCount++;
            if (board[row + 1]?.[col]?.hasMine) mineCount++;
            if (board[row + 1]?.[col + 1]?.hasMine) mineCount++;

            board[row][col] = {
                discovered: false,
                number: mineCount
            };
        }
    }

    return board;
};