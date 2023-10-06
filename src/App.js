import React, { useState, useMemo } from 'react';
import './App.css';
import { isCSVFile, getFileData, csvFileToJsonConverter } from './utils';

export default function App() {
  var [error, setError] = useState(false);
  var [data, setData] = useState(null);
  

  var onFileChange = (event) => {
    var file = event.target.files[0];
    var isValidFile = isCSVFile(file);
    setError(!isValidFile);
    getFileData(file).then((fileData) => setData(fileData))

  };

  var { TableHeader, RemainingTableContent } = useMemo(() => {
    if (!data) {
      return {
        TableHeader: [],
        RemainingTableContent: [],
      };
    }
    return error ? csvFileToJsonConverter('') : csvFileToJsonConverter(data);
  }, [data]);

  console.log(
    ':: HEADER ::',
    TableHeader,
    ':: Remaining Data ::',
    RemainingTableContent
  );

  /*
  useMemo(() => {
    if (!data) {
      return {
        data: [],
      };
    }
    console.log(data);
    var dataSpliter = data.split('\n');
    console.log(dataSpliter, 'dataSpliter');
    var [header, ...remainingData] = dataSpliter;
    console.log(header, remainingData);
    var headerLine = header.split(',');
    console.log(headerLine);
  }, [data]);
  */

  return (
    <main>
      <h1 className="main-header">CSV - Table (Formatter)</h1>
      <div
        style={{
          maxWidth: '1000vw',
          display: 'flex',
          maxheight: '1000vh',
          gap: '1em',
        }}
        className="main-parent-div-view"
      >
        <div className="left-side-childDiv-screen-view">
          <h2 className="left-screen-childDiv-view-main-head">
            Click on "Select File" button to see some magic happen
          </h2>
          <section
            style={{ margin: '2em' }}
            className="left-chidDiv-section-view"
          >
            <label className="custom-file-upload">
              Select File
              <input
                type="file"
                accept=".csv"
                onChange={onFileChange}
                className="left-screen-chidDiv-input-view"
                data-testid="inputFile"
              />
            </label>
            <div className="leftSide-screen-childDiv-show-csv-view">
              {error ? (
                <h2 className="OnError-left-ChildDiv-csvDataSec-head">
                  Please Select Csv File!
                </h2>
              ) : (
                <div>
                  <h2 className="OnErrorF-left-ChildDiv-csvDataSec-head">
                    You can check your csv file here!
                  </h2>
                  <pre className="left-childDiv-pre-tag-secView">{data}</pre>
                </div>
              )}
            </div>
          </section>
        </div>
        <div className="rightside-childDiv-view">
          <h1 className="right-chidDiv-main-head">Table Format</h1>
          {error && (
            <h2 className="right-chidDiv-content-head2">
              Oops! Something Went Wrong
            </h2>
          )}
          {data && (
            <table className="right-chidDiv-table-view">
              <thead>
                <tr>
                  {TableHeader.map((column) => (
                    <th
                      key={column}
                      style={{
                        borderStyle: 'solid',
                        borderColor: `${error ? 'white' : 'steelblue'}`,
                        padding: `${error ? 'none' : '5px'}`,
                        fontSize: '20px',
                        borderWidth: '1px',
                      }}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="right-chidDIv-tbody-style">
                {RemainingTableContent.map((content, idx) => (
                  <tr key={idx} className="right-chidDIv-tbody-style">
                    {content.map((line) => (
                      <td key={line} className="right-childDiv-td-style">
                        {line}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
