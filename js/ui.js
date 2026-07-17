export function displayStudents(
  students,
  studentTable,
  message,
  search,
  filterMajor,
  sortGpa,
) {
  studentTable.innerHTML = "";

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
  } else {
    filteredStudents.sort(function (a, b) {
      return a.gpa - b.gpa;
    });
  }
  if (filteredStudents.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
  filteredStudents.forEach(function (student) {
    let index = students.findIndex(function (item) {
      return item.id === student.id;
    });
    let row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.major}</td>
            <td>${student.gpa}</td>
            <td>
                <button class="edit-btn" data-index="${index}">
                    Edit
                </button>
                <button class="delete-btn" data-index="${index}">
                    Delete
                </button>
            </td>
        </tr>
        `;
    studentTable.innerHTML += row;
  });
}
