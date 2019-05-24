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