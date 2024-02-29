import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { roomCheck } from '../../../pages/MainPage';
import {
  DocumentData,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { fireStore } from '../../../config/firebaseConfig';
import { useParams } from 'react-router-dom';

interface Cell {
  color: number;
  x: number;
  y: number;
}
interface boardProps {
  userProps: roomCheck;
}
const Board = ({ userProps }: boardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stones, setStones] = useState<Cell[]>([]);
  const [turn, setTurn] = useState(0);
  const boardSize = 19;
  const cellSize = 30;
  const canvasSize = boardSize * cellSize;
  const { roomId } = useParams();

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
    drawStone(ctx);
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
      ctx.arc(X, Y, 10, 0, 2 * Math.PI);
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
      const color = userProps.stoneNum;
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
        x: Math.round((e.clientX - index.left) / 30) * 30,
        y: Math.round((e.clientY - index.top) / 30) * 30,
      };
      const color = turn;
      let flag = true;
      stones.map((stone) => {
        if (stone.x === x && stone.y === y) flag = false;
      });
      if (x === 0 || x === canvasSize) flag = false;
      if (y === 0 || y === canvasSize) flag = false;
      if (flag) {
        changeTurn();
        const tempStone = [...stones, { color, x, y }];
        updateBoard(tempStone);
      } else alert('해당 위치에는 돌을 놓을 수 없습니다.');
    }
  };
  const updateBoard = async (tempStone: Cell[]) => {
    if (roomId) {
      await updateDoc(doc(fireStore, 'rooms', roomId), { board: tempStone });
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
          }
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, []);
  const changeTurn = () => {
    if (turn === 0) setTurn(1);
    else if (turn === 1) setTurn(0);
  };
  return (
    <Container>
      <BoardGrid
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: '3px solid #00aaaa' }}
        onMouseMove={userProps.userCnt === 2 ? onMouseMoveStone : undefined}
        onClick={userProps.userCnt === 2 ? onClickStone : undefined}
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
