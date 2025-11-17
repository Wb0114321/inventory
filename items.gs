// ====== CONFIGURATION ======
const SHEET_ID = "1tbjXXPjF4FX5fRGdVoxmABEABYCvf6P1WL_F1Tvm4pE";
const MASTER_SHEET = "item_master";   // barcode, item_name, category, timestamp
const ENTRY_SHEET = "items";          // full stock entry form


// ====== LOAD HTML UI ======
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index").setTitle("Stock Entry");
}


// ====== AUTO FETCH DETAILS FROM item_master ======
function getItemDetails(barcode) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(MASTER_SHEET);
  const data = sh.getDataRange().getValues();

  const header = data.shift();  // remove header row

  const indexBarcode = header.indexOf("barcode");
  const indexName = header.indexOf("item_name");
  const indexCat = header.indexOf("category");

  for (let row of data) {
    if (String(row[indexBarcode]).trim() === String(barcode).trim()) {
      return {
        name: row[indexName],
        category: row[indexCat]
      };
    }
  }
  return null;
}


// ====== SAVE ENTRY INTO items SHEET ======
function saveData(obj) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(ENTRY_SHEET);

  const timeStamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

  sh.appendRow([
    obj.barcode,
    obj.name,
    obj.category,
    obj.podate,
    obj.pono,
    obj.invdate,
    obj.invno,
    obj.issuedate,
    obj.unit,
    obj.qty,
    timeStamp
  ]);

  return "Entry Saved Successfully!";
}
