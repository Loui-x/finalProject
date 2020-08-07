import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    startDate: Date,
    endDate: Date,
    reasonforAbsence: '',
    substitueFound: ["Yes","No"],
    status: "Draft"
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const employeeResp = await Axios.get(`/api/employees/${id}`);
      if (employeeResp.status === 200) setInputs(employeeResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/employees/update', inputs);

      if (resp.status === 200)  {
        toast("The employee reservation was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the reservation", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the reservation", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/employees"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit reservation Post</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="startDate"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End Date </Form.Label>
            <Form.Control
            
              name="endDate"
              onChange={handleInputChange}
              value={inputs.content}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Reason For Absence </Form.Label>
            <Form.Control
              as="textarea"
              name="reasonforAbsence"
              onChange={handleInputChange}
              value={inputs.content}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Found Substitue </Form.Label>
            <Form.Control
            
              name="substitueFound"
              onChange={handleInputChange}
              value={inputs.content}
            >  <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={handleInputChange}
              defaultValue={inputs.status || 'DRAFT'}
            >
              <option value="DRAFT">draft</option>
              <option value="PUBLISHED">published</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Create</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;