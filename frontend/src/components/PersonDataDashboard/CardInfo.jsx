import Card from 'react-bootstrap/Card';
import EmailSentTable from './EmailSentTable';

function CardInfo({personData , setCurrEmail}) {
  
const calcClickRate = () => {
  const clickedMail = personData.emailSend.filter(
    (e) => e.clicked == true
  ).length;

  const total = personData.emailSend.length;

  return total > 0 ? ((clickedMail / total) * 100).toFixed(2) + "%" : "0%";
};


  return (
    <Card >
      <Card.Body>
        <Card.Title>Name : {personData.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> G-mail Id : {personData.emailId}</Card.Subtitle>
        <strong>Click Rate:</strong> {calcClickRate()}

        <EmailSentTable emailsent={personData?.emailSend || []} setCurrEmail={setCurrEmail}/>
      </Card.Body>
    </Card>
  );
}

export default CardInfo;