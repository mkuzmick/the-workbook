"use client";
// app/page.tsx

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Chess } from "chess.js";

// Dynamically import the Chessboard component to avoid SSR issues.
const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
);

export default function ChessPage() {
  // Initialize a new chess game.
  const [game, setGame] = useState(new Chess());
  // Default board size (in pixels). We'll update this based on the window size.
  const [boardSize, setBoardSize] = useState(400);

  // Update the board size on window resize.
  useEffect(() => {
    function handleResize() {
      // Set some margins for header and padding.
      const horizontalPadding = 40; // total horizontal padding
      const verticalPadding = 150;  // estimate for header plus vertical margins
      const availableWidth = window.innerWidth - horizontalPadding;
      const availableHeight = window.innerHeight - verticalPadding;
      // Make sure the board is square by taking the smaller dimension.
      const newSize = Math.min(availableWidth, availableHeight);
      setBoardSize(newSize);
    }

    // Set initial board size.
    handleResize();
    // Update board size on window resize.
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // onDrop callback when a piece is dropped.
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    // Get the piece from the source square.
    const piece = game.get(sourceSquare);
    // Build the move object.
    const moveObj: { from: string; to: string; promotion?: string } = {
      from: sourceSquare,
      to: targetSquare,
    };

    // Only add promotion if the piece is a pawn moving to the final rank.
    if (piece && piece.type === "p") {
      const isPromotionRank =
        (piece.color === "w" && targetSquare[1] === "8") ||
        (piece.color === "b" && targetSquare[1] === "1");
      if (isPromotionRank) {
        moveObj.promotion = "q";
      }
    }

    // Attempt to make the move in a try/catch to handle illegal moves.
    let move;
    try {
      move = game.move(moveObj);
    } catch (error) {
      console.error("Invalid move attempted:", moveObj, error);
      return false;
    }

    // If move is illegal (null), return false so that the board resets.
    if (move === null) return false;

    // Update the game state to trigger a re-render.
    setGame(new Chess(game.fen()));
    return true;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1>Next.js Chess Game</h1>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardWidth={boardSize}
        boardStyle={{ maxWidth: boardSize, maxHeight: boardSize }}
      />
    </div>
  );
}
