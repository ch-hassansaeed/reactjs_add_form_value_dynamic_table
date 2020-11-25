import React, { useState } from 'react';
import ReactDOM from 'react-dom';


//style sheet for form and table
const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

class PhoneBookForm extends React.Component {
constructor(props) {
    super(props);
    //set default state as empty
    this.state = {
      userFirstname: "Coder",
      userLastname: "Byte",
      userPhone: "8885559999"
    };
  }
  //on type anything in field change its state
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log(this.state);
    });
  };

  

//when user will click on add user/submit button
  onSubmit = () => {
    console.log("called add user submit button");
       // e.preventDefault();
       //append or add this form data in people array
    this.props.appendToList({
      userFirstname: this.state.userFirstname.toLowerCase(),
      userLastname: this.state.userLastname.toLowerCase(),
      userPhone: this.state.userPhone.toLowerCase()
    });
  };

//render phonebook add form
  render() {
  return (
    <form style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        onChange={this.onChange}
       value={this.state.userFirstname}
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        onChange={this.onChange}
        value={this.state.userLastname}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
       onChange={this.onChange}
      value={this.state.userPhone}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='button' 
        value='Add User' 
        onClick={this.onSubmit}
      />
    </form>
  );
}
}//PhoneBookForm class end

//show the table of address book people data
function InformationTable(props) {
  console.log("props info of people:", props.peoples);

 const myData=[].concat(props.peoples).sort((a, b) => (a.userLastname > b.userLastname) ? 1 : -1);

console.log("data after sort info of people:", myData);
//render the table of address book people data
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      <tbody>
     {myData && myData.map(item => {
              return (
                <tr key={item.userPhone}>
                  <td style={style.tableCell}>{item.userFirstname}</td>
                  <td style={style.tableCell}>{item.userLastname}</td>
                  <td style={style.tableCell}>{item.userPhone}</td>
                </tr>
              );
            })}
</tbody>
    </table>
  );
}//InformationTable func end

//class the element for addressbook form class and table information func
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPeople: [{}]
    };
  }
//add or append each new people record via address book form
  appendToList(people) {
    console.log("currenet people add:", people);
    this.setState(
      { listOfPeople: this.state.listOfPeople.concat(people) },
      () => {
        console.log(this.state.listOfPeople);
      }
    );
   // */


  }//append func end

  render = () => {
    return (
      <section>
        <PhoneBookForm appendToList={this.appendToList.bind(this)} />
        <InformationTable peoples={this.state.listOfPeople} />
      </section>
    );
  };
}//Application class end

ReactDOM.render(<Application />, document.getElementById("root"));
