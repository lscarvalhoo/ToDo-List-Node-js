export function addActiveClass(elementsList, element) {
  elementsList.forEach((element) => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  });

  element.classList.add('active');
}

export function removeActiveClass(element) {
  element.classList.remove('active');
}
