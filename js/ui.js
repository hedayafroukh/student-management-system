export function displayStudents(
  students,
  studentTable,
  message,
  search,
  filterMajor,
  sortGpa,
  averageGpa,
) {
  studentTable.textContent = "";

  let searchValue = search.value.toLowerCase();

  let filteredStudents = students.filter(function (student) {
    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.id.includes(searchValue)
    );
  });
  if (filterMajor.value !== "all") {
    filteredStudents = filteredStudents.filter(function (student) {
      return student.major === filterMajor.value;
    });
  }
  if (sortGpa.value === "high") {
    filteredStudents.sort(function (a, b) {
      return b.gpa - a.gpa;
    });
  } else if (sortGpa.value === "low") {
    filteredStudents.sort(function (a, b) {
      return a.gpa - b.gpa;
    });
  }
  let average = 0;

  if (filteredStudents.length > 0) {
    let total = filteredStudents.reduce(function (sum, student) {
      return sum + student.gpa;
    }, 0);
    average = total / filteredStudents.length;
  }
  averageGpa.textContent = average.toFixed(2);

  if (filteredStudents.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
  filteredStudents.forEach(function (student) {
    let index = students.findIndex(function (item) {
      return item.id === student.id;
    });
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const idCell = document.createElement("td");
    idCell.textContent = student.id;

    const majorCell = document.createElement("td");
    majorCell.textContent = student.major;

    const gpaCell = document.createElement("td");
    gpaCell.textContent = student.gpa;

    const actionCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.dataset.index = index;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.dataset.index = index;

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(idCell);
    row.appendChild(majorCell);
    row.appendChild(gpaCell);
    row.appendChild(actionCell);

    studentTable.appendChild(row);
  });
}
