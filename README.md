# Frog Game

This project is a simple interactive game built with React, where players manage frogs on a 10x6 grid lake. Players can select frogs, make them jump to new positions, and even reproduce under certain conditions. The goal is to manage the frogs' movements and encourage new generations of frogs to appear!

## Table of Contents

- [Overview](#overview)
- [Game Rules and Acceptance Criteria](#game-rules-and-acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Overview

The Frog Game allows players to manage frogs with unique characteristics and behaviors on a 10x6 grid (the lake). Frogs can jump to different fields based on their gender-specific capabilities, and if two frogs of different genders are adjacent, they can reproduce, creating a new frog with characteristics inherited from each parent.

## Game Rules and Acceptance Criteria

### 1. **Grid Setup**

- The lake is represented as a 10x6 grid of fields.
- Frogs appear on the grid as colored rectangles:
  - **Green Rectangle**: Represents a frog.
  - **Small Blue Rectangle on Green Frog**: Indicates a male frog.
  - **Small Purple Rectangle on Green Frog**: Indicates a female frog.

### 2. **Jumping Mechanics**

- **Selecting and Jumping**: To jump a frog:
  1.  Select the frog by clicking on it.
  2.  Select the target empty field.
  3.  Click the **Jump** button.
- **Jump Distance**:
  - **Male Frog**: Can jump up to 3 fields away, including diagonals.
  - **Female Frog**: Can jump up to 2 fields away, including diagonals.

### 3. **Frog Characteristics**

- Each frog has two traits defining its appearance:
  - **Height**: Either "tall" or "short".
  - **Width**: Either "fat" or "slim".
- These traits are stored as an array of two elements.

### 4. **Reproduction Mechanics**

- To reproduce:
  1.  Select one male and one female frog that are adjacent.
  2.  Click the **Reproduce** button.
- **New Frog Placement**:
  - The new frog appears in the first available space adjacent to the mother frog.
- **Inherited Traits**:
  - The new frog inherits one characteristic from each parent, randomly selected.

## Installation

To run the game locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DLQuake/pragmagotech_zadanie_testowe.git
   ```
2. **Navigate to Project Directory**:
   ```bash
   cd pragmagotech_zadanie_testowe
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

The game should now be running on `http://localhost:5173/`.

## Usage

1. **Select a Frog**: Click on a frog to select it.
2. **Jump**:
   - Click an empty field to set the destination.
   - Press the **Jump** button to move the frog.
3. **Reproduce**:
   - Select one male and one female frog that are adjacent.
   - Press the **Reproduce** button to create a new frog.
4. **Restart**: Refresh the page to reset the game.

## Features

- **Grid Display**: Visual representation of the lake, showing frog positions and empty fields.
- **Frog Movement**: Male and female frogs can jump to new fields based on specified distances.
- **Reproduction Logic**: Male and female frogs adjacent to each other can reproduce, creating a new frog with inherited traits.
- **Trait Inheritance**: New frogs inherit one trait each from the mother and father.

## Technologies Used

- **ReactJS**: Core framework for building interactive UI components.
- **JavaScript**: Programming language for logic and component creation.
- **Vite**: Build tool for a fast, optimized development environment.
- **Bulma**: CSS framework for responsive design.
- **SweetAlert2**: Library for beautiful, responsive alerts.