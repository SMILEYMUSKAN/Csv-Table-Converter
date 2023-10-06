export var getFileExtension = (filename = '') => {
    var fileTextSplit = filename.split('.');
  
    return fileTextSplit[fileTextSplit.length - 1];
  };
  
  export var isCSVFile = (file) => {
    return getFileExtension(file.name) === 'csv';
  };
  
  export var getFileData = (file) => {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      fileReader.onload = (event) => {
        var {
          target: { result },
        } = event;
        resolve(result);
      };
      fileReader.onerror = (event) => {
        var {
          target: { error },
        } = event;
        reject(error);
      };
  
      fileReader.readAsText(file);
    });
  };
  
  export var csvFileToJsonConverter = (csvData) => {
    var [headerline, ...dataLines] = csvData.split('\n');
    var TableHeader = replaceCommasInLine(headerline)
      .trim()
      .split(',')
      .map((word) => replaceChars(word));
  
    var RemainingTableContent = dataLines.map((line) => {
      return replaceCommasInLine(line)
        .trim()
        .split(',')
        .map((word) => replaceChars(word));
    });
  
    return {
      TableHeader,
      RemainingTableContent,
    };
  };
  
  export var replaceChars = (word) =>
    word.replaceAll('@@@', ',').replaceAll('"', '').trim();
  
  export var replaceCommasInLine = (line) => {
    var quotesPosition = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        quotesPosition.push(i);
        console.log(i, 'Index Value -> quotesPosition');
      }
    }
  
    var commaIndex = [];
    for (let i = 0; i < quotesPosition.length / 2; i++) {
      var startIndex = quotesPosition[i * 2];
      var endIndex = quotesPosition[i * 2 + 1];
      var word = line.substring(startIndex, endIndex + 1);
  
      word.split('').forEach((char, index) => {
        if (char === ',') {
          commaIndex.push(index + startIndex);
          console.log(commaIndex, ':: COMMA INDEX ::');
        }
      });
    }
  
    var chars = [...line];
    commaIndex.forEach((index) => {
      chars[index] = '@@@';
    });
    console.log(chars, 'Each Chars');
  
    return chars.join('').trim();
  };
  
  