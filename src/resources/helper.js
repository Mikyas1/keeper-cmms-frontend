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

  var query = "?";
  var key = "";

  for (var index in filters) {
    query += filters[index].filter + '=';
    
    if (filters[index].value) {
      if(filters[index].value.id != null) {
        query += filters[index].value.id;
      }
      if (filters[index].value.name != null) {
        key += filters[index].value.name + ', ';
      }
    }

    query += '&';

  }

  return {query: query, key: key};
}


const getPrimary = function(vm) {
  return vm.$vuetify.theme.dark ? vm.$vuetify.theme.themes.dark.primary : vm.$vuetify.theme.themes.light.primary;
}

const getEmployeeName = function(val) {
  return ((val.user_type == 'supervisor' ? 'S-Op: ' : 'Op: ') +
  " " + val.first_name + 
  (val.last_name ? " " + val.last_name : "") + 
  " - " + val.employee_id)
}

// a function to substract 3 hours from selected time.
/**
 * 
 * USED A GODDAMN MOMENT TO DO THIS SHIT
 * 
 */
// try to find a better solution.
const prepareTime = function(date, time) {
  var houre = Number(time.slice(0,-3)) - 3;
  if (houre < 0) {
    houre = 24 + houre;
    var day = Number(date.substring(8,10)) - 1;
    if (day < 1) {
      // 3 Houre error is better than day error.
      return String(date) + ' ' + String(time);
    }
    var new_date = date.substring(8,0) + day;
  }
  var new_time = String(houre) + ':' + String(time.substring(3,5));

  return (new_date ? new_date : date) + ' ' + new_time;
}

export { getColor, 
        get_options, 
        get_complex_options, 
        get_filter_query, 
        getPrimary, 
        getEmployeeName, 
        prepareTime,
      };
