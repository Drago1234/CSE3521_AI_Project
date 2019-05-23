/*
================
8-puzzle problem
================
Construct a 3x3 grid, containing one blank(empty) space and one each of tiles labeled 1-8.
By exchanging tiles adjacent to the blank space with the blank space, achieve the desired configuration:
 1 2 3
 8   4
 7 6 5

State:
{
  grid : Array(3,3), Integers [0,8]
}
where grid is a 2D array whose indices correspond to the following grid positions:
 [0][0] [0][1] [0][2]
 [1][0] [1][1] [1][2]
 [2][0] [2][1] [2][2]
The value 0 is used to represent the blank space, and 1-8 for the corresponding labeled tiles.

Possible actions:
ID | Action
---+----------------------
 1 | Move tile above blank down (i.e., "move" blank up)
---+----------------------
 2 | Move tile below blank up (i.e., "move" blank down)
---+----------------------
 3 | Move tile left of blank right (i.e., "move" blank left)
---+----------------------
 4 | Move tile right of blank left (i.e., "move" blank right)
*/

//////////////////////////////////////////////////////////////////////////////
// Complete the following two functions

//Check if the given state is a goal state
//Returns: true if is goal state, false otherwise
/*
goal state:
1 2 3
8 0 4
7 6 5
*/
function is_goal_state(state) {
  ++helper_eval_state_count; //Keep track of how many states are evaluated (DO NOT REMOVE!)
  var expectedValue = [[1,2,3], [8,0,4], [7,6,5]];
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if(!(state.grid[i][j] == expectedValue[i][j])){
        return false;
      }
    }
  }
  return true;
}

//Find the list of actions that can be performed from the given state and the new
//states that result from each of those actions
//Returns: Array of successor objects (where each object has a valid actionID member and corresponding resultState member)
  /*
Input:
  1 2 3   
  0 8 4 
  7 6 5
Ouput:
  0 2 3
  1 8 4
  7 6 5
  
  1 2 3
  8 0 4
  7 6 5

  1 2 3
  7 8 4
  0 6 5
  */

  /*
Input:
  103 013 813 813 <-- last is te input
  824 824 024 204
  765 765 765 765
Ouput:
  803 813 813 813
  214 024 240 264
  765 765 765 705
  */
function find_successors(state) {
  ++helper_expand_state_count; //Keep track of how many states are expanded (DO NOT REMOVE!)
  
  let successors=[];

  for(var i = 0; i < 3; i ++){
    for(var j = 0; j < 3; j ++){
      //i, j: Integer[0, 2]
      /*
      [i-1][j-1] [i-1][j] [i-1][j+1]
      [i][j-1]   [i][j]   [i][j+1]
      [i+1][j-1] [i+1][j] [i+1]j+1]
      */
      if(state.grid[i][j] == 0){
        //Code: 1--> down, 2--> up, 3--> right, 4 --> left
        //Look up, swap if it's valid action
        if( (i - 1) >= 0 && (i - 1) <= 2){
          //Make a deep copy of state
           let newState={
             grid : state.grid.map(x => x.slice(0)) 
           };     
           //Swap
           var tmp = newState.grid[i][j];   
           newState.grid[i][j] = newState.grid[i - 1][j];
           newState.grid[i - 1][j] = tmp;  
           //push to successor
           successors.push({
             actionID : 2,
             resultState : newState
           });      
         }

        //look down
        if((i + 1) >= 0 && (i + 1) <= 2){
          //Make a deep copy of state
           let newState={
             grid : state.grid.map(x => x.slice(0)) 
           };     
           //Swap
           var tmp = newState.grid[i][j];   
           newState.grid[i][j] = newState.grid[i + 1][j];
           newState.grid[i + 1][j] = tmp;  
           //push to successor
           successors.push({
             actionID : 1,
             resultState : newState
           });      
         }     
        
        //look right
        if((j - 1) >= 0 && (j - 1) <= 2){
          //Make a deep copy of state
           let newState={
             grid : state.grid.map(x => x.slice(0)) 
           };     
           //Swap
           var tmp = newState.grid[i][j];   
           newState.grid[i][j] = newState.grid[i][j - 1];
           newState.grid[i][j - 1] = tmp;  
           //push to successor
           successors.push({
             actionID : 3,
             resultState : newState
           });      
         }      

        //look left
        if((j + 1) >= 0 && (j + 1) <= 2){
          //Make a deep copy of state
           let newState={
             grid : state.grid.map(x => x.slice(0)) 
           };     
           //Swap
           var tmp = newState.grid[i][j];   
           newState.grid[i][j] = newState.grid[i][j + 1];
           newState.grid[i][j + 1] = tmp;  
           //push to successor
           successors.push({
             actionID : 4,
             resultState : newState
           });      
         }
      }
    }
  }



  /***Your code to generate successors here!***/

  //Hint: Javascript objects are passed by reference, so don't modify "state" directy.
  //Make copies instead:
  //  let newState={
  //    grid : state.grid.map(x => x.slice(0)) //Deep copy of grid
  //  };
  //Remember to make a new copy for each new state you make!

  //Hint: Add new elements to the successor list like so:
  //  successors.push({
  //    actionID : /*ID*/,
  //    resultState : newState
  //  });

  return successors;
}

//////////////////////////////////////////////////////////////////////////////
// Use these functions when developing your A* implementation

//Heuristic functions for the 8-puzzle problem
function calculate_heuristic(state) {
  //Total Manhattan distance heuristic
  let goal=[ [1, 2, 3], [8, 0, 4], [7, 6, 5] ];

  let g_pos=Array(9);
  let st_pos=Array(9);
  for(let j=0;j<3;++j)
    for(let i=0;i<3;++i) {
        g_pos[ goal[j][i] ]=[j,i];
        st_pos[ state.grid[j][i] ]=[j,i];
    }

  let h=0;
  for(let i=0;i<9;++i) {
    h+=Math.abs( st_pos[i][0]-g_pos[i][0] )+Math.abs( st_pos[i][1]-g_pos[i][1] );
  }
  return h;
}

/*
function calculate_heuristic(state) {
  //Misplaced tiles heuristic
  let goal=[ [1, 2, 3], [8, 0, 4], [7, 6, 5] ];

  let h=0;
  for(let j=0;j<3;++j)
    for(let i=0;i<3;++i) {
      if(state.grid[j][i]!=goal[j][i])
        ++h;
    }
  if(h>0) --h; //Account for miscounted blank
  return h;
}
*/

/*
function calculate_heuristic(state) {
  //Simplest heuristic (h(n)=0)
  return 0;
}
*/
