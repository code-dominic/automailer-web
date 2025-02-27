import Card from 'react-bootstrap/Card';
import EmailSentTable from './EmailSentTable';

function CardInfo({personData , setCurrEmail}) {
  return (
    <Card >
      <Card.Body>
        <Card.Title>Name : {personData.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> G-mail Id : {personData.emailId}</Card.Subtitle>
        <EmailSentTable emailsent={personData?.emailSend || []} setCurrEmail={setCurrEmail}/>
      </Card.Body>
    </Card>
  );
}

export default CardInfo;