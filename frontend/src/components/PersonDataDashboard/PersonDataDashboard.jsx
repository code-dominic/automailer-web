import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import CardInfo from "./CardInfo";
import EmailTemplate from "./EmailTemplate";

const PersonDataDashboard = ({ _id, show, handleClose ,needRefresh , setNeedRefresh}) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [personData, setPersonData] = useState(null);
    const [currEmail, setCurrEmail] = useState();

    useEffect(() => {
        if (!_id) return;

        const fetchData = async () => {
            try {
                // alert("hit");
                const response = await axios.get(`${backendURL}emails/data?id=${_id}`);
                setPersonData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [_id]);

    useEffect(() => {
        if (personData?.emailSend?.length > 0) {
            setCurrEmail(personData.emailSend[personData.emailSend.length - 1].emailsendRef);
        }
    }, [personData]);


    const handelDelete = ()=>{
        if(!_id) return;

        const deleteData = async() =>{
            try{
                const res = await axios.get(`${backendURL}emails/delete?id=${_id}`);
                setNeedRefresh(needRefresh+1);
            }catch(err){
                console.log(err);
            }
        }
        deleteData();
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Person Data Dashboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!personData ? (
                    <h1>Error loading data</h1>
                ) : (
                    <Container>
                        <Row>
                            <Col>
                                <CardInfo personData={personData} setCurrEmail={setCurrEmail} />
                            </Col>
                            <Col>
                                {currEmail && <EmailTemplate currEmail={currEmail} />}
                            </Col>
                        </Row>
                    </Container>
                )}
            </Modal.Body>
            <Modal.Footer>

                <Button variant="outline-danger" onClick={handelDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PersonDataDashboard;
