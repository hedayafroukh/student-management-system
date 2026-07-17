import { saveStudents, loadStudents } from "./storage.js";
import { validateStudent, duplicateId } from "./validation.js";
import { displayStudents } from "./ui.js";

let students = loadStudents();

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

let editIndex = null;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateStudent(studentName, studentId, major, gpa)) {
    return;
  }

  if (duplicateId(students, studentId, editIndex)) {
    alert("Student ID already exists.");
    return;
  }

  let student = {
    name: studentName.value,
    id: studentId.value,
    major: major.value,
    gpa: Number(gpa.value),
  };

  if (editIndex === null) {
    students.push(student);
  } else {
    students = students.map(function (item, index) {
      if (index === editIndex) {
        return student;
      }
      return item;
    });

    editIndex = null;
    form.querySelector("button").textContent = "Add Student";
  }
  saveStudents(students);
  displayStudents(
    students,
    studentTable,
    message,
    search,
    filterMajor,
    sortGpa,
  );
  form.reset();
  studentName.focus();
});

studentTable.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    let index = event.target.dataset.index;
    if (confirm("Are you sure you want to delete this student?")) {
      students.splice(index, 1);
      saveStudents(students);
      displayStudents(
        students,
        studentTable,
        message,
        search,
        filterMajor,
        sortGpa,
      );
    }
  }
  if (event.target.classList.contains("edit-btn")) {
    let index = event.target.dataset.index;
    let student = students[index];
    studentName.value = student.name;
    studentId.value = student.id;
    major.value = student.major;
    gpa.value = student.gpa;

    editIndex = index;
    form.querySelector("button").textContent = "Update Student";
  }
});
search.addEventListener("input", function () {
  displayStudents(
    students,
    studentTable,
    message,
    search,
    filterMajor,
    sortGpa,
  );
});
filterMajor.addEventListener("change", function () {
  displayStudents(
    students,
    studentTable,
    message,
    search,
    filterMajor,
    sortGpa,
  );
});
sortGpa.addEventListener("change", function () {
  displayStudents(
    students,
    studentTable,
    message,
    search,
    filterMajor,
    sortGpa,
  );
});
displayStudents(students, studentTable, message, search, filterMajor, sortGpa);
