import { getFileExtension, isCSVFile, csvFileToJsonConverter } from "./utils";


describe("Testing Utils File", () => {
    test("getFileExtension function should return csv extension when csv file passed as argument", () => {
        var fileName = "students.csv"
        var value = getFileExtension(fileName);
        expect(value).toEqual("csv");
    })

    test("getFileExtension function should return html extension when html file passed as argument", () => {
        var fileName = "friends.html"
        /* ANOTHER WAY
        var files = [
            {name:"csvFile.csv", extention:"csv"},
            {name:"cssFile.css", extention:"csv"}
        ]

        files.forEach(file => {
            expect(getFileExtension(file.name)).toEqual(file.extention)
        })
       */
        var value = getFileExtension(fileName);
        expect(value).toEqual("html");
    })
        
    test("getFileExtension function should return empty strings when argument does'nt passed", () => {
        var value = getFileExtension();
        expect(value).toEqual("");
    })

    test("isCSVFile return value should have to match with csv and return true", () => {
        var Dummy_File = {
            name:"employee.csv"
        }

       var value = isCSVFile(Dummy_File);
       expect(value).toBeTruthy()
    })

    test("isCSVFile return value shouldn't  match with csv and return false", () => {
        var Dummy_File = {
            name:"employee.html"
        }

       var value = isCSVFile(Dummy_File);
       expect(value).toBeFalsy();
    })

    test("csvFileToJsonConverter should return header length 1 when empty string passed as argument", () => {
        var value = csvFileToJsonConverter("");
        var { TableHeader } = value;
        expect(TableHeader.length).toBe(1);
    })

    test("csvFileToJsonConverter should return header and data length", () => {
        var Dummy_File_Content = `Name, Job, Salary
                                  Rosy, UI Dev, 30000
                                  Jhon, TestEngineer, 50000`
        
        var value = csvFileToJsonConverter(Dummy_File_Content);
        var { TableHeader, RemainingTableContent} = value;
        expect(TableHeader.length).toBe(3);
        expect(RemainingTableContent.length).toBe(2)
    })
    
    
})