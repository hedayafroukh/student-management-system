let students = [];

const form = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const major = document.getElementById("major");
const gpa = document.getElementById("gpa");
const studentTable = document.getElementById("studentTable");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let student = {
    name: studentName.value,
    id: studentId.value,
    major: major.value,
    gpa: gpa.value,
  };
  students.push(student);
  displayStudents();
  form.reset();
});

function displayStudents() {
  studentTable.innerHTML = "";
  students.forEach(function (student, index) {
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
studentTable.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    let index = event.target.dataset.index;
    if (confirm("Are you sure you want to delete this student?")) {
      students.splice(index, 1);
      displayStudents();
    }
  }
});
