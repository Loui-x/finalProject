import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      await getEmployees();
    })();
  }, []);

  const getEmployees = async () => {
    const employeesResp = await Axios.get('/employees');
    if (employeesResp.status === 200) setEmployees(employeesResp.data);
  };

  const deleteEmployee = async employees => {
    try {
      const resp = await Axios.post('/employees/delete', {
        id: employees._id
      });

      if (resp.status === 200) toast("The reservation was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getEmployees();
    } catch (error) {
      toast("There was an error deleting the Employee", {type: toast.TYPE.ERROR});
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>Archive</h1>
      </header>

      <hr/>

      <div className="content">
        {employees && employees.map((employee, i) => (
          <div key={i} className="card my-3">
            <div className="card-header clearfix">
              <div className="float-left">
                <h5 className="card-title">
                  {employees.startDate}
                </h5>

                {employees.user ? (
                  <small>~{employees.user.fullname}</small>
                ) : null}
              </div>
                  
              <div className="float-right">
                <small>{employees.updatedAt}</small>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">
                {employees.synopsis}
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/employees/edit",
                  state: {
                    id: employee._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteEmployee(employee)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;