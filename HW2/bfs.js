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
  //STEP: 1),2)
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  /***Your code for breadth-first search here***/
  //Add the root node
  let actions = [];
  let states = [];

  var node = {
    action: null,
    state: initial_state
    predecessor: null
  };

  open.push(node);
  //Return if the root node is goal state
  if(is_goal_state(node.state)){
    return {
      actions: actions, 
      states: states
    };
  }
  
  //STEP: 3)
  //Loop
  var lenOpen = open.length;

  while (lenOpen>0){
    //STEP: 4)choose a leaf node and remove it from fringe
    //dequeue the first node
    var node = open.shift();
    //STEP: 6)add to closed set
    if (closed.has(node.state)){
    //   closed.add(node.state); //Add chosen node to closed set
    // }else {
      continue;
    }
    //STEP: 7)(Expand the chosen node and Add the action and state to fringe) iff not in fringe or closed set
    var neighbours = find_successors(node.state);
    var len = neighbours.length;
    for(var i = 0; i < len; i++){
      //Make a new node
      var node = {
        action:neighbours[i].actionID, 
        state:neighbours[i].resultState,
        predecessor: node
      };
      if (!closed.has(node.state)){
        actions.push(node.action);
        states.push(node.state);
        open.push(node);
        //STEP: 5)if is goal states --> return solution
        if(is_goal_state(node.state)){
          return{
            actions: actions,
            states: states
          };
        }
      }else{
        continue;
      }
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
  console.log("No solution found!\n")
  return null;
}
