  //A node has actionsArr, stateArr, and cost, {[], [initial_state], 0}
  //STEP: 1),2)
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  /***Your code for breadth-first search here***/
  //Add the root node
  let actions = [];
  let states = [initial_state];
  let object={
    actions : actions,
    states : states
  };
  open.push({actions, states}); //actionsArr, stateArr, and cost
  //Return if the root node is goal state
  if(is_goal_state(initial_state)){
    return {actions, states};
  }
  //STEP: 3)
  //Loop
  var lenOpen = open.length;
  while (lenOpen>0){
    //STEP: 4)choose a leaf node and remove it from fringe
    //dequeue the first node
    var node = open.shift();
    //STEP: 6)add to closed set
    closed.add(state_to_uniqueid(node)); //Add chosen node to closed set
    //STEP: 7)(Expand the chosen node and Add the action and state to fringe) iff not in fringe or closed set
    var successors = find_successors(node);
    var len = successors.length;
    for(var i = 0; i < len; i++){
      //if not in closed set
      var action = successors[i].actionID();
      var state = successors[i].resultState();
      if (!closed.has(state_to_uniqueid({action, state}))){
        //if is goal states --> result solution
        actions = actions.concat(action);
        states = states.concat(state);
        open.push({actions, states});
        if(is_goal_state(successors[i].resultState())){
          return{actions, states};
        }
      }
    }
  }