function StatusBadge(props){
    console.log(props.status);

    if(props.status == 'Sent'){
    return (
        <span class="badge text-bg-success">sent</span>
    )
}
    if(props.status == "Pending"){
        return (
            <span class="badge text-bg-warning">Pending</span>
        )
    }
}



export default StatusBadge;