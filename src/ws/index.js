import  rs from "reconnectingwebsocket";
import store from "../resources/store";

class CustomSocket {
  /**
   * A Custom Socket class with inhanced features
   * 
   */
  constructor(store) {
    this.socket = rs;
    this.link = "";
    this.row_link = "";
    this.connection = null;
    this.store = store;
  }

  /**
   * start connection.
   */
  start(link) {
    this.create_connection(link);


    this.connection.onopen = (e) => {
      console.log("message", e)
    };

    // return store => {
    this.connection.onmessage = data => {
      console.log("From Socket", data);
      this.handle_message(data);
    };

    this.connection.onclose = () => {};

  }

  close() {
    if (this.connection) {
      this.connection.close();
    }
  }

  // restart(){
  //   this.close();
  //   this.start(this.row_link);
  // }

  /**
   * Create a socket connection.
   */
  create_connection(link) {
    this.row_link = link;
    let baseWsURL =process.env.VUE_APP_WS_URL;
    let data = JSON.parse(localStorage.getItem("keeper"));
    if (data && data.auth.token) {
        // link = baseWsURL + "notification/?token=" + data.auth.token;
        this.link = baseWsURL + link + "/?token=" + data.auth.token;
    } else {
        this.link = baseWsURL + link + "/";
    }

    this.connection = new this.socket(this.link);
  }

  /**
   * Handle message from socket.
   */
  handle_message(data) {
    let data_parsed = JSON.parse(data.data);
    if (data_parsed.notification.event){
      
      // remove workorder-request or report
      if (data_parsed.notification.event == "RM" && data_parsed.notification.type == "RQ") {
        let ignored = data_parsed.notification.ignored ? " ignored and " : " approved and ";
        this.store.commit("reports/REMOVE_OPEN_REPORT", data_parsed.notification.id);
        this.store.commit("SET_SNACKBAR", {
            message: "Request with id: " + data_parsed.notification.id + " is" + ignored + "closed!",
            value: true,
            status: "success"
          });
      }

      // add workorder-request or report
      if (data_parsed.notification.event == "AD" && data_parsed.notification.type == "RQ") {
        this.store.commit("reports/ADD_OPEN_REPORTS", data_parsed.notification.report);
        this.store.commit("SET_SNACKBAR", {
            message: "New workorder Request Add!",
            value: true,
            status: "success"
          });
      }

      // add open workorder
      if (data_parsed.notification.event == "AD" && data_parsed.notification.type == "WO") {
        this.store.commit("workorder/ADD_OPEN_WORKORDERS", data_parsed.notification.workorder);
        this.store.commit("SET_SNACKBAR", {
            message: "New workorder `" + data_parsed.notification.workorder.name + "` Added!",
            value: true,
            status: "success"
          });
      }

      // remove open workorder
      if (data_parsed.notification.event == "RM" && data_parsed.notification.type == "WO") {
        this.store.commit("workorder/REMOVE_OPEN_WORKORDERS", data_parsed.notification.id);
        this.store.commit("SET_SNACKBAR", {
            message: "Workorder with id: " + data_parsed.notification.id + " is closed!",
            value: true,
            status: "success"
          });
      }

      // update open workorder
      if (data_parsed.notification.event == "UP" && data_parsed.notification.type == "WO") {
        this.store.commit("workorder/UPDATE_OPEN_WORKORDERS", data_parsed.notification.workorder);
        this.store.commit("SET_SNACKBAR", {
            message: "Workorder `" + data_parsed.notification.workorder.name + "` Updated!",
            value: true,
            status: "success"
          });
      }

      // add workorder review
      if (data_parsed.notification.event == "AD" && data_parsed.notification.type == "WR") {
        this.store.commit("workorder/ADD_PENDING_REVIEW", data_parsed.notification.workorder_review);
        this.store.commit("SET_SNACKBAR", {
            message: "New workorder is pending review!",
            value: true,
            status: "success"
          });
      }

      // remove workorder review
      if (data_parsed.notification.event == "RM" && data_parsed.notification.type == "WR") {
        this.store.commit("workorder/REMOVE_PENDING_REVIEW", data_parsed.notification.id);
        this.store.commit("SET_SNACKBAR", {
            message: "Workorder review with id: " + data_parsed.notification.id + " is closed!",
            value: true,
            status: "success"
          });
      }
    }
  }
}

export default new CustomSocket(store);