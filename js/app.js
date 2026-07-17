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
const averageGpa = document.getElementById("averageGpa");
const successMessage = document.getElementById("successMessage");

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

  let isEditing = editIndex !== null;

  let student = {
    name: studentName.value,
    id: studentId.value,
    major: major.value,
    gpa: Number(gpa.value),
  };

  if (!isEditing) {
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
  if (isEditing) {
    successMessage.textContent = "Student updated successfully.";
  } else {
    successMessage.textContent = "Student added successfully.";
  }

  setTimeout(function () {
    successMessage.textContent = "";
  }, 2000);

  displayStudents(
    students,
    studentTable,
    message,
    search,
    filterMajor,
    sortGpa,
    averageGpa,
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
      
      successMessage.textContent = "Student deleted successfully.";
      setTimeout(function () {
        successMessage.textContent = "";
      }, 2000);

      displayStudents(
        students,
        studentTable,
        message,
        search,
        filterMajor,
        sortGpa,
        averageGpa,
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

    editIndex = Number(index);
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
    averageGpa,
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
    averageGpa,
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
    averageGpa,
  );
});
displayStudents(
  students,
  studentTable,
  message,
  search,
  filterMajor,
  sortGpa,
  averageGpa,
);
