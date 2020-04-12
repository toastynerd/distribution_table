var states = [];
var allBrands = [];
var allDist = [];
$(function() {
  resultsTable = $('#results');
  var addRow = function(data) {
    resultsTable.append(`
      <li>
        <span>${data.state}</span>
        <span>${data.brand}</span>
        <span>${data.distributor}</span>
      </li>
    `);
  }

  distTable.forEach(function(data) {
    if (states.indexOf(data.state) === -1)
      states.push(data.state);

    if (allBrands.indexOf(data.brand) === -1)
      allBrands.push(data.brand);

    if (allDist.indexOf(data.distributor) === -1)
      allDist.push(data.distributor);

    addRow(data);  
  });

  var brandForm = $('#brand');
  var statesForm = $('#state');
  var distForm = $('#distributor');
  states.sort();
  allBrands.sort();
  allDist.sort();
  states.forEach(function(state) {
    statesForm.append(`<option value="${state}">${state}</option>`);
  });

  allBrands.forEach(function(brand) {
    brandForm.append(`<option value="${brand}">${brand}</option`);
  });

  allDist.forEach(function(dist) {
    distForm.append(`<option value="${dist}">${dist}</option>`);
  });

  var handleChange = function() {
    resultsTable.children('li').remove();
    var state = statesForm.children("option:selected").val();
    var brand = brandForm.children("option:selected").val();
    var dist = distForm.children("option:selected").val();

    distTable.forEach(function(data) {
      if ((data.state === state || state === 'all') && (data.brand === brand || brand === 'all') && (data.distributor === dist || dist === 'all')) {
        addRow(data);
      }
    });
  };
  statesForm.on('change', handleChange);
  brandForm.on('change', handleChange);
  distForm.on('change', handleChange); 
});
