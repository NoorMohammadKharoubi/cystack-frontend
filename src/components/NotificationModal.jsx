import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function NotificationModal(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formDataObj.email,
        days: formDataObj.days,
        certificate: props.item,
      }),
    };
    fetch("http://127.0.0.1:8000/api/notifications", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.handleClose(event);
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              Get Notification To Your E-mail Before The Expiry Date
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTime">
              <Form.Label>Days before expiration</Form.Label>
              <Form.Control as="input" rows={3} name="days" type="number" />
              <Form.Text>
                Enter the days to send notification to your email before
                expiration
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default NotificationModal;
