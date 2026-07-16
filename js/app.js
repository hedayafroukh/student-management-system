let students = [];

const form = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const major = document.getElementById("major");
const gpa = document.getElementById("gpa");
const studentTable = document.getElementById("studentTable");
const message = document.getElementById("message");
const search = document.getElementById("search");
const filterMajor = document.getElementById("filterMajor");
const sortGpa = document.getElementById("sortGpa");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    studentName.value === "" ||
    studentId.value === "" ||
    major.value === "" ||
    gpa.value === ""
  ) {
    alert("Please fill all fields.");
    return;
  }
  let foundStudent = students.find(function (student) {
    return student.id === studentId.value;
  });

  if (foundStudent) {
    alert("Student ID already exists.");
    return;
  }
  let student = {
    name: studentName.value,
    id: studentId.value,
    major: major.value,
    gpa: Number(gpa.value),
  };
  students.push(student);
  displayStudents();
  form.reset();
});

function displayStudents() {
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
  filteredStudents.forEach(function (student, index) {
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
  if (event.target.classList.contains("edit-btn")) {
    let index = event.target.dataset.index;
    let student = students[index];
    studentName.value = student.name;
    studentId.value = student.id;
    major.value = student.major;
    gpa.value = student.gpa;
    students.splice(index, 1);

    displayStudents();
  }
});
search.addEventListener("keyup", function () {
  displayStudents();
});
filterMajor.addEventListener("change", function () {
  displayStudents();
});
sortGpa.addEventListener("change", function () {
  displayStudents();
});
displayStudents();
