import { Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SidePanelItems = (props)=>{
    function handelClick(){
        props.setEmailsRequired(props.name)
    }


    return(
        <Button variant={props.variant}  onClick={handelClick}>{props.name}</Button>
    )



    }

export default SidePanelItems;