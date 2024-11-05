import { useState } from 'react';
import CustomAlert from '../components/CustomAlert/CustomAlert';

export const useFrogGame = () => {
    const [selectedCells, setSelectedCells] = useState([]);
    const traits = {
        height: ['tall', 'short'],
        width: ['slim', 'fat'],
    };
    const [frogs, setFrogs] = useState([
        { id: 1, row: 0, col: 0, type: 'male', characteristics: [traits.height[0], traits.width[0]] },
        { id: 2, row: 0, col: 1, type: 'female', characteristics: [traits.height[1], traits.width[1]] },
    ]);
    const maxDistanceMaleFrog = 3;
    const maxDistanceFemaleFrog = 2;

    const handleSelectFrog = (frog) => {
        setSelectedCells(prevSelectedCells => {
            const isSelected = prevSelectedCells.some(cell => cell.frog && cell.frog.id === frog.id);
            if (isSelected) {
                return prevSelectedCells.filter(cell => !(cell.frog && cell.frog.id === frog.id));
            } else if (prevSelectedCells.length < 2) {
                return [...prevSelectedCells, { row: frog.row, col: frog.col, frog }];
            }
            return prevSelectedCells;
        });
    };

    const handleSelectEmptyField = (row, col) => {
        setSelectedCells(prevSelectedCells => {
            const isSelected = prevSelectedCells.some(cell => cell.row === row && cell.col === col && !cell.frog);
            if (isSelected) {
                return prevSelectedCells.filter(cell => !(cell.row === row && cell.col === col && !cell.frog));
            } else if (prevSelectedCells.length < 2) {
                return [...prevSelectedCells, { row, col }];
            }
            return prevSelectedCells;
        });
    };

    const updateFrogPosition = (oldRow, oldCol, newRow, newCol) => {
        setFrogs(prevFrogs =>
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
        const limits = frog.type === 'male' ? { maxRow: maxDistanceMaleFrog, maxCol: maxDistanceMaleFrog } : { maxRow: maxDistanceFemaleFrog, maxCol: maxDistanceFemaleFrog };

        return (rowDiff <= limits.maxRow && colDiff <= limits.maxCol) &&
            (rowDiff === colDiff || rowDiff === 0 || colDiff === 0);
    };

    const handleJump = () => {
        if (selectedCells.length === 2) {
            const [from, to] = selectedCells;
            const oldRow = from.row;
            const oldCol = from.col;

            if (from.frog) {
                if (isValidJump(from.frog, from, to)) {
                    const targetFrog = frogs.find(frog => frog.row === to.row && frog.col === to.col);
                    if (!targetFrog) {
                        updateFrogPosition(oldRow, oldCol, to.row, to.col);
                    } else {
                        CustomAlert('Cannot jump to an occupied field.', 'error');
                    }
                } else {
                    CustomAlert(`Invalid jump for ${from.frog.type} frog.`, 'error');
                }
            } else {
                CustomAlert('You should first select one frog and then one empty field.', 'warning');
            }
        } else {
            CustomAlert('Select one frog and one empty field', 'warning');
        }
        setSelectedCells([]);
    };


    const findFirstAvailableAdjacentCell = (row, col) => {
        const adjacentPositions = [
            { row: row - 1, col: col },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row, col: col + 1 },
            { row: row - 1, col: col - 1 },
            { row: row - 1, col: col + 1 },
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col + 1 }
        ];

        return adjacentPositions.find(pos =>
            pos.row >= 0 && pos.row < 6 &&
            pos.col >= 0 && pos.col < 10 &&
            !frogs.some(frog => frog.row === pos.row && frog.col === pos.col)
        ) || null;
    };

    const handleReproduce = () => {
        if (selectedCells.length === 2) {
            const [frog1, frog2] = selectedCells.map(cell => cell.frog).filter(Boolean);

            if (!frog1 || !frog2) {
                CustomAlert("Please select two frogs to reproduce.", "warning");
                setSelectedCells([]);
                return;
            }

            if (frog1.type === frog2.type) {
                CustomAlert("Reproduction requires a male and a female frog.", "warning");
                setSelectedCells([]);
                return;
            }

            const maleFrog = frog1.type === 'male' ? frog1 : frog2;
            const femaleFrog = frog1.type === 'female' ? frog1 : frog2;

            const areAdjacent = Math.abs(frog1.row - frog2.row) <= 1 && Math.abs(frog1.col - frog2.col) <= 1;
            if (!areAdjacent) {
                CustomAlert("Frogs must neighbor each other to reproduce", "error");
                setSelectedCells([]);
                return;
            }

            const emptyCell = findFirstAvailableAdjacentCell(femaleFrog.row, femaleFrog.col);
            if (!emptyCell) {
                CustomAlert("No adjacent space available for a new frog.", "error");
                setSelectedCells([]);
                return;
            }

            const heightTraitFromMale = maleFrog.characteristics.find(trait => traits.height.includes(trait));
            const heightTraitFromFemale = femaleFrog.characteristics.find(trait => traits.height.includes(trait));

            let heightTrait, widthTrait;
            if (Math.random() > 0.5) {
                heightTrait = heightTraitFromMale;
                widthTrait = femaleFrog.characteristics.find(trait => traits.width.includes(trait));
            } else {
                heightTrait = heightTraitFromFemale;
                widthTrait = maleFrog.characteristics.find(trait => traits.width.includes(trait));
            }

            const newFrog = {
                id: frogs.length + 1,
                row: emptyCell.row,
                col: emptyCell.col,
                type: Math.random() > 0.5 ? 'male' : 'female',
                characteristics: [heightTrait, widthTrait]
            };

            setFrogs([...frogs, newFrog]);
        } else {
            CustomAlert("Select a male and a female frog to reproduce.", "warning");
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
