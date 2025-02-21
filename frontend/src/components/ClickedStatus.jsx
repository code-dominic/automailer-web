function ClickedStatus(props){

    if(props.clicked){
    return (
        <span class="badge text-bg-success">Clicked</span>
    )
}
    else{
        return (
            <span class="badge text-bg-warning">Pending</span>
        )
    }
}



export default ClickedStatus;