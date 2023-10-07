import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import App from "./App";
// import { isCSVFile } from "./utils";

describe("App File Testing", () => {
  test("csv data testing", async () => {
    var Dummy_Error_File = new File([''], "index.html");
    var AppRender = render(<App />);
    var htmlInput = screen.getByTestId("inputFile");
    
    fireEvent.change(htmlInput, {
      target: { files: [Dummy_Error_File] },
    });

    await waitFor(() => expect(screen.getByText("Please Select Csv File!")).toBeInTheDocument());

    var Dummy_File_Content = `Name, Job
                            Johnson, UI Dev
                            George, TestEngineer`;
    var Dummy_FileName = "Employee.csv";
    expect(htmlInput).toBeInTheDocument();
    expect(AppRender).toMatchSnapshot();

    const readAsTextMock = jest.fn();
    jest.spyOn(global, "FileReader").mockImplementation(function () {
      const self = this;
      this.readAsText = readAsTextMock.mockImplementation(() => {
        self.onload({ target: { result: Dummy_File_Content } });
      });
    });

    var file = new File([Dummy_File_Content], Dummy_FileName);
    act(() => {
      fireEvent.change(htmlInput, {
        target: { files: [file] },
      });
    });

    await waitFor(() => expect(screen.getByText("UI Dev")).toBeInTheDocument());

    
  });

 
 
});
