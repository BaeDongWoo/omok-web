export const checkOmok = (x, y, stone, board) => {
  const a = checkLR(x, y, stone, board); //가로
  const b = checkTB(x, y, stone, board); //세로
  const c = checkRD(x, y, stone, board); //오른쪽 대각선
  const d = checkLD(x, y, stone, board); //왼쪽 대각선
  if (a == true || b == true || c == true || d == true) {
    // 4방향 중 하나의 방향이라도 true라면 true를 리턴
    return true;
  } else {
    return false;
  }
};
const checkLR = (x, y, stone, board) => {
  let size = board.length;
  let nx = x; //인덱스 값
  let ny = y; //인덱스 값
  let cnt = 0; // 같은 돌의 갯수
  while (true) {
    // X값을 증가시키면서 같은돌의 갯수를 체크
    nx += 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  nx = x; // break 후 처음 돌을 놓았던 좌표로 초기화
  while (true) {
    //x값을 감소 시키면서 체크
    nx -= 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  if (cnt == 4) {
    //돌을 놓은 곳을 기준으로 총 4개의 같은 돌이 있으면 true를 리턴
    return true;
  } else {
    return false;
  }
};
const checkTB = (x, y, stone, board) => {
  let size = board.length;
  let nx = x;
  let ny = y;
  let cnt = 0;
  while (true) {
    ny += 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  ny = y;
  while (true) {
    ny -= 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  if (cnt == 4) {
    return true;
  } else {
    return false;
  }
};
const checkRD = (x, y, stone, board) => {
  let size = board.length;
  let nx = x;
  let ny = y;
  let cnt = 0;
  while (true) {
    nx += 1;
    ny += 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  nx = x;
  ny = y;
  while (true) {
    nx -= 1;
    ny -= 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  if (cnt == 4) {
    return true;
  } else {
    return false;
  }
};
const checkLD = (x, y, stone, board) => {
  let size = board.length;
  let nx = x;
  let ny = y;
  let cnt = 0;
  while (true) {
    nx += 1;
    ny -= 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  nx = x;
  ny = y;
  while (true) {
    nx -= 1;
    ny += 1;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
      let s = board[nx][ny];
      console.log(s);
      if (stone === s) {
        cnt++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  if (cnt == 4) {
    return true;
  } else {
    return false;
  }
};
