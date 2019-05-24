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
