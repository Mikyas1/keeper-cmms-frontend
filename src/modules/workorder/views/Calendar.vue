<template>
  <div>

    <BodyNav :page_title="'Calendar View'" 
      :right="{name: 'Table View', icon: 'window-restore', url: '/workorders'}">
    </BodyNav>

    <v-row :class="{'mt-5': $vuetify.breakpoint.smAndDown}" v-if="pageLoad" class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat :color="$vuetify.theme.dark ? '#121212': 'white'">
            <v-layout row wrap>
              
              <v-flex xs4 md3>
                <v-btn outlined class="mr-4" :color="$vuetify.theme.dark ? 'white': 'grey darken-2'" @click="setToday">Today</v-btn>
                
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small :color="$vuetify.theme.dark ? 'white': ''">fa-angle-double-left</v-icon>
                </v-btn>
                
                <v-btn fab text small color="grey darken-2" @click="next" class="mr-0">
                  <v-icon small :color="$vuetify.theme.dark ? 'white': ''">fa-angle-double-right</v-icon>
                </v-btn>

              </v-flex>

              <v-flex xs4 md4>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
              </v-flex>
              
              <v-flex xs4 md3>
                <v-menu bottom right>
                  <template v-slot:activator="{ on }">
                    <v-btn :color="$vuetify.theme.dark ? 'white': 'grey darken-2'" outlined v-on="on">
                      <span>{{ workorder_type }}</span>
                      <v-icon small right :color="$vuetify.theme.dark ? 'white': ''">fa-angle-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="get_calander_data('active')">
                      <v-list-item-title>Active</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="get_calander_data('up_coming')">
                      <v-list-item-title>Up Coming</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-flex>

              <v-flex xs4 md2>
                <v-menu bottom right>
                  <template v-slot:activator="{ on }">
                    <v-btn :color="$vuetify.theme.dark ? 'white': 'grey darken-2'" outlined v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon small right :color="$vuetify.theme.dark ? 'white': ''">fa-angle-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-flex>

            </v-layout>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            :type="type"
            @click:event="openDetail"
            @click:more="viewWeek"
            @click:date="viewWeek"
            @change="updateRange"
            :short-months="$vuetify.breakpoint.smAndDown"
            :short-weekdays="$vuetify.breakpoint.smAndDown"
            :class="{'mt-5': $vuetify.breakpoint.smAndDown}"
          >
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- {{events}} -->

    <div class="loading-card" v-if="!pageLoad">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-progress-circular :size="50" color="blue-grey" indeterminate></v-progress-circular>
          </v-row>
        </v-container>
      </v-content>
    </div>

    <!-- Dynamic dialog -->
        <!-- DETAIL DIALOG -->
        <v-dialog v-model="detailDialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <DetailWorkorder 
                    :workorder_id="detailDialogWorkorder"
                    @detailWorkorderCreated="workorderCreated"
                    @closeDetailWorkorder="detailDialog = !detailDialog"
                ></DetailWorkorder>
            </v-card>
        </v-dialog>

  </div>
</template>

<script>
import DetailWorkorder from "../components/DetailWorkorder";
import BodyNav from "@/components/BodyNav";
import { set_calander_reload_fun } from "../store/functions";

export default {
  name: "calander",

  components: {
    BodyNav,
    DetailWorkorder,
  },

  data: () => ({
    pageLoad: false,

    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    start: null,
    end: null,

    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    detailDialog: false,
    detailDialogWorkorder: null,
    setWorkorderId: null,

    events: [],
    dialog: false,
    workorder_type: 'Active'
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    test() {
      alert("ok")
    },

    get_calendar_events() {
      // this.workorder = null;
      this.pageLoad = false;
      this.$store
        .dispatch("workorder/calendar_events")
        .then(response => {
          this.events = this.prepart_events(response.workorders);
          this.today = response.today;
          this.focus = response.today;
          this.pageLoad = true;
        })
        .catch(() => {
          this.pageLoad = false;
        });
    },

    up_coming_events() {
      this.pageLoad = false;
      this.$store
          .dispatch("workorder/up_coming_events")
          .then(response => {
              this.events = this.prepart_up_coming_events(response);
              this.today = response.today;
              this.focus = response.today;
              this.pageLoad = true;
          })
          .catch(() => {
            this.pageLoad = false;
          })
    },

    prepart_events(val) {
      var data = [];
      val.forEach(element => {
        data.push({
          id: element.id,
          name: element.workorder_type + ' - ' + element.name,
          start: element.created.substr(0, 10),
          end: element.due_date,
          workorder_status: element.workorder_status,
          started: element.started,
          over_due: element.over_due,
          color: this.getEventColor(element)
        });
      });
      return data;
    },

    prepart_up_coming_events(val) {
      var data = [];
      val.forEach(element => {
        data.push({
          id: null,
          name: element.type + ' - ' + element.name,
          start: element.start,
          end: element.end,
          // workorder_status: element.workorder_status,
          started: false,
          over_due: false,
          rejected: false,
          color: "grey"
        });
      });
      return data;
    },

    getEventColor(ev) {
      if (ev.rejected) {
        return "orange";
      }
      if (ev.over_due) {
        return "red";
      } else {
        if (ev.closed) {
          return "green";
        } else {
          if (ev.started) {
            return "blue";
          } else {
            return "grey";
          }
        }
      }
    },

    openDetail(val) {
      if (val.event.id != null) {
        this.detailDialog = !this.detailDialog;
        if(this.setWorkorderId) {
            this.setWorkorderId(val.event.id);
        } else {
            this.detailDialogWorkorder = val.event.id;
        }
      }
    },

    workorderCreated(fun) {
      this.setWorkorderId = fun;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    viewWeek({date}) {
      this.focus = date;
      this.type = "week";
    },

    setToday() {
      this.focus = this.today;
    },

    prev() {
      this.$refs.calendar.prev();
    },

    next() {
      this.$refs.calendar.next();
    },

    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },

    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },

    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },

    get_calander_data(val) {
      this.workorder_type = val;
      if (val == 'active') {
        this.get_calendar_events();
      } else if (val == 'up_coming') {
        this.up_coming_events();
      }
    }
  },

  created() {
    this.get_calendar_events();
    set_calander_reload_fun(this.get_calendar_events);
  }
};
</script>