import { useState } from 'react';
import Swal from 'sweetalert2';

const useFrogGame = () => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [frogs, setFrogs] = useState([
        { id: 1, row: 0, col: 0, type: 'male', characteristics: ['tall', 'slim'] },
        { id: 2, row: 0, col: 1, type: 'female', characteristics: ['short', 'fat'] },
    ]);

    const handleSelectFrog = (frog) => {
        if (selectedCells.some(cell => cell.frog.id === frog.id)) {
            setSelectedCells(selectedCells.filter(cell => cell.frog.id !== frog.id));
        } else {
            if (selectedCells.length < 2) {
                setSelectedCells([...selectedCells, { row: frog.row, col: frog.col, frog }]);
            }
        }
    };

    const handleSelectEmptyField = (row, col) => {
        if (selectedCells.length > 0) {
            setSelectedCells((prevSelectedCells) => [...prevSelectedCells, { row, col }]);
        }
    };

    const updateFrogPosition = (oldRow, oldCol, newRow, newCol) => {
        setFrogs((prevFrogs) =>
            prevFrogs.map(frog =>
                frog.row === oldRow && frog.col === oldCol
                    ? { ...frog, row: newRow, col: newCol }
                    : frog
            )
        );
    };

    const isValidJump = (frog, from, to) => {
        const rowDiff = Math.abs(from.row - to.row);
        const colDiff = Math.abs(from.col - to.col);

        if (frog.type === 'male') {
            return (rowDiff <= 3 && colDiff <= 3) &&
                (rowDiff === colDiff || rowDiff === 0 || colDiff === 0 || (rowDiff + colDiff <= 3))
        }

        if (frog.type === 'female') {
            return (rowDiff <= 2 && colDiff <= 2) &&
                (rowDiff === colDiff || rowDiff === 0 || colDiff === 0 || (rowDiff + colDiff <= 2))
        }
        return false;
    };

    const handleJump = () => {
        if (selectedCells.length === 2) {
            const [from, to] = selectedCells;
            const oldRow = from.row;
            const oldCol = from.col;

            if (from.frog && isValidJump(from.frog, from, to)) {
                const targetFrog = frogs.find(frog => frog.row === to.row && frog.col === to.col);
                if (!targetFrog) {
                    updateFrogPosition(oldRow, oldCol, to.row, to.col);
                } else {
                    Swal.fire('Cannot jump to an occupied cell.');
                }
            } else {
                Swal.fire('Cannot perform the jump.');
            }
        }
        setSelectedCells([]);
    };


    const findFirstAvailableAdjacentCell = (row, col) => {
        const adjacentPositions = [
            { row: row - 1, col: col },     // Above
            { row: row + 1, col: col },     // Below
            { row: row, col: col - 1 },     // Left
            { row: row, col: col + 1 },     // Right
            { row: row - 1, col: col - 1 }, // Top-left diagonal
            { row: row - 1, col: col + 1 }, // Top-right diagonal
            { row: row + 1, col: col - 1 }, // Bottom-left diagonal
            { row: row + 1, col: col + 1 }  // Bottom-right diagonal
        ];

        for (const pos of adjacentPositions) {
            if (
                pos.row >= 0 && pos.row < 6 &&
                pos.col >= 0 && pos.col < 10 &&
                !frogs.some(frog => frog.row === pos.row && frog.col === pos.col)
            ) {
                return pos;
            }
        }
        return null;
    };

    const handleReproduce = () => {
        if (selectedCells.length === 2) {
            const [frog1, frog2] = selectedCells.map(cell => cell.frog).filter(Boolean);

            if (!frog1 || !frog2) {
                Swal.fire("Please select two frogs to reproduce.");
                return;
            }

            if (frog1.type === frog2.type) {
                Swal.fire("Reproduction requires a male and a female frog.");
                return;
            }

            const maleFrog = frog1.type === 'male' ? frog1 : frog2;
            const femaleFrog = frog1.type === 'female' ? frog1 : frog2;

            const areAdjacent = Math.abs(frog1.row - frog2.row) <= 1 && Math.abs(frog1.col - frog2.col) <= 1;
            if (!areAdjacent) {
                Swal.fire("The frogs must be adjacent to reproduce.");
                return;
            }

            const emptyCell = findFirstAvailableAdjacentCell(femaleFrog.row, femaleFrog.col);
            if (!emptyCell) {
                Swal.fire("No adjacent space available for a new frog.");
                return;
            }

            const newFrog = {
                id: frogs.length + 1,
                row: emptyCell.row,
                col: emptyCell.col,
                type: Math.random() > 0.5 ? 'male' : 'female',
                characteristics: [
                    maleFrog.characteristics[Math.floor(Math.random() * maleFrog.characteristics.length)],
                    femaleFrog.characteristics[Math.floor(Math.random() * femaleFrog.characteristics.length)]
                ]
            };

            setFrogs([...frogs, newFrog]);
        } else {
            Swal.fire("Select a male and a female frog to reproduce.");
        }
        setSelectedCells([]);
    };

    return {
        selectedCells,
        frogs,
        handleSelectFrog,
        handleSelectEmptyField,
        handleJump,
        handleReproduce,
    };
};

export default useFrogGame;