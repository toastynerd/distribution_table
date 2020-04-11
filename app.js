var states = [];
var allBrands = [];
$(function() {
  resultsTable = $('#results');
  var addRow = function(data) {
    resultsTable.append(`
      <tr>
        <th>${data.state}</th>
        <th>${data.brand}</th>
        <th>${data.distributor}</th>
      </tr>
    `);
  }

  distTable.forEach(function(data) {
    if (states.indexOf(data.state) == -1)
      states.push(data.state);

    addRow(data);  

    if (allBrands.indexOf(data.brand) == -1)
      allBrands.push(data.brand);
  });

  var brandForm = $('#brand');
  var statesForm = $('#state');
  states.forEach(function(state) {
    statesForm.append(`<option value="${state}">${state}</option>`);
  });

  allBrands.forEach(function(brand) {
    brandForm.append(`<option value="${brand}">${brand}</option`);
  });

  statesForm.on('change', function() {
    resultsTable.children('tr').remove()
    brandForm.children().not("option:first").remove();
    var brands = [];
    var state = statesForm.children("option:selected").val();

    if (state === "all") {
      allBrands.forEach(function(brand) {
        brandForm.append(`<option value="${brand}">${brand}</option`);
      });
      distTable.forEach(function(data) {
        addRow(data);
      });
    }
    distTable.forEach(function(data) {
      if (data.state == state) {
        brandForm.append(`<option value="${data.brand}">${data.brand}</option>`);
        addRow(data);
      }
    });
  });

  brandForm.on('change', function() {
    resultsTable.children('tr').remove();
    state = statesForm.children("option:selected").val();
    brand = brandForm.children("option:selected").val();
    distTable.forEach(function(data) {
      if ((data.state == state || state === "all") && (data.brand == brand || brand === "all")) {
        addRow(data);
      }
    });
  });
});
