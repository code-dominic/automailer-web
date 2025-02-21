import ClickedStatus from "./ClickedStatus";
import StatusBadge from "./StatusBadge";

function ListItems(props){

    console.log(props.index);
    
    return(
        <li key={props.index} className="list-group-item">
              {props.email}   - <StatusBadge status = {props.status}/> <ClickedStatus clicked = {props.clicked}/>
            </li>
    )

}

export default ListItems;