
const itemList = document.getElementById("itemList");
const items = itemList.getElementsByClassName("selectable-item");

for (const item of items) {
    item.addEventListener("click", toggleSelection);
}

function toggleSelection(event) {
    const selectedItem = event.target;
    selectedItem.classList.toggle("selected");
}

$('.share_button').on('click', function (e) {

    $('.share_icons').toggleClass("active_content");
    $('.share_button').toggleClass("active_button");
    e.preventDefault();

    if ($(".more_content").hasClass("active_more_content")) {
        $('.more_content').removeClass("active_more_content");
        $('.more_share').removeClass("active_more_button");
    }

});

$('.more_share').on('click', function (e) {

    $('.more_content').toggleClass("active_more_content");
    $('.more_share').toggleClass("active_more_button");
    e.preventDefault();

});