import {
  createTableParser,
  RowData,
  TableParserFactory,
} from "npm:parse-html-table";

// Define the specific row data interface
interface PersonData extends RowData {
  name: string;
  age: string;
  country: string;
}

// Create a specific table parser factory
const personTableParserFactory: TableParserFactory<RowData> =
  createTableParser<RowData>();

// Example HTML table 1
const html1 = `
  <table>
    <thead>
      <tr>
        <th>名前</th>
        <th>年</th>
        <th>国籍</th>
        <th>性別</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>30</td>
        <td>USA</td>
        <td>男性</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Canada</td>
        <td>女性</td>
      </tr>
    </tbody>
  </table>
`;

// Example HTML table 2
// Parse the name of the columns if they have spaces as cameoCase correctly
const html2 = `
  <table>
    <thead>
      <tr>
        <th>full name</th>
        <th>full age</th>
        <th>full country</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>30</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Canada</td>
      </tr>
    </tbody>
  </table>
`;

// Example HTML table 3 (empty table)
const html3 = "";

// Parse table 1
const tableParser1 = personTableParserFactory(html1);
//const tableParser1 = TableParserFactory(html1);
const tableData1 = tableParser1();
console.log("Table 1 Data:", tableData1);

// Parse table 2
const tableParser2 = personTableParserFactory(html2);
//const tableParser2 = TableParserFactory(html2);
const tableData2 = tableParser2();
console.log("Table 2 Data:", tableData2);

// Parse table 3
const tableParser3 = personTableParserFactory(html3);
//const tableParser3 = TableParserFactory(html3);
const tableData3 = tableParser3();
console.log("Table 3 Data:", tableData3);