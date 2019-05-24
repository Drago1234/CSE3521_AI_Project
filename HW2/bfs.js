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
