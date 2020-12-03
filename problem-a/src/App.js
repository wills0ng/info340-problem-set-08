import React from 'react'; //import React library

const EXAMPLE_SENATORS = [  
  { id: 'C000127',  name: 'Maria Cantwell', state: 'WA',  party: 'Democrat', phone: '202-224-3441', twitter: 'SenatorCantwell' },
  { id: 'M001111', name: 'Patty Murray', state: 'WA', party: 'Democrat', phone: '202-224-2621', twitter: 'PattyMurray' }
];


/* App component */
export function App(props) {
  return (
    <div className="container">
      <h1>US Senators (Oct 2020)</h1>
      <SenatorTable senators={props.senators}/>
    </div>
  );
}


/* SenatorTable component */
export function SenatorTable(props) {
  let columnNameArray = ['Name', 'State', 'Phone', 'Twitter'];

  let senatorRows = props.senators.map(senator => {
    return <SenatorRow senator={senator} key={senator.id} />
  });

  return (
    <table className="table table-bordered">
      <TableHeader columnNames={columnNameArray}/>
      <tbody>
        {senatorRows}
      </tbody>
    </table>
  );
}


/* TableHeader component */
export function TableHeader(props) {
  let tableHeadings = props.columnNames.map(columnName => {
    return <th key={columnName}>{columnName}</th>;
  });
  return (
    <thead>
      <tr>
        {tableHeadings}
      </tr>
    </thead>
  );
}


/* SenatorRow component */
export function SenatorRow(props) {
  let senator = props.senator;
  return (
    <tr>
      <td>{senator.name}</td>
      <td>{`${senator.party.charAt(0)} - ${senator.state}`}</td>
      <td>
        <a href={`tel:${senator.phone}`}>{senator.phone}</a>
      </td>
      <td>
        <a href={`https://twitter.com/${senator.twitter}`}>{`@${senator.twitter}`}</a>
      </td>
    </tr>
  );
}