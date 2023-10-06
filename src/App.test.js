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
  test("Checking htmlElement input is in the document are not", async () => {
    var AppRender = render(<App />);
    var htmlInput = screen.getByTestId("inputFile");
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

    /*
    var Dummy_Error_Content = `Unable to Find File`
    const readAsTextMockError = jest.fn();
    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      const self = this;
      this.readAsText = readAsTextMockError.mockImplementation(() => {
        self.onerror({ target: { result:  Dummy_Error_Content } });
      });
    });
*/
  });

  /*
  test("Testing async test to cover error code on the screen", async () => {
     var InValidFileName = "Index.csv"
     var value = isCSVFile(InValidFileName);
     expect(!value).toEqual(true);
     await waitFor(() => expect( screen.getByText("Please Select Csv File!")).toBeInTheDocument())
     
  })
 */
});
