let areas = {
    a: null,
    b: null,
    c: null,
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStartF);
    item.addEventListener('dragend', dragEndF);
})

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOverF);
    area.addEventListener('dragleave', dragLeaveF);
    area.addEventListener('drop', dropF);
})
document.querySelector('.neutralArea').addEventListener('dragover', NOverF);
document.querySelector('.neutralArea').addEventListener('dragleave', NLeaveF);
document.querySelector('.neutralArea').addEventListener('drop', NdropF);

function dragStartF(e) {
    e.currentTarget.classList.add('dragging')
}
function dragEndF(e) {
    e.currentTarget.classList.remove('dragging')
}
function dragOverF(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover')
    }
}
function dragLeaveF(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('hover')
}
function dropF(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('hover')

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas()
    }

}
function NOverF(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function NLeaveF(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('hover');
}
function NdropF(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas()

}

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });
    if (areas.a === '1' && areas.b === "2" && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
    document.querySelector('.areas').classList.toggle('incorrect', !isCorrectOrder());
}

function isCorrectOrder() {
    return areas.a === '1' && areas.b === "2" && areas.c === '3';
}