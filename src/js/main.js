import flatpickr from 'flatpickr';
import { Korean } from 'flatpickr/dist/l10n/ko.js';

import 'flatpickr/dist/flatpickr.min.css';
import '../scss/main.scss';

document.querySelectorAll('.date-range').forEach(wrapper => {
    const startInput = wrapper.querySelector('.start')
    const endInput = wrapper.querySelector('.end')
  
    const startPicker = flatpickr(startInput, {
      locale: Korean,
      dateFormat: 'Y-m-d',
      onChange: function (selectedDates) {
        if (selectedDates[0]) {
          endPicker.set('minDate', selectedDates[0])
        }
      },
    })
  
    const endPicker = flatpickr(endInput, {
      locale: Korean,
      dateFormat: 'Y-m-d',
      onChange: function (selectedDates) {
        if (selectedDates[0]) {
          startPicker.set('maxDate', selectedDates[0])
        }
      },
    })
  })
  

  // 단일 datepicker
document.querySelectorAll('.datepicker').forEach(input => {
  flatpickr(input, {
    locale: Korean,
    dateFormat: 'Y-m-d',
  })
})


// 정렬 타입 토글 컴포넌트
function initSortToggleComponent(containerSelector = '.sort-type-group') {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
      const buttons = container.querySelectorAll('.sort-type-group-item');
      const callbackName = container.dataset.callback;
      const callbackFn = window[callbackName];

      buttons.forEach(btn => {
      btn.addEventListener('click', () => {
          if (btn.getAttribute('aria-pressed') === 'true') return;

          // 전체 버튼 aria-pressed false 처리
          buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));

          // 클릭된 버튼만 true
          btn.setAttribute('aria-pressed', 'true');

          // toggle-type 적용
          const toggleType = btn.getAttribute('data-toggle-type');
          const listContainer = document.querySelector('.search-list-container');
          if (listContainer) {
          listContainer.setAttribute('data-toggle-type', toggleType);
          }

          // 콜백 실행
          if (typeof callbackFn === 'function') {
          callbackFn(toggleType);
          }
      });
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  
  initSortToggleComponent();
});
