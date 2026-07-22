const categoryColors = {
  "식비": "#f28ca8",
  "교통비": "#f2c4d2",
  "의료/건강": "#f8e39a",
  "인터넷쇼핑": "#f5d9a6",
  "교육": "#e8c19b",
  "생필품": "#b9d6e3",
  "문화생활": "#dce5e8",
  "기타": "#d1d1d1",
  "카페": "#c9e3a8"
};

const expenses = [];

const form = document.querySelector('#expense-form');

const amountInput = document.querySelector('#amount');

const categoryInput = document.querySelector('#category');

const memoInput = document.querySelector('#memo');

const expenseList = document.querySelector('#expense-list');

const categorySummary =
  document.querySelector('#category-summary');

const categoryButtons =
  document.querySelectorAll('.category-button');

categoryButtons.forEach(function(button) {

  button.addEventListener('click', function() {

    categoryButtons.forEach(function(button) {
      button.classList.remove('selected');
    });

    button.classList.add('selected');

    categoryInput.value =
      button.dataset.category;

  });

});


// 저장 버튼을 눌렀을 때
form.addEventListener('submit', function(event) {

  event.preventDefault();


  // 입력한 지출 정보를 객체로 만들기
const expenseData = {
  date: new Date(),
  amount: Number(amountInput.value),
  category: categoryInput.value,
  memo: memoInput.value
};

  // 지출 정보를 배열에 저장하기
  expenses.push(expenseData);


  // 화면에 기록 표시하기
  const expenseElement = document.createElement('div');

expenseElement.innerHTML = `
  <div class="expense-header">

    <span class="expense-date">
  ${expenseData.date.getMonth() + 1}/
  ${expenseData.date.getDate()}
  ${expenseData.date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
hour12: false
  })}
</span>

    <span>
      ${expenseData.category}
      ${expenseData.memo ? `(${expenseData.memo})` : ''}
    </span>

    <strong>
      ${expenseData.amount.toLocaleString()}원
    </strong>

  </div>
`;

  expenseList.appendChild(expenseElement);


  // 카테고리별 합계 계산하기
  calculateCategoryTotal();


  // 입력창 비우기
  form.reset();

});


// 카테고리별 합계를 계산하는 함수
let categoryChart;

function calculateCategoryTotal() {

  const categoryTotal = {};

  expenses.forEach(function(expense) {

    if (categoryTotal[expense.category]) {
      categoryTotal[expense.category] += expense.amount;
    } else {
      categoryTotal[expense.category] = expense.amount;
    }

  });

  const categories = Object.keys(categoryTotal);
  const amounts = Object.values(categoryTotal);

  const chart = document.querySelector('#category-chart');

  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(chart, {
    type: 'doughnut',

    data: {
      labels: categories,

datasets: [{
  data: amounts,

  backgroundColor: categories.map(function(category) {
    return categoryColors[category];
  })
}]
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }

  });

}