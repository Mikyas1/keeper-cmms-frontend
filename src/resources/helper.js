const getColor = function(val) {
  if (val) {
    if (val === "GR") {
      return "green";
    } else if (val === "RD") {
      return "red";
    } else if (val === "OG") {
      return "orange";
    }
  } else {
    return "gray";
  }
};

const get_options = function(filter_data, filter_field) {
  let data = [];
  for (var index in filter_data[filter_field]) {
    data.push({
      value: filter_data[filter_field][index].id,
      text: filter_data[filter_field][index].name
    });
  }
  return data;
};

const get_complex_options = function(filter_data, filter_field) {
  let data = [{ value: "", text: "---------------" }];
  for (var index in filter_data[filter_field]) {
    data.push({
      value: filter_data[filter_field][index],
      text: filter_data[filter_field][index].name
    });
  }
  return data;
};


/**
 * 
 * @param {*} filters
 * 
 * expects filter of {filter: <filter_parmeter:String>, 
 *                    value: { 
 *                              id: <filter_object.id:Id>,   
 *                              name: <filter_object.name:String>} } 
 */
const get_filter_query = function(filters) {

  var query = "/?";
  var key = "";

  for (var index in filters) {
    query += filters[index].filter + '=';
    
    if (filters[index].value) {
      query += filters[index].value.id;
      if (filters[index].value.name) {
        key += filters[index].value.name + ', ';
      }
    }

    query += '&';

  }

  return {query: query, key: key};
}

export { getColor, get_options, get_complex_options, get_filter_query };
