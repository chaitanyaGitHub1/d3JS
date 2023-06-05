import fs from "fs";

// Read the original JSON file
fs.readFile("original.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const json = JSON.parse(data);

    // Define the state name to code mapping
    const namemap = new Map([
      ["Alabama", "01"],
      ["Alaska", "02"],
      ["Arizona", "04"],
      ["Arkansas", "05"],
      ["California", "06"],
      ["Colorado", "08"],
      ["Connecticut", "09"],
      ["Delaware", "10"],
      ["District of Columbia", "11"],
      ["Florida", "12"],
      ["Georgia", "13"],
      ["Hawaii", "15"],
      ["Idaho", "16"],
      ["Illinois", "17"],
      ["Indiana", "18"],
      ["Iowa", "19"],
      ["Kansas", "20"],
      ["Kentucky", "21"],
      ["Louisiana", "22"],
      ["Maine", "23"],
      ["Maryland", "24"],
      ["Massachusetts", "25"],
      ["Michigan", "26"],
      ["Minnesota", "27"],
      ["Mississippi", "28"],
      ["Missouri", "29"],
      ["Montana", "30"],
      ["Nebraska", "31"],
      ["Nevada", "32"],
      ["New Hampshire", "33"],
      ["New Jersey", "34"],
      ["New Mexico", "35"],
      ["New York", "36"],
      ["North Carolina", "37"],
      ["North Dakota", "38"],
      ["Ohio", "39"],
      ["Oklahoma", "40"],
      ["Oregon", "41"],
      ["Pennsylvania", "42"],
      ["Rhode Island", "44"],
      ["South Carolina", "45"],
      ["South Dakota", "46"],
      ["Tennessee", "47"],
      ["Texas", "48"],
      ["Utah", "49"],
      ["Vermont", "50"],
      ["Virginia", "51"],
      ["Washington", "53"],
      ["West Virginia", "54"],
      ["Wisconsin", "55"],
      ["Wyoming", "56"],
    ]);

    // Iterate through each feature and update the state name property
    json.features.forEach((feature) => {
      const stateName = feature.properties.stateName;
      if (stateName) {
        const stateCode = namemap.get(stateName);
        if (stateCode) {
          feature.properties.name = stateCode;
        }
      }
    });

    // Create the updated JSON string
    const updatedJson = JSON.stringify(json, null, 2);

    // Write the updated JSON to a new file
    fs.writeFile("updated.json", updatedJson, (err) => {
      if (err) {
        console.error("Error writing the file:", err);
        return;
      }

      console.log("JSON file updated successfully!");
    });
  } catch (err) {
    console.error("Error parsing JSON:", err);
  }
});
