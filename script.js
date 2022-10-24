// Data
const items = [
  { name: "Samsung Galaxy S21", price: "6600.00" },
  { name: "Playstation 5", price: "9,199.00" },
  { name: "Logitech Joystick X52", price: "3,280.00" },
  { name: "Meetion Chaise Gamer", price: "2,870.00" },
  { name: "Tripod Support", price: "67.98" },
  { name: "Mellerware AIR FRYER", price: "699.00" },
  { name: "Techwood Steamer", price: "299.00" },
  { name: "Xiaomi Redmi Note 11 Pro", price: "3199.00" },
];

// DOM Elements
const km__products__wrapper = document.getElementById("km__products__wrapper");
const km__pagination_wrapper = document.getElementById("km__pagination");

// Global Variables
let currentPage = 1;
let itemsPerPage = 6;

/** Functions **/

// FUNC : Show products
const showItems = (items, items_wrapper, current_page, items_per_page) => {
  // Init the items wrapper + create list for items
  items_wrapper.innerHTML = "";
  const itemsListElem = document.createElement("ul");
  itemsListElem.classList.add("km__products__list");
  items_wrapper.appendChild(itemsListElem);

  // Because the array start from 0 (index)
  current_page--;

  // Slice items
  const from = items_per_page * current_page;
  const to = from + items_per_page;
  const slicedItems = items.slice(from, to);

  // Create the elements to append
  for (let i = 0; i < slicedItems.length; i++) {
    let currentItem = slicedItems[i];
    const newItem = document.createElement("li");
    newItem.classList.add("km__product__item");
    newItem.innerHTML = `
      <span class="km__product__title">${currentItem.name}</span>
	  <span class="km__product__price">${currentItem.price} DH</span>
    `;
    itemsListElem.appendChild(newItem);
  }
};

// FUNC : Setup pagination
const setupPagination = (items, pagination_wrapper, rows_per_page) => {
  // Init the pagination wrapper
  pagination_wrapper.innerHTML = "";

  // Count pages
  let pageCounter = Math.ceil(items.length / rows_per_page);

  for (let i = 1; i < pageCounter + 1; i++) {
    let pagebuttonElem = createPaginationButton(i, items);
    pagination_wrapper.appendChild(pagebuttonElem);
  }
};

// FUNC : Create Pagination Button
const createPaginationButton = (page, newitems) => {
  // Create button
  const newButton = document.createElement("button");
  newButton.innerText = page;

  // Check if current to add the active class
  if (currentPage == page) newButton.classList.add("km__page__active");

  // Click event listener
  newButton.addEventListener("click", function () {
    // Set the clicked page as the current page
    currentPage = page;

    // Refresh items
    showItems(newitems, km__products__wrapper, currentPage, itemsPerPage);

    // Remove active class from the previous page button
    let activebutton = document.querySelector(
      "#km__pagination > button.km__page__active"
    );
    activebutton.classList.remove("km__page__active");

    // Add active class to the current page button
    newButton.classList.add("km__page__active");
  });

  return newButton;
};

// INIT
showItems(items, km__products__wrapper, currentPage, itemsPerPage);
setupPagination(items, km__pagination_wrapper, itemsPerPage);
