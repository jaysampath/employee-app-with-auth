import { useState, useEffect} from "react";
import EmployeeItem from "./EmployeeItem";

import classes from "./Employees.module.css";

const Employees = () => {
  
  
  const [fetchedEmployees, SetFetchedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();
  

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      const response = await fetch(
        "https://nc1qe11dsi.execute-api.us-east-2.amazonaws.com/api2_cors/crud-api2",
        {
          headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            
             
          },
        }
      );
       //console.log('get all employees responce',response);
      if (!response.ok) {
        //console.log('get all employees responce',response);
        throw new Error("Error while fetching data");
      }

      const data = await response.json();
       //console.log('fetched data=',data);
      const fetchedResults = [];
      for (const key in data) {
        fetchedResults.push({
          id: data[key].empId,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          email: data[key].email,
        });
      }

      SetFetchedEmployees(fetchedResults);
      // console.log('fetched results = ',fetchedResults);
      setIsLoading(false);
      setIsError(null);
    };
    try {
      fetchEmployees().catch((error) => {
        console.log(error);
        setIsError(error);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

 

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <p>fetching.. employee data</p>
      </div>
    );
  }

  const deleteEmployeeHandler = (id) => {
    if (!window.confirm("Are you sure. you want to delete this employee?")) {
      return;
    }
    const deleteEmployee = async () => {
      const response = await fetch(
        `https://yqo4nu60xg.execute-api.us-east-2.amazonaws.com/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
            
             
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Error while deleting employee");
      }

      //   const data = await response.json();
      //  console.log('delete response: ',data);

      // history.go("/employees");
      SetFetchedEmployees((prevEmps) =>
        prevEmps.filter((emp) => emp.id !== id)
      );
    };

    try {
      deleteEmployee().catch((error) => {
        // console.log(error.message);
      });
    } catch (error) {}
  };

  return (
    <div>
      <h1 className={classes.title}>Employees</h1>
      {isError && !isLoading ? (
        <div className={classes.errorDiv}>Error while fetching data</div>
      ) : (
        " "
      )}
      {!isLoading && (
        <table className="table table-striped table-hover">
          <thead className={`thead-dark  ${classes.thead}`}>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedEmployees.map((employee) => {
              return (
                <EmployeeItem
                  key={employee.id}
                  id={employee.id}
                  firstName={employee.firstName}
                  lastName={employee.lastName}
                  email={employee.email}
                  onDelete={deleteEmployeeHandler}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employees;
