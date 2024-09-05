<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mb-3">
        <button v-for="year in years" :key="year" @click="fetchData(year)" class="btn btn-primary">
          {{ year }}
        </button>
      </div>
      <div class="col-12 col-md-8 offset-md-2">
        <canvas id="profitChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      years: [2021, 2022, 2023, 2024],
      chart: null,
      chartData: [],
      currentRequest: null,
    };
  },
  methods: {
    async fetchData(year) {
      // 이전 요청이 진행 중이면 취소
      if (this.currentRequest) {
        this.currentRequest.abort();
      }

      this.currentRequest = new AbortController();
      const { signal } = this.currentRequest;

      try {
        const response = await fetch(`http://localhost:8080/api/listing_shares/monthly_profit?year=${year}`, { signal });
        this.chartData = await response.json();
        this.updateChart();
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('이전 요청이 취소되었습니다.');
        } else {
          console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
        }
      }
    },
    updateChart() {
      const ctx = document.getElementById('profitChart');
      if (!ctx) {
        console.error('Canvas 요소를 찾을 수 없습니다.');
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
          labels: [
            '1월', '2월', '3월', '4월', '5월',
            '6월', '7월', '8월', '9월', '10월',
            '11월', '12월'
          ],
          datasets: [{
            label: '월별 수익',
            data: this.chartData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // 비율 유지하지 않기
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  mounted() {
    this.fetchData(2024); // 초기 데이터 로드
  }
};
</script>

<style scoped>
button {
  margin-top: 30px;
  margin-right: 10px;
}

#profitChart {
  height: 400px; /* 원하는 높이 설정 */
  width: 200px;
  justify-content: left;
}
</style>
