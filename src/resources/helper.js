var moment = require('moment');

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
const prepareTime = function(date, time) {
  var momtime = moment(date + ' ' + time, "YYYY-MM-DD hh:mm")
  return momtime.format();
}

const openWindowWithPost = function(url, data) {
  var form = document.createElement("form");
  form.target = "_blank";
  form.method = "POST";
  form.action = url;
  form.style.display = "none";

  for (var key in data) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export { getColor, 
        get_options, 
        get_complex_options, 
        get_filter_query, 
        getPrimary, 
        getEmployeeName, 
        prepareTime,
        openWindowWithPost,
      };
