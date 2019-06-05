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

  for(var i = 0; i < 3; ++i){
    for(var j = 0; j < 3; ++j){
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
           newState.grid[i][j] = newState.grid[i - 1][j];
           newState.grid[i - 1][j] = 0;  
           //push to successor
           successors.push({
             actionID : 1,
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
           newState.grid[i][j] = newState.grid[i + 1][j];
           newState.grid[i + 1][j] = 0;
           //push to successor
           successors.push({
             actionID : 2,
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
           newState.grid[i][j] = newState.grid[i][j - 1];
           newState.grid[i][j - 1] = 0;  
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
           newState.grid[i][j] = newState.grid[i][j + 1];
           newState.grid[i][j + 1] = 0;  
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

// //Heuristic functions for the 8-puzzle problem
// function calculate_heuristic(state) {
//   //Total Manhattan distance heuristic
//   let goal=[ [1, 2, 3], [8, 0, 4], [7, 6, 5] ];

//   let g_pos=Array(9);
//   let st_pos=Array(9);
//   for(let j=0;j<3;++j)
//     for(let i=0;i<3;++i) {
//         g_pos[ goal[j][i] ]=[j,i];
//         st_pos[ state.grid[j][i] ]=[j,i];
//     }

//   let h=0;
//   for(let i=0;i<9;++i) {
//     h+=Math.abs( st_pos[i][0]-g_pos[i][0] )+Math.abs( st_pos[i][1]-g_pos[i][1] );
//   }
//   return h;
// }


// function calculate_heuristic(state) {
//   //Misplaced tiles heuristic
//   let goal=[ [1, 2, 3], [8, 0, 4], [7, 6, 5] ];
//   let h=0;
//   for(let j=0;j<3;++j)
//     for(let i=0;i<3;++i) {
//       if(state.grid[j][i]!=goal[j][i])
//         ++h;
//     }
//   if(h>0) --h; //Account for miscounted blank
//   return h;
// }



function calculate_heuristic(state) {
  //Simplest heuristic (h(n)=0)
  return 0;
}

//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.

  //  successors.push({
  //    actionID : /*ID*/,
  //    resultState : newState
  //  });
  
 /*
================================
BFS（Breadth First Search)
================================
*/ 
function breadth_first_search(initial_state) {
  //A node has actionsArr, stateArr, and cost, {[], [initial_state], 0}
  //STEP: 1),2)Initialize the frontier and closed set
  let frontier = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  /***Your code for breadth-first search here***/
  // let successors = find_successors(initial_state);
  // frontier.forEach(element =>{
    let path = {
      actions: [],
      states: []
      };
      //The initialization should excluded the initial node
    path.states.push(initial_state);
    frontier.push(path);
    if(is_goal_state(initial_state)){
      return path;
    }
  // });

  //STEP: 3) Loop do while frontier is not empty
  while(frontier.length > 0){
    //STEP: 4) Choose a leaf node and remove it from frontier
    let path = frontier.shift();
    let state = path.states[path.states.length-1];
    //STEP: 7)(Expand the chosen node and Add the action and node to frontier) iff not in closed set
    if(!closed.has(state_to_uniqueid(state))) {
      // console.log("state_to_uniqueid(state) is working!");
      //For each loop: Do, remove the 
      let successors = find_successors(state);
      let len = successors.length;
      for(let i = 0; i < len; i++){

        let newPath = {
          actions: [],
          states: []
        };
        //make deep cody from path
        newPath.actions = path.actions.slice(0);
        newPath.states = path.states.slice(0);
        newPath.actions.push(successors[i].actionID);
        newPath.states.push(successors[i].resultState);
        //STEP: 5) Goal Test
        frontier.push(newPath);
        if(is_goal_state(successors[i].resultState)){
          return newPath;
        }
      }
      //STEP: 6)Add to closed set
      closed.add(state_to_uniqueid(state));
    }
  }

  /*
    Hint: In order to generate the solution path, you will need to augment
      the states to store the predecessor/parent state they were generated from
      and the action that generates the child state from the predecessor state.
      
    For example, make a wrapper object that stores the state, predecessor and action.
    Javascript objects are easy to make:
    let object={
      member_name1 : value1,
      member_name2 : value2
    };
      
    Hint: Because of the way Javascript Set objects handle Javascript objects, you
      will need to insert (and check for) a representative value instead of the state
      object itself. The state_to_uniqueid function has been provided to help you with
      this. For example
        let state=...;
        closed.add(state_to_uniqueid(state)); //Add state to closed set
        if(closed.has(state_to_uniqueid(state))) { ... } //Check if state is in closed set
  */
  
  /***Your code to generate solution path here***/

  //No solution found
  console.log("No solution found!\n");
  return null;
}

 /*
================================
DLS(Depth Limit Search)
================================
*/ 
//Perform depth-limited search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Will not examine paths longer than "depth_limit" (i.e. paths that have "depth_limit" states in them, or "depth_limit-1" actions in them)
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function depth_limited_search(initial_state, depth_limit) {

  //A node has actionsArr, stateArr, and cost, {[], [initial_state], 0}
  //STEP: 1),2)Initialize the open and closed set
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // let successors = find_successors(initial_state);
  // open.forEach(element =>{
  let path = {
    actions: [],
    states: [],
    limit: 0
    };
    //The initialization should excluded the initial node
  path.states.push(initial_state);
  open.push(path);
  if(is_goal_state(initial_state)){
    return {
      actions: path.actions,
      states: path.states
    };
  }
  // });

  //STEP: 3) Loop do while open is not empty
  while(open.length > 0){
    //STEP: 4) Choose a leaf node and remove it from open
    let path = open.pop();
    if(path.limit >= depth_limit){
      continue;
    }
    // console.log(path.limit)
    let state = path.states[path.states.length-1];
    //STEP: 7)(Expand the chosen node and Add the action and node to open) iff not in closed set
    if(!closed.has(state_to_uniqueid(state))) {
      // console.log("state_to_uniqueid(state) is working!");
      //For each loop: Do, remove the 
      let successors = find_successors(state);
      let counter = path.limit + 1; //Increment the counter in 
      for(let i = 0; i < successors.length; i++){

        let newPath = {
          actions: [],
          states: [],
          limit: 0
        };
        //make deep cody from path
        newPath.actions = path.actions.slice(0);
        newPath.states = path.states.slice(0);
        newPath.actions.push(successors[i].actionID);
        newPath.states.push(successors[i].resultState);
        newPath.limit = counter;
        //STEP: 5) Goal Test
        open.push(newPath);
        if(is_goal_state(successors[i].resultState)){
          return {
            actions: newPath.actions,
            states: newPath.states
          };
        }
      }
      //STEP: 6)Add to closed set
      closed.add(state_to_uniqueid(state));
    }
  }

  //No solution found
  console.log("No solution found! (Hint: Try a larger limit)\n");
  return null;
}
 /*
================================
IDS(Iterative Deepening Search)
================================
*/ 
//Perform iterative deepening search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function iterative_deepening_search(initial_state) {

	let result = null;
	for(var depth_limit = 0; depth_limit < Number.POSITIVE_INFINITY; depth_limit++){
		result = depth_limited_search(initial_state, depth_limit);
		if (result == null){
			continue;
		}else {
			break;
		}
	}

  //No solution found
  console.log("No solution found!\n");
  return result;
}


 /*
================================
A*(Astart Search)
================================
*/ 
//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function astar_search(initial_state) {

  //STEP: 1),2)Initialize the open and closed set
  let open = new FastPriorityQueue(function(a,b) { return a.estimated_total_cost < b.estimated_total_cost; });
  let closed = new Set();
  let fixed_step_cost = 1; //Assume action cost is constant

    let path = {
      actions: [],
      states: [],
      estimated_total_cost: 0,
      cost: 0
      };
      //The initialization should excluded the initial node
    path.states.push(initial_state);
    path.estimated_total_cost = calculate_heuristic(initial_state) + path.cost;
    open.add(path);
    if(is_goal_state(initial_state)){
      return {
        actions: path.actions,
        states: path.states
      };
    }
  // });

  //STEP: 3) Loop do while open is not empty
  while(!open.isEmpty()){
    //STEP: 4) Choose a leaf node and remove it from open
    let path = open.poll();
    let state = path.states[path.states.length-1]; /*Assume the poll will give the minimum cost path*/
    //STEP: 7)(Expand the chosen node and Add the action and node to open) iff not in closed set
    if(!closed.has(state_to_uniqueid(state))) {

      let successors = find_successors(state);
      let len = successors.length;
      let newCost = path.cost + fixed_step_cost;
      for(let i = 0; i < len; i++){
        let newPath = {
          actions: [],
          states: [],
          estimated_total_cost: 0,
          cost: 0
        };
        //make deep cody from path
        newPath.actions = path.actions.slice(0);
        newPath.states = path.states.slice(0);
        newPath.actions.push(successors[i].actionID);
        newPath.states.push(successors[i].resultState);
        newPath.cost = newCost;
          /*Queue suppose should evaluate based on the total cost, but since Prioirity Queue was done by somebody else, so, without lossing the geneority, we take estimated_total_cost as the totle cost!*/
        newPath.estimated_total_cost = calculate_heuristic(successors[i].resultState) + newPath.cost;
        //STEP: 5) Goal Test
        open.add(newPath);
        if(is_goal_state(successors[i].resultState)){
          return {
            actions: path.actions,
            states: path.states
          };
        }
      }
      //STEP: 6)Add to closed set
      closed.add(state_to_uniqueid(state));
    }
  }

  /*
    Hint: A* is very similar to BFS, you should only need to make a few small modifications to your BFS code.
	
    You will need to add values to your augmented state for path cost and estimated total cost.
    I suggest you use the member name "estimated_total_cost" so that the above priority queue code will work.
    
    Call function calculate_heuristic(state) (provided for you) to calculate the heuristic value for you.
	
    See (included) FastPriorityQueue.js for priority queue usage example.
  */

  //No solution found
  return null;
}

