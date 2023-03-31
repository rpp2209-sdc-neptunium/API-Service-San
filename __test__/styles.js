import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    styles_rpt_1600: {
      executor: 'constant-arrival-rate',
      rate: 1600,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 10000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  const res = http.get('http://localhost:3000/products/1111/styles');
}