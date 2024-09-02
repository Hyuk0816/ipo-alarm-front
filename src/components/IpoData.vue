<template>
  <div>
    <h1>IPO 데이터 목록</h1>
    <input v-model="searchName" placeholder="이름 검색" />
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />
    <button @click="searchData">검색</button>
    <table>
      <thead>
      <tr>
        <th>Num</th>
        <th>이름</th>
        <th>공모 가격</th>
        <th>확정 가격</th>
        <th>경쟁률</th>
        <th>증권사</th>
        <th>시작일</th>
        <th>종료일</th>
        <th>알림신청</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in paginatedData" :key="index">
        <td>{{index + 1 }}</td>
        <td>{{ item.ipoName }}</td>
        <td>{{ item.ipoPrice || '정보 없음' }}</td>
        <td>{{ item.confirmPrice }}</td>
        <td>{{ item.competitionRate }}</td>
        <td>{{ item.securities }}</td>
        <td>{{ formatDate(item.startDate) }}</td>
        <td>{{ formatDate(item.endDate) }}</td>
        <td></td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">이전</button>
      <span>페이지 {{ currentPage + 1 }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const ipoData = ref([]);
const searchName = ref('');
const startDate = ref('');
const endDate = ref('');
const pageSize = 30;
const currentPage = ref(0);
const totalPages = ref(0);

const fetchData = async (page) => {
  const params = {
    page,
    size: pageSize,
    sort: 'string',
    ipoName: searchName.value || undefined,
    start: startDate.value || undefined,
    end: endDate.value || undefined,
  };
  console.log(page+ "fetchData()")
  try {
    const response = await axios.get('http://localhost:8080/api/ipo/data', { params });

    ipoData.value = response.data.content || [];
    totalPages.value = response.data.totalPages;
    console.log(response);
    console.log("Fetching data for page:", currentPage.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const searchData = () => {
  currentPage.value = 0; // 검색 시 페이지를 처음으로 설정
  fetchData(currentPage.value);
};

const paginatedData = computed(() => {
  const start = 0;
  return ipoData.value.slice(start, start + pageSize);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    fetchData(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    fetchData(currentPage.value);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '정보 없음';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};

onMounted(() => fetchData());
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
}

input {
  margin: 5px;
  padding: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto; /* 자동 레이아웃 유지 */
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  min-width: 100px; /* 최소 너비 설정 */
  max-width: 200px; /* 최대 너비 설정 (필요에 따라 조정 가능) */
  overflow-wrap: break-word; /* 단어 줄 바꿈 허용 */
  white-space: normal; /* 긴 단어가 줄 바꿈되도록 설정 */
}
td {
  word-wrap: break-word; /* 추가 */
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #4CAF50;
  color: white;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
