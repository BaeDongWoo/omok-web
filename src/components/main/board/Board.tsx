import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  DocumentData,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { fireStore } from '../../../config/firebaseConfig';
import { useParams } from 'react-router-dom';
import { checkOmok } from './validateOmok';

interface Cell {
  color: number | undefined;
  x: number;
  y: number;
}
interface BoardProps {
  start: boolean;
}
const Board = ({ start }: BoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stones, setStones] = useState<Cell[]>([]);
  const [turn, setTurn] = useState<number>();
  const [myStone, setMyStone] = useState<number>();
  const [reset, setReset] = useState<boolean>(false);
  const boardSize = 19;
  const cellSize = 30;
  const canvasSize = boardSize * cellSize;
  const { roomId } = useParams();
  const uid = sessionStorage.getItem('uid');
  let tempBoard = new Array(19);
  for (let i = 0; i < tempBoard.length; i++) {
    tempBoard[i] = new Array(19);
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      drawBoard(ctx);
    }
  }, [stones]);

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#00aaaa';
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.globalAlpha = 1;
    for (let i = 1; i <= boardSize; i++) {
      ctx.beginPath(); // 새로운 선을 그리기 시작
      const startCell = i * cellSize;
      ctx.moveTo(0, startCell); // x,y x가 가로위치
      ctx.lineTo(canvasSize, startCell);
      ctx.moveTo(startCell, 0);
      ctx.lineTo(startCell, canvasSize);
      ctx.stroke();
    }
    if (stones) {
      drawStone(ctx);
    }
    ctx.closePath();
  };
  const drawStone = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#00aaaa';
    ctx.globalAlpha = 1;
    for (let i = 0; i < stones.length; i++) {
      const X = stones[i].x;
      const Y = stones[i].y;
      const color = stones[i].color;
      ctx.fillStyle = color ? '#fff' : '#000';
      ctx.beginPath();
      ctx.arc(X * 30, Y * 30, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  };
  const onMouseMoveStone = (e: any) => {
    const canvas = canvasRef.current;
    let index = canvas?.getBoundingClientRect();
    if (index && canvas) {
      const { x, y } = {
        x: Math.round((e.clientX - index.left) / 30) * 30,
        y: Math.round((e.clientY - index.top) / 30) * 30,
      };
      if (x > 0 && x < canvasSize && y > 0 && y < canvasSize) {
        canvas.style.cursor = 'pointer';
      }
      const color = myStone;
      markStone({ color, x, y });
      return { x, y };
    }
  };
  const markStone = ({ color, x, y }: Cell) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      drawBoard(ctx);
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.strokeStyle = '#00aaaa';
      ctx.fillStyle = color ? '#fff' : '#000';
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  };
  const onClickStone = (e: any) => {
    const canvas = canvasRef.current;
    let index = canvas?.getBoundingClientRect();
    if (index) {
      const { x, y } = {
        x: (Math.round((e.clientX - index.left) / 30) * 30) / 30,
        y: (Math.round((e.clientY - index.top) / 30) * 30) / 30,
      };
      const color = turn;
      let flag = true;
      stones.map((stone) => {
        if (stone.x === x && stone.y === y) flag = false;
      });
      if (x === 0 || x === canvasSize) flag = false;
      if (y === 0 || y === canvasSize) flag = false;
      if (flag) {
        const tempStone = [...stones, { color, x, y }];
        tempStone.map((stone) => {
          tempBoard[stone.x][stone.y] = stone.color;
        });
        const check = checkOmok(x, y, color, tempBoard);
        if (check) {
          updateBoard(tempStone);
          endGame();
        } else {
          updateBoard(tempStone);
        }
      } else alert('해당 위치에는 돌을 놓을 수 없습니다.');
    }
  };
  const endGame = async () => {
    if (roomId) {
      await updateDoc(doc(fireStore, 'rooms', roomId), {
        end: true,
        winner: sessionStorage.getItem('nickname'),
      });
    }
  };
  const updateBoard = async (tempStone: Cell[]) => {
    if (roomId) {
      const nextTurn = changeTurn();
      await updateDoc(doc(fireStore, 'rooms', roomId), {
        board: tempStone,
        game: { startGame: true, turn: nextTurn },
      });
    }
  };
  const resetGame = async () => {
    if (roomId) {
      const data = (await getDoc(doc(fireStore, 'rooms', roomId))).data();
      if (data) {
        alert(`게임이 종료되었습니다. 승자는 ${data.winner}님 입니다.`);
        await updateDoc(doc(fireStore, 'rooms', roomId), {
          ready: [false, false],
          end: false,
          game: { startGame: false, turn: 0 },
          board: [],
        });
      }
    }
  };
  useEffect(() => {
    if (roomId) {
      const unsubscribe = onSnapshot(
        doc(fireStore, 'rooms', roomId),
        (snapShot) => {
          const data = snapShot?.data();
          if (data) {
            setStones(data.board);
            setTurn(data.game.turn);
            const stone = data.users.findIndex((user: string) => user === uid);
            setMyStone(stone);
            if (data.end) {
              resetGame();
            }
          }
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, []);
  const changeTurn = () => {
    if (turn === 0) return 1;
    else if (turn === 1) return 0;
  };
  return (
    <Container>
      <BoardGrid
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: '3px solid #00aaaa' }}
        onMouseMove={start && myStone === turn ? onMouseMoveStone : undefined}
        onClick={start && myStone === turn ? onClickStone : undefined}
      />
    </Container>
  );
};
const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  line-height: 100px;
`;
const BoardGrid = styled.canvas``;
export default Board;
