import moment from 'moment';

class SensorUpdater {
  constructor() {
    this.sensors = {};
    this.dataPoints = {};
    this.loading = new Set();
    this.lastDate = moment().subtract(30, 'minutes').valueOf() / 1000;
    this.listeners = [];
  }

  fetchSensor(sensor_ids) {
    const preloaded_sensors = Object.keys(this.sensors)
      .map(id => this.sensors[id])
      .filter(sensor => sensor_ids.indexOf(sensor.id) !== -1);
    sensor_ids = sensor_ids.filter(id => !this.sensors[id] && !this.loading.has(id));

    if (sensor_ids.length === 0) {
      return Promise.resolve(preloaded_sensors);
    }

    sensor_ids.forEach(id => this.loading.add(id));

    return fetch('/api/get_sensors', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'sensors': sensor_ids})
    })
    .then(res => res.json())
    .then(sensors => {
      sensors.forEach(sensor => {
        this.sensors[sensor.id] = sensor;
        this.loading.delete[sensor.id];
        this.dataPoints[sensor.id] = [];
      })

      for (let i = 0; i < this.listeners.length; i++) {
        this.listeners[i]({type: 'sensor', sensors: sensors.concat(preloaded_sensors)});
      }

      /*for (let i = 0; i < this.listeners.length; i++) {
        this.listeners[i]({type: 'data', data: this.dataPoints});
      }*/
    })
    .catch(error => {
      sensor_ids.forEach(id => this.loading.delete(id));
    })
  }

  fetchDataPoints() {
    if (!this.listeners.length) {
      return;
    }

    const x = this.lastDate
    this.lastDate = Date.now() / 1000
    return fetch(`/api/get_data?since=${x}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'sensors': Object.keys(this.sensors)})
    })
    .then(res => res.json())
    .then(data => {
      const newData = {}

      Object.keys(this.sensors)
        .map(id => this.sensors[id])
        .forEach(sensor => {
          newData[sensor.id] = []
        })

      data.forEach(datum => {
        this.dataPoints[datum.sensor_id].push(datum);
        newData[datum.sensor_id].push(datum);
      })

      for (let i = 0; i < this.listeners.length; i++) {
        setImmediate(() => this.listeners[i]({type: 'data', data: newData}));
      }

      Object.keys(this.dataPoints)
        .forEach(key => {
          if (this.dataPoints[key].length > 1500) {
            this.dataPoints[key] = this.dataPoints[key].slice(this.dataPoints[key].length - 1500);
          }
        })
    })
  }

  subscribe(listener) {
    this.listeners.push(listener);

    const sensors = Object.keys(this.sensors)
      .map(s => this.sensors[s])

    listener({type: 'data', data: this.dataPoints})
    listener({type: 'sensor', sensors})
    return () => {
      for (let i = 0; i < this.listeners.length; i++) {
        if (listener == this.listeners[i]) {
          this.listeners.splice(i, 1);
          break;
        }
      }
    }
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.fetchDataPoints(), 1000);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

const su = new SensorUpdater();

export default su
