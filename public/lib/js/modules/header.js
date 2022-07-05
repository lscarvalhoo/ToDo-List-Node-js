import { generateAll, generateActive, generateCompleted } from '../modules/insert-data.js'


export default function initHeader() {
  const section = document.querySelector('.box-all');
  const tabs = document.querySelectorAll('.nav-item');

  if (section.classList.contains('active')) {
    generateActive();
    tabs.forEach((tab) => {
      if (tab.classList.contains('active')) {
        tab.classList.remove('active');
      }
    });
    const activeTab = document.querySelector('#active');
    activeTab.classList.add('active');
  } else if (section.classList.contains('completed')) {
    generateCompleted();
    tabs.forEach((tab) => {
      if (tab.classList.contains('active')) {
        tab.classList.remove('active');
      }
    });
    const activeTab = document.querySelector('#completed');
    activeTab.classList.add('active');
  } else {
    generateAll();
    tabs.forEach((tab) => {
      if (tab.classList.contains('active')) {
        tab.classList.remove('active');
      }
    });
    const activeTab = document.querySelector('#all');
    activeTab.classList.add('active');
  }
}