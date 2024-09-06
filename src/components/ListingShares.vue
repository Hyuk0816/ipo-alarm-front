<template xmlns="">
  <div>
    <h1 class="text-left display-4 text-primary mb-4">상장일 일정</h1>
    <div class="search-container">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" @click="toggleFilter" aria-expanded="false">
          검색 필터 {{ isFilterOpen ? '닫기' : '열기' }}
        </button>
        <div v-if="isFilterOpen" class="filter-menu">
          <ul class="list-group">
            <li class="list-group-item">
              <label for="searchName">이름:</label>
              <input v-model="searchName" placeholder="이름 검색" class="form-control-sm" type="search" aria-label="Search"/>
            </li>
            <li class="list-group-item">
              <label for="listingStartDate">상장 시작일:</label>
              <input type="date" v-model="listingStartDate" class="form-control-sm" />
            </li>
            <li class="list-group-item">
              <label for="listingEndDate">상장 종료일:</label>
              <input type="date" v-model="listingEndDate" class="form-control-sm" />
            </li>
            <li class="list-group-item">
              <button @click="searchData" class="btn btn-primary">검색</button>
              <button @click="resetFilters" class="btn btn-secondary">초기화</button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <table>
      <thead>
      <tr>
        <th>Num</th>
        <th>이름</th>
        <th>상장일</th>
        <th>현재가</th>
        <th>변동률 (이전)</th>
        <th>공모가</th>
        <th>변동률 (공모가)</th>
        <th>시가</th>
        <th>변동률 (시가)</th>
        <th>첫 날 종가</th>
        <th>알림신청</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in paginatedData" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.ipoName }}</td>
        <td>{{ formatDate(item.listingDate) }}</td>
        <td>{{ item.currentPrice }}</td>
        <td>{{ item.changeRatePrevious }}</td>
        <td>{{ item.offeringPrice }}</td>
        <td>{{ item.changeRateOfferingPrice }}</td>
        <td>{{ item.openingPrice }}</td>
        <td>{{ item.changeRateOpeningToOfferingPrice }}</td>
        <td>{{ item.closingPriceFirstDay }}</td>
        <td>
          <button class="btn btn-primary" @click="openModal(item)">신청</button>
        </td>
      </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page - 1 }">
          <a class="page-link" href="#" @click.prevent="goToPage(page - 1)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- 모달 -->
    <modal
        :isOpen="isModalOpen"
        title="알람 신청"
        @update:isOpen="isModalOpen = $event"
        :confirmAction="submitAlarm"
    >
      <p>{{ selectedItem.value ? selectedItem.value : '' }} 알람 신청하시겠습니까?</p>
    </modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Modal from './Modal.vue'; // 모달 컴포넌트 임포트

const listingData = ref([]);
const searchName = ref('');
const listingStartDate = ref('');
const listingEndDate = ref('');
const pageSize = ref(30);
const currentPage = ref(0);
const totalPages = ref(0);
const isFilterOpen = ref(false);
const isModalOpen = ref(false);
const selectedItem = ref(null); // 선택된 아이템 저장

const fetchData = async (page) => {
  const params = {
    page,
    size: pageSize.value,
  };

  if (searchName.value) {
    params.ipoName = searchName.value;
  }
  if (listingStartDate.value) {
    params.listingStartDate = listingStartDate.value;
  }
  if (listingEndDate.value) {
    params.listingEndDate = listingEndDate.value;
  }

  const queryString = new URLSearchParams(params).toString();

  try {
    const response = await axios.get(`http://localhost:8080/api/listing_shares/data?${queryString}`);
    listingData.value = response.data.content || [];
    totalPages.value = response.data.totalPages;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const searchData = () => {
  currentPage.value = 0;
  fetchData(currentPage.value);
};

const resetFilters = () => {
  searchName.value = '';
  listingStartDate.value = '';
  listingEndDate.value = '';
  pageSize.value = 30;
  currentPage.value = 0;
  fetchData(currentPage.value);
};

const paginatedData = computed(() => {
  const start = 0;
  return listingData.value.slice(start, start + pageSize.value);
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

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
    fetchData(currentPage.value);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '정보 없음';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const openModal = (item) => {
  selectedItem.value = item.ipoName; // 선택된 아이템 저장
  isModalOpen.value = true;
};

const submitAlarm = async () => {
  if (selectedItem.value) {
    console.log(selectedItem.value);
    try {
      await axios.post(`http://localhost:8080/api/listing_share_alarm/alarm/${selectedItem.value}`); // 아이템 ID 사용

      alert('알람 신청 완료!');
    } catch (error) {
      console.error('Error submitting alarm:', error);
      alert('알람 신청 중 오류 발생');
    }
  }
  isModalOpen.value = false; // 모달 닫기
};

onMounted(() => fetchData(0));
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
}

h1 {
  text-align: center;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-menu {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1000;
}

input, select {
  margin: 5px;
  padding: 5px;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin: 0 auto;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
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
